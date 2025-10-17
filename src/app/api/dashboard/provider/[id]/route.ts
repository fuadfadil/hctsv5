import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services, transactions, users, profiles, icd11Categories } from "@/lib/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);

    // Get active services count
    const activeServicesCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(services)
      .where(and(eq(services.provider_id, userId), eq(services.status, "active")));

    // Get total sales (completed transactions)
    const totalSales = await db
      .select({
        total: sql<number>`sum(${transactions.total_price})`,
        count: sql<number>`count(*)`
      })
      .from(transactions)
      .where(and(
        eq(transactions.seller_id, userId),
        eq(transactions.status, "completed")
      ));

    // Get pending orders
    const pendingOrdersCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(and(
        eq(transactions.seller_id, userId),
        eq(transactions.status, "pending")
      ));

    // Get recent transactions
    const recentTransactions = await db
      .select({
        id: transactions.id,
        quantity: transactions.quantity,
        total_price: transactions.total_price,
        status: transactions.status,
        created_at: transactions.created_at,
        service_name: services.name,
        buyer_name: profiles.organization_name,
      })
      .from(transactions)
      .innerJoin(services, eq(transactions.service_id, services.id))
      .innerJoin(users, eq(transactions.buyer_id, users.id))
      .innerJoin(profiles, eq(users.id, profiles.user_id))
      .where(eq(transactions.seller_id, userId))
      .orderBy(desc(transactions.created_at))
      .limit(10);

    // Get service performance metrics
    const serviceMetrics = await db
      .select({
        service_id: services.id,
        service_name: services.name,
        icd11_code: services.icd11_code,
        icd11_name: icd11Categories.name,
        views: sql<number>`0`, // Placeholder - would need view tracking
        purchases: sql<number>`count(${transactions.id})`,
        rating: sql<number>`0`, // Placeholder - would need rating system
      })
      .from(services)
      .leftJoin(icd11Categories, eq(services.icd11_code, icd11Categories.code))
      .leftJoin(transactions, and(
        eq(services.id, transactions.service_id),
        eq(transactions.status, "completed")
      ))
      .where(eq(services.provider_id, userId))
      .groupBy(services.id, services.name, services.icd11_code, icd11Categories.name);

    // Get ICD11 category analytics
    const icd11Analytics = await db
      .select({
        icd11_code: services.icd11_code,
        category_name: icd11Categories.name,
        service_count: sql<number>`count(distinct ${services.id})`,
        total_sales: sql<number>`sum(${transactions.total_price})`,
        transaction_count: sql<number>`count(${transactions.id})`,
      })
      .from(services)
      .leftJoin(icd11Categories, eq(services.icd11_code, icd11Categories.code))
      .leftJoin(transactions, and(
        eq(services.id, transactions.service_id),
        eq(transactions.status, "completed")
      ))
      .where(eq(services.provider_id, userId))
      .groupBy(services.icd11_code, icd11Categories.name)
      .orderBy(desc(sql<number>`sum(${transactions.total_price})`));

    return NextResponse.json({
      activeServices: activeServicesCount[0]?.count || 0,
      totalSales: totalSales[0]?.total || 0,
      totalTransactions: totalSales[0]?.count || 0,
      pendingOrders: pendingOrdersCount[0]?.count || 0,
      recentTransactions,
      serviceMetrics,
      icd11Analytics,
    });
  } catch (error) {
    console.error("Error fetching provider dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}