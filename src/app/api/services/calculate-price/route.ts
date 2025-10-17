import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { icd11PricingRules } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cost,
      profitMargin,
      basePrice,
      quantity,
      discountTiers,
      icd11Code,
      region
    } = body;

    let price = basePrice || 0;
    let appliedPricingRule = null;

    // If ICD11 code provided, apply dynamic pricing rules
    if (icd11Code) {
      try {
        const pricingRules = await db
          .select()
          .from(icd11PricingRules)
          .where(eq(icd11PricingRules.icd11_code, icd11Code))
          .limit(1);

        if (pricingRules.length > 0) {
          const rule = pricingRules[0];
          appliedPricingRule = rule;

          // Calculate base price using ICD11 multipliers
          const baseMultiplier = parseFloat(rule.base_price_multiplier.toString());
          const complexityFactor = parseFloat(rule.complexity_factor.toString());
          const riskAdjustment = parseFloat(rule.risk_adjustment.toString());

          // Apply regional variations if available
          let regionalMultiplier = 1.0;
          if (rule.regional_variation && region) {
            const regionalData = typeof rule.regional_variation === 'string'
              ? JSON.parse(rule.regional_variation)
              : rule.regional_variation;

            regionalMultiplier = regionalData[region] || 1.0;
          }

          // Calculate ICD11-adjusted price
          const icd11AdjustedPrice = cost * baseMultiplier * complexityFactor * riskAdjustment * regionalMultiplier;

          // If no base price provided, use ICD11-adjusted price
          if (!basePrice) {
            price = icd11AdjustedPrice;
          } else {
            // Blend manual base price with ICD11 adjustment
            price = (basePrice + icd11AdjustedPrice) / 2;
          }
        }
      } catch (error) {
        console.error("Error applying ICD11 pricing rules:", error);
        // Continue with manual pricing if ICD11 fails
      }
    }

    // If no base price provided and no ICD11 code, calculate from cost and profit margin
    if (!basePrice && !icd11Code && cost && profitMargin) {
      price = cost * (1 + profitMargin / 100);
    }

    // Apply bulk discounts
    let discountPercentage = 0;
    if (quantity >= 100) {
      discountPercentage = discountTiers?.["100+"] || 0;
    } else if (quantity >= 50) {
      discountPercentage = discountTiers?.["50-99"] || 0;
    }

    const discountedPrice = price * (1 - discountPercentage / 100);
    const totalRevenue = discountedPrice * quantity;
    const totalCost = (cost || 0) * quantity;
    const profit = totalRevenue - totalCost;
    const actualProfitMargin = totalCost > 0 ? (profit / totalCost) * 100 : 0;

    return NextResponse.json({
      success: true,
      data: {
        unitPrice: discountedPrice,
        totalRevenue,
        totalCost,
        profit,
        profitMargin: actualProfitMargin,
        discountApplied: discountPercentage,
        appliedPricingRule: appliedPricingRule ? {
          icd11Code: appliedPricingRule.icd11_code,
          categoryName: appliedPricingRule.category_name,
          baseMultiplier: appliedPricingRule.base_price_multiplier,
          complexityFactor: appliedPricingRule.complexity_factor,
          riskAdjustment: appliedPricingRule.risk_adjustment
        } : null
      }
    });
  } catch (error) {
    console.error("Error calculating price:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate price" },
      { status: 500 }
    );
  }
}