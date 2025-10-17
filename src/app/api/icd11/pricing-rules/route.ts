import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { icd11PricingRules } from "@/lib/schema";
import { eq, and, gte, lte, or, isNull } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const icd11Code = searchParams.get("code");

    let whereConditions = [eq(icd11PricingRules.is_active, true)];

    if (icd11Code) {
      whereConditions.push(eq(icd11PricingRules.icd11_code, icd11Code));
    }

    // Only get currently effective rules
    const now = new Date();
    whereConditions.push(lte(icd11PricingRules.effective_from, now));
    whereConditions.push(
      or(
        isNull(icd11PricingRules.effective_to),
        gte(icd11PricingRules.effective_to, now)
      )
    );

    const rules = await db
      .select()
      .from(icd11PricingRules)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    return NextResponse.json({
      success: true,
      data: rules
    });
  } catch (error) {
    console.error("Error fetching ICD11 pricing rules:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pricing rules" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      icd11_code,
      category_name,
      base_price_multiplier,
      complexity_factor,
      risk_adjustment,
      regional_variation,
      effective_from,
      effective_to
    } = body;

    const newRule = await db
      .insert(icd11PricingRules)
      .values({
        icd11_code,
        category_name,
        base_price_multiplier,
        complexity_factor,
        risk_adjustment,
        regional_variation,
        effective_from: effective_from ? new Date(effective_from) : new Date(),
        effective_to: effective_to ? new Date(effective_to) : null,
        is_active: true
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newRule[0]
    });
  } catch (error) {
    console.error("Error creating ICD11 pricing rule:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create pricing rule" },
      { status: 500 }
    );
  }
}