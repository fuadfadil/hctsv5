"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDiagnostics } from "@/hooks/use-diagnostics";
import {
  Video,
  Shield,
  Database,
  Palette,
  Bot,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Star,
  Globe,
  Heart,
  Stethoscope,
  Activity,
  Zap
} from "lucide-react";

interface PlatformStats {
  totalUsers: number;
  providers: number;
  insurers: number;
  intermediaries: number;
  totalServices: number;
  activeServices: number;
  totalTransactions: number;
  completedTransactions: number;
  totalVolume: number;
  totalCertificates: number;
  validCertificates: number;
  platformUptime: number;
  averageTransactionValue: number;
}

export default function Home() {
  const { isAuthReady, isAiReady, loading } = useDiagnostics();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/platform-stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch platform stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Healthcare Trading Platform
              </Badge>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  HCTS
                </h1>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Revolutionizing Healthcare Service Trading with
                <span className="text-primary"> Secure, Compliant Technology</span>
              </h2>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect healthcare providers, insurance companies, and intermediaries in a trusted marketplace.
                Trade services securely with ICD-11 integration, AI diagnostics, and blockchain-verified certificates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8 py-6 text-lg font-semibold">
                <Link href="/register">
                  <Users className="w-5 h-5 mr-2" />
                  Get Started Today
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Link href="/marketplace">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Marketplace
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-blue-500" />
                End-to-End Encrypted
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-yellow-500" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4 text-purple-500" />
                99.9% Uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted by Healthcare Professionals Worldwide</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of healthcare organizations already using HCTS to streamline their service trading operations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {statsLoading ? "..." : formatNumber(stats?.totalUsers || 0)}
                </div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {statsLoading ? "..." : formatNumber(stats?.totalServices || 0)}
                </div>
                <p className="text-sm text-muted-foreground">Healthcare Services</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {statsLoading ? "..." : formatNumber(stats?.completedTransactions || 0)}
                </div>
                <p className="text-sm text-muted-foreground">Successful Transactions</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {statsLoading ? "..." : formatCurrency(stats?.totalVolume || 0)}
                </div>
                <p className="text-sm text-muted-foreground">Trading Volume</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Comprehensive Healthcare Trading Platform</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to securely trade healthcare services with confidence, compliance, and cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Secure Marketplace</CardTitle>
                <CardDescription>
                  End-to-end encrypted transactions with multi-factor authentication and real-time compliance monitoring.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">ICD-11 Integration</CardTitle>
                <CardDescription>
                  Complete integration with WHO ICD-11 classification system for accurate service categorization and billing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Digital Certificates</CardTitle>
                <CardDescription>
                  Blockchain-verified certificates with QR code verification, digital signatures, and audit trails.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Diagnostics</CardTitle>
                <CardDescription>
                  Advanced AI-powered diagnostic assistance with ICD-11 integration and real-time clinical decision support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Multi-Role Dashboards</CardTitle>
                <CardDescription>
                  Tailored dashboards for providers, insurers, and intermediaries with role-based access control.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-Time Analytics</CardTitle>
                <CardDescription>
                  Comprehensive analytics and reporting with predictive insights for better decision making.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Pathways */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Join the Healthcare Trading Revolution</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose your role and start trading healthcare services securely and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Healthcare Providers</CardTitle>
                <CardDescription className="text-base">
                  List your services, manage certificates, and connect with global markets through our secure platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Service listing & management
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Certificate generation
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Real-time analytics
                  </li>
                </ul>
                <Button asChild className="w-full" size="lg">
                  <Link href="/register?role=provider">
                    Register as Provider
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Insurance Companies</CardTitle>
                <CardDescription className="text-base">
                  Access verified providers and manage healthcare coverage with confidence and transparency.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Verified provider network
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Claims processing
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Risk assessment tools
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/register?role=insurance">
                    Register as Insurer
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Intermediaries</CardTitle>
                <CardDescription className="text-base">
                  Facilitate transactions and earn commissions on successful healthcare service trades.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Commission-based earnings
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Transaction facilitation
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Network expansion tools
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link href="/register?role=intermediary">
                    Register as Intermediary
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold">Ready to Transform Healthcare Trading?</h3>
            <p className="text-xl opacity-90">
              Join the secure, compliant platform that's revolutionizing how healthcare services are traded worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              {loading || !isAuthReady ? (
                <Button size="lg" disabled={true} className="px-8 py-6 text-lg">
                  Access Dashboard
                </Button>
              ) : (
                <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold">
                  <Link href="/dashboard">
                    <Activity className="w-5 h-5 mr-2" />
                    Access Dashboard
                  </Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Link href="/marketplace">
                  <Palette className="w-5 h-5 mr-2" />
                  Browse Marketplace
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Link href="/verify">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Verify Certificate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
