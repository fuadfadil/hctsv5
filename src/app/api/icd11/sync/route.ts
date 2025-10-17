import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { icd11Categories, icd11PricingRules } from "@/lib/schema";

// WHO ICD11 API configuration
const ICD11_API_BASE = "https://id.who.int/icd/release/11/2023-01/mms";
const ICD11_API_KEY = process.env.ICD11_API_KEY; // Add to environment variables

interface ICD11Entity {
  "@id": string;
  code: string;
  title: {
    "@language": string;
    "@value": string;
  }[];
  definition?: {
    "@language": string;
    "@value": string;
  }[];
  parent?: string[];
  child?: string[];
}

interface ICD11Response {
  destinationEntities?: ICD11Entity[];
  child?: ICD11Entity[];
}

// Default pricing rules for ICD11 categories
const defaultPricingRules = [
  {
    code: "1A00",
    category_name: "Certain infectious or parasitic diseases",
    base_price_multiplier: "1.200",
    complexity_factor: "1.500",
    risk_adjustment: "1.300"
  },
  {
    code: "1A01",
    category_name: "Tuberculosis",
    base_price_multiplier: "1.800",
    complexity_factor: "2.000",
    risk_adjustment: "1.800"
  },
  {
    code: "1A02",
    category_name: "Pneumonia",
    base_price_multiplier: "1.500",
    complexity_factor: "1.800",
    risk_adjustment: "1.600"
  },
  {
    code: "2A00",
    category_name: "Neoplasms",
    base_price_multiplier: "3.000",
    complexity_factor: "4.000",
    risk_adjustment: "3.500"
  },
  {
    code: "2A01",
    category_name: "Malignant neoplasms",
    base_price_multiplier: "4.000",
    complexity_factor: "5.000",
    risk_adjustment: "4.500"
  }
];

async function fetchICD11Data(url: string): Promise<ICD11Entity[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'API-Version': 'v2',
        ...(ICD11_API_KEY && { 'Authorization': `Bearer ${ICD11_API_KEY}` })
      }
    });

    if (!response.ok) {
      throw new Error(`ICD11 API error: ${response.status}`);
    }

    const data: ICD11Response = await response.json();
    return data.destinationEntities || data.child || [];
  } catch (error) {
    console.error("Error fetching from ICD11 API:", error);
    throw error;
  }
}

function extractEnglishTitle(titles: { "@language": string; "@value": string }[]): string {
  const englishTitle = titles.find(title => title["@language"] === "en");
  return englishTitle ? englishTitle["@value"] : titles[0]["@value"];
}

function extractEnglishDefinition(definitions?: { "@language": string; "@value": string }[]): string | undefined {
  if (!definitions) return undefined;
  const englishDef = definitions.find(def => def["@language"] === "en");
  return englishDef ? englishDef["@value"] : definitions[0]["@value"];
}

export async function POST(request: NextRequest) {
  try {
    const { fullSync = false } = await request.json().catch(() => ({}));

    // For development/demo purposes, use mock data if API key not available
    if (!ICD11_API_KEY) {
      console.log("ICD11 API key not found, using mock data");

      const mockICD11Data = [
        {
          code: "1A00",
          name: "Certain infectious or parasitic diseases",
          description: "Infectious diseases caused by bacteria, viruses, fungi, or parasites",
          parent_id: null
        },
        {
          code: "1A01",
          name: "Tuberculosis",
          description: "Mycobacterium tuberculosis infection",
          parent_id: 1
        },
        {
          code: "1A02",
          name: "Pneumonia",
          description: "Inflammation of the lungs",
          parent_id: 1
        },
        {
          code: "2A00",
          name: "Neoplasms",
          description: "Abnormal growth of tissue",
          parent_id: null
        },
        {
          code: "2A01",
          name: "Malignant neoplasms",
          description: "Cancerous tumors",
          parent_id: 4
        }
      ];

      const categoriesToInsert = mockICD11Data.map((category, index) => ({
        code: category.code,
        name: category.name,
        description: category.description,
        parent_id: category.parent_id,
        last_synced: new Date()
      }));

      // Clear existing data and insert new data
      await db.delete(icd11Categories);

      const insertedCategories = await db
        .insert(icd11Categories)
        .values(categoriesToInsert)
        .returning();

      // Insert default pricing rules
      await db.delete(icd11PricingRules);
      await db.insert(icd11PricingRules).values(
        defaultPricingRules.map(rule => ({
          icd11_code: rule.code,
          category_name: rule.category_name,
          base_price_multiplier: rule.base_price_multiplier,
          complexity_factor: rule.complexity_factor,
          risk_adjustment: rule.risk_adjustment,
          regional_variation: null,
          effective_from: new Date(),
          is_active: true
        }))
      );

      return NextResponse.json({
        success: true,
        message: `Successfully synced ${insertedCategories.length} ICD11 categories (mock data)`,
        data: insertedCategories
      });
    }

    // Real ICD11 API integration
    const rootEntities = await fetchICD11Data(`${ICD11_API_BASE}/browse`);

    const categoriesToInsert: any[] = [];
    const processedCodes = new Set<string>();

    // Process root level categories
    for (const entity of rootEntities) {
      if (processedCodes.has(entity.code)) continue;

      categoriesToInsert.push({
        code: entity.code,
        name: extractEnglishTitle(entity.title),
        description: extractEnglishDefinition(entity.definition),
        parent_id: null,
        last_synced: new Date()
      });

      processedCodes.add(entity.code);

      // If full sync requested, fetch children
      if (fullSync && entity.child) {
        for (const childUrl of entity.child) {
          try {
            const childEntities = await fetchICD11Data(childUrl);
            for (const childEntity of childEntities) {
              if (processedCodes.has(childEntity.code)) continue;

              categoriesToInsert.push({
                code: childEntity.code,
                name: extractEnglishTitle(childEntity.title),
                description: extractEnglishDefinition(childEntity.definition),
                parent_id: categoriesToInsert.length, // Reference to parent index
                last_synced: new Date()
              });

              processedCodes.add(childEntity.code);
            }
          } catch (error) {
            console.error(`Error fetching children for ${entity.code}:`, error);
          }
        }
      }
    }

    // Clear existing data and insert new data
    await db.delete(icd11Categories);

    const insertedCategories = await db
      .insert(icd11Categories)
      .values(categoriesToInsert)
      .returning();

    // Insert/update pricing rules
    await db.delete(icd11PricingRules);
    await db.insert(icd11PricingRules).values(
      defaultPricingRules.map(rule => ({
        icd11_code: rule.code,
        category_name: rule.category_name,
        base_price_multiplier: rule.base_price_multiplier,
        complexity_factor: rule.complexity_factor,
        risk_adjustment: rule.risk_adjustment,
        regional_variation: null,
        effective_from: new Date(),
        is_active: true
      }))
    );

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${insertedCategories.length} ICD11 categories from WHO API`,
      data: insertedCategories
    });
  } catch (error) {
    console.error("Error syncing ICD11 categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sync categories" },
      { status: 500 }
    );
  }
}