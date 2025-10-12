import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, services, transactions, certificates } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Get total users by role
    const userStats = await db
      .select({
        role: users.role,
        count: sql<number>`count(*)`
      })
      .from(users)
      .groupBy(users.role);

    // Get total services and active services
    const serviceStats = await db
      .select({
        totalServices: sql<number>`count(*)`,
        activeServices: sql<number>`count(case when ${services.status} = 'active' then 1 end)`
      })
      .from(services);

    // Get transaction statistics
    const transactionStats = await db
      .select({
        totalTransactions: sql<number>`count(*)`,
        totalVolume: sql<number>`sum(${transactions.total_price})`,
        completedTransactions: sql<number>`count(case when ${transactions.status} = 'completed' then 1 end)`
      })
      .from(transactions);

    // Get certificate statistics
    const certificateStats = await db
      .select({
        totalCertificates: sql<number>`count(*)`,
        validCertificates: sql<number>`count(case when ${certificates.status} = 'valid' then 1 end)`
      })
      .from(certificates);

    // Calculate platform metrics
    const providers = userStats.find(u => u.role === 'provider')?.count || 0;
    const insurers = userStats.find(u => u.role === 'insurance')?.count || 0;
    const intermediaries = userStats.find(u => u.role === 'intermediary')?.count || 0;
    const totalUsers = providers + insurers + intermediaries;

    const totalServices = serviceStats[0]?.totalServices || 0;
    const activeServices = serviceStats[0]?.activeServices || 0;

    const totalTransactions = transactionStats[0]?.totalTransactions || 0;
    const totalVolume = transactionStats[0]?.totalVolume || 0;
    const completedTransactions = transactionStats[0]?.completedTransactions || 0;

    const totalCertificates = certificateStats[0]?.totalCertificates || 0;
    const validCertificates = certificateStats[0]?.validCertificates || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        providers,
        insurers,
        intermediaries,
        totalServices,
        activeServices,
        totalTransactions,
        completedTransactions,
        totalVolume: Number(totalVolume),
        totalCertificates,
        validCertificates,
        platformUptime: 99.9, // Static for now, could be calculated from system metrics
        averageTransactionValue: totalTransactions > 0 ? Number(totalVolume) / totalTransactions : 0
      }
    });
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch platform statistics" },
      { status: 500 }
    );
  }
}