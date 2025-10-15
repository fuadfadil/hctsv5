import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | HCTS Platform",
  description: "Learn how HCTS protects your privacy and handles your personal information in compliance with HIPAA and GDPR standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy and data security are our top priorities. Learn how we protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">HIPAA Compliant</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Full compliance with HIPAA standards for healthcare data protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">GDPR Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Adheres to EU General Data Protection Regulation requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Database className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">End-to-End Encryption</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  All data is encrypted in transit and at rest using industry-standard protocols.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to the Healthcare Trading and Compliance System (HCTS) Platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. We are committed to protecting your privacy and ensuring compliance with all applicable data protection laws, including HIPAA and GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Name, email address, and contact information</li>
                    <li>Professional credentials and licenses</li>
                    <li>Healthcare provider information and certifications</li>
                    <li>Insurance company details and coverage information</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Protected Health Information (PHI)</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Patient health records and medical data</li>
                    <li>Diagnostic information and treatment records</li>
                    <li>Medical billing and claims data</li>
                    <li>Healthcare service transaction details</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and platform interactions</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-6 h-6" />
                3. How We Use Your Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Platform Operations</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Facilitate secure healthcare service trading</li>
                    <li>Process payments and manage transactions</li>
                    <li>Generate and verify digital certificates</li>
                    <li>Provide customer support and technical assistance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Compliance and Security</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Ensure HIPAA and regulatory compliance</li>
                    <li>Monitor for security threats and fraud</li>
                    <li>Maintain audit trails and compliance records</li>
                    <li>Conduct security assessments and risk analysis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Service Improvement</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Analyze usage patterns to improve platform functionality</li>
                    <li>Develop new features and services</li>
                    <li>Provide personalized user experiences</li>
                    <li>Conduct research and analytics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Authorized Disclosures</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>With healthcare providers for service delivery</li>
                    <li>With insurance companies for claims processing</li>
                    <li>With payment processors for transaction completion</li>
                    <li>As required by law or legal process</li>
                    <li>To protect platform security and user safety</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Business Partners</h3>
                  <p className="text-muted-foreground">
                    We may share information with trusted business partners who assist in operating our platform, but only under strict confidentiality agreements and data protection requirements.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                5. Data Security Measures
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Safeguards</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>256-bit SSL/TLS encryption for all data transmission</li>
                    <li>AES-256 encryption for data at rest</li>
                    <li>Multi-factor authentication for all accounts</li>
                    <li>Regular security audits and penetration testing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Administrative Safeguards</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Role-based access controls (RBAC)</li>
                    <li>Regular staff training on data protection</li>
                    <li>Incident response and breach notification procedures</li>
                    <li>Business continuity and disaster recovery plans</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Physical Safeguards</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Secure data center facilities with 24/7 monitoring</li>
                    <li>Access controls and surveillance systems</li>
                    <li>Environmental controls for server rooms</li>
                    <li>Secure disposal procedures for hardware</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6" />
                6. Your Rights and Choices
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Access and Control</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Access your personal information through your dashboard</li>
                    <li>Update or correct your information at any time</li>
                    <li>Request deletion of your data (subject to legal requirements)</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Communication Preferences</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Opt-out of marketing communications</li>
                    <li>Control notification preferences</li>
                    <li>Manage cookie settings and tracking preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Legal Rights</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Right to be forgotten (GDPR)</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                    <li>Right to lodge complaints with supervisory authorities</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                7. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information only as long as necessary for the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Healthcare records and PHI are retained according to applicable regulatory requirements (typically 6-7 years for HIPAA compliance). You may request deletion of your data at any time, subject to legal and regulatory constraints.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                8. International Data Transfers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                As a global healthcare platform, we may transfer data across international borders. All transfers are conducted in compliance with applicable data protection laws, including Standard Contractual Clauses for EU-US transfers and adequacy decisions. We ensure that all international transfers maintain the same level of protection as required by GDPR and other regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                9. Children's Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is designed for healthcare professionals and organizations. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take immediate steps to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                10. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify users of material changes via email or platform notifications. Your continued use of the platform after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                11. Contact Us
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Data Protection Officer</p>
                  <p className="text-muted-foreground">Email: privacy@hcts.com</p>
                  <p className="text-muted-foreground">Phone: +1 (800) PRIVACY-1</p>
                  <p className="text-muted-foreground">Address: HCTS Platform, Data Protection Office, [Company Address]</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  For urgent privacy concerns or data breach reports, please call our emergency line: +1 (800) HEALTH-1
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}