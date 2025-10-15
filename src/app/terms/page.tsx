import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertTriangle, Users, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | HCTS Platform",
  description: "Read the terms and conditions for using the HCTS healthcare trading platform. Understand your rights and responsibilities.",
};

export default function TermsOfServicePage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using the HCTS Platform.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Secure Platform</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  HIPAA-compliant healthcare trading platform with enterprise-grade security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Multi-Role Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Designed for healthcare providers, insurers, and intermediaries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  PCI DSS compliant payment processing with fraud protection.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Terms of Service Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Healthcare Trading and Compliance System (HCTS) Platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mt-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Important:</strong> These terms apply to all users including healthcare providers, insurance companies, intermediaries, and other healthcare organizations.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                2. User Eligibility and Registration
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Eligibility Requirements</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Healthcare providers must hold valid professional licenses</li>
                    <li>Insurance companies must be properly licensed and regulated</li>
                    <li>Intermediaries must demonstrate relevant experience</li>
                    <li>All users must be 18 years or older</li>
                    <li>Users must be authorized to conduct business in their jurisdiction</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Registration</h3>
                  <p className="text-muted-foreground">
                    You must provide accurate, complete, and current information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Verification Process</h3>
                  <p className="text-muted-foreground">
                    All users undergo a verification process to ensure compliance with regulatory requirements. This may include document submission, background checks, and professional credential validation.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                3. Platform Usage and Responsibilities
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Permitted Use</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Trading healthcare services through the platform</li>
                    <li>Managing certificates and compliance documentation</li>
                    <li>Accessing dashboards and analytics</li>
                    <li>Communicating with verified platform users</li>
                    <li>Using platform tools for legitimate business purposes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Prohibited Activities</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Fraudulent or deceptive practices</li>
                    <li>Violation of healthcare regulations or laws</li>
                    <li>Unauthorized access to other users' data</li>
                    <li>Distribution of malware or harmful code</li>
                    <li>Interference with platform operations</li>
                    <li>Impersonation of other users or entities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Content Standards</h3>
                  <p className="text-muted-foreground">
                    All content uploaded to the platform must comply with healthcare privacy laws (HIPAA), professional standards, and platform guidelines. Users are responsible for ensuring their content does not violate intellectual property rights.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                4. Payment Terms and Billing
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Transaction Fees</h3>
                  <p className="text-muted-foreground">
                    Platform fees are charged for successful transactions. Fee structures vary by user role and service type. All fees are disclosed before transaction completion.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Payment Processing</h3>
                  <p className="text-muted-foreground">
                    Payments are processed through secure, PCI DSS compliant gateways. All payment information is encrypted and protected. Users are responsible for providing accurate billing information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Refunds and Disputes</h3>
                  <p className="text-muted-foreground">
                    Refund policies vary by service type and are governed by applicable healthcare regulations. Disputes must be reported within 30 days of transaction completion.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                5. Data Privacy and Security
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">HIPAA Compliance</h3>
                  <p className="text-muted-foreground">
                    The platform is fully HIPAA compliant. Protected Health Information (PHI) is handled according to strict privacy and security standards. Users must maintain HIPAA compliance in their use of the platform.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Encryption</h3>
                  <p className="text-muted-foreground">
                    All data is encrypted in transit and at rest using industry-standard encryption protocols. Access controls and audit trails ensure data security and compliance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">User Responsibilities</h3>
                  <p className="text-muted-foreground">
                    Users are responsible for maintaining the security of their accounts and for complying with all applicable data protection laws when using PHI or other sensitive information.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                6. Liability and Disclaimers
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Service Disclaimers</h3>
                  <p className="text-muted-foreground">
                    The platform is provided "as is" without warranties of any kind. While we strive for high availability and accuracy, we cannot guarantee uninterrupted service or freedom from errors.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    HCTS's liability is limited to the amount paid for platform services in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">User Indemnification</h3>
                  <p className="text-muted-foreground">
                    Users agree to indemnify HCTS against claims arising from their use of the platform, violation of these terms, or infringement of third-party rights.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                7. Intellectual Property
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Platform IP</h3>
                  <p className="text-muted-foreground">
                    All platform software, design, and content are owned by HCTS or our licensors. Users are granted a limited license to use the platform for authorized purposes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">User Content</h3>
                  <p className="text-muted-foreground">
                    Users retain ownership of their content but grant HCTS a license to use it for platform operations. Users warrant they have rights to upload and share their content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Trademarks</h3>
                  <p className="text-muted-foreground">
                    HCTS trademarks and branding may not be used without permission. Users may not create derivative works or reverse engineer platform software.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                8. Termination and Suspension
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Termination Rights</h3>
                  <p className="text-muted-foreground">
                    Either party may terminate this agreement with 30 days' notice. HCTS may terminate immediately for breach of terms or violation of laws.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Suspension</h3>
                  <p className="text-muted-foreground">
                    Accounts may be suspended for security reasons, regulatory compliance, or violation of terms. Users will be notified of suspension reasons and appeal procedures.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Retention After Termination</h3>
                  <p className="text-muted-foreground">
                    Certain data may be retained after termination for legal, regulatory, or business purposes. Users may request data export before termination.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                9. Dispute Resolution
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Governing Law</h3>
                  <p className="text-muted-foreground">
                    These terms are governed by the laws of [Jurisdiction], without regard to conflict of law principles. Disputes will be resolved in the courts of [Jurisdiction].
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Mediation</h3>
                  <p className="text-muted-foreground">
                    Parties agree to attempt mediation before pursuing legal action. Mediation will be conducted through a neutral third party in [Location].
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Class Action Waiver</h3>
                  <p className="text-muted-foreground">
                    Users waive the right to participate in class action lawsuits. Disputes must be resolved individually through binding arbitration.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                10. Changes to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Material changes will be communicated via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                11. Contact Information
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Legal Department</p>
                  <p className="text-muted-foreground">Email: legal@hcts.com</p>
                  <p className="text-muted-foreground">Phone: +1 (800) LEGAL-1</p>
                  <p className="text-muted-foreground">Address: HCTS Platform, Legal Department, [Company Address]</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  For urgent legal matters or compliance concerns, please call our legal hotline: +1 (800) COMPLY-1
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                12. Severability and Entire Agreement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these terms is found to be unenforceable, the remaining provisions will remain in effect. These terms constitute the entire agreement between users and HCTS regarding platform use.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}