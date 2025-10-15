import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, FileText, Lock, Users, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance | HCTS Platform",
  description: "Learn about HCTS platform compliance with healthcare regulations, security standards, and industry certifications.",
};

export default function CompliancePage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Compliance & Security</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive compliance framework ensuring the highest standards of security and regulatory adherence.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Compliance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-green-200 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader className="pb-2">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-green-800 dark:text-green-200">HIPAA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Full compliance with HIPAA privacy and security rules
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
              <CardHeader className="pb-2">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-blue-800 dark:text-blue-200">ISO 27001</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Information security management system certified
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
              <CardHeader className="pb-2">
                <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-purple-800 dark:text-purple-200">SOC 2 Type II</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Security, availability, and confidentiality controls
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
              <CardHeader className="pb-2">
                <Globe className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg text-orange-800 dark:text-orange-200">GDPR Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Compliant with EU General Data Protection Regulation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Framework */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                1. Regulatory Compliance Framework
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      HIPAA Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Privacy Rule</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive protection of individually identifiable health information with strict access controls and audit trails.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Security Rule</h4>
                      <p className="text-sm text-muted-foreground">
                        Technical, administrative, and physical safeguards to ensure confidentiality, integrity, and availability of PHI.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Breach Notification Rule</h4>
                      <p className="text-sm text-muted-foreground">
                        60-day notification requirement for breaches affecting 500+ individuals, with immediate response protocols.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      ISO 27001 Certification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-1">Information Security Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Systematic approach to managing sensitive company and customer information with risk-based controls.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Risk Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        Continuous risk identification, assessment, and mitigation across all platform operations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Continuous Improvement</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular audits, testing, and updates to maintain certification standards.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                2. Security Standards & Certifications
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Certified</Badge>
                    <div>
                      <p className="font-medium">SOC 2 Type II</p>
                      <p className="text-sm text-muted-foreground">Security & Availability</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">Certified</Badge>
                    <div>
                      <p className="font-medium">PCI DSS Level 1</p>
                      <p className="text-sm text-muted-foreground">Payment Card Industry</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">Compliant</Badge>
                    <div>
                      <p className="font-medium">HITRUST CSF</p>
                      <p className="text-sm text-muted-foreground">Healthcare Security</p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Security Controls Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Technical Controls</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            End-to-end encryption (AES-256)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Multi-factor authentication
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Regular security assessments
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Automated threat detection
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Administrative Controls</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Role-based access control (RBAC)
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Regular staff training
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Incident response procedures
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Third-party risk management
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                3. Healthcare Industry Compliance
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ICD-11 Integration & Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Full integration with WHO ICD-11 classification system ensures accurate service categorization and billing compliance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Clinical Coding Standards</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• ICD-11 foundation and linearization</li>
                          <li>• SNOMED CT integration</li>
                          <li>• CPT/HCPCS code mapping</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Quality Assurance</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Automated code validation</li>
                          <li>• Clinical documentation improvement</li>
                          <li>• Compliance reporting</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Digital Certificate Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Blockchain-verified certificates with cryptographic signatures and immutable audit trails.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <p className="font-medium text-sm">Cryptographic Security</p>
                        <p className="text-xs text-muted-foreground">SHA-256 hashing, digital signatures</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <p className="font-medium text-sm">Immutable Records</p>
                        <p className="text-xs text-muted-foreground">Blockchain timestamping</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                        <p className="font-medium text-sm">Verification</p>
                        <p className="text-xs text-muted-foreground">QR code validation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                4. Risk Management & Monitoring
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Continuous Compliance Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Real-time Security Monitoring</h4>
                        <p className="text-sm text-muted-foreground">
                          24/7 security operations center with automated threat detection, intrusion prevention, and incident response capabilities.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Compliance Audits</h4>
                        <p className="text-sm text-muted-foreground">
                          Regular internal and external audits to ensure ongoing compliance with all regulatory requirements and industry standards.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Vulnerability Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Continuous scanning, assessment, and remediation of security vulnerabilities across all platform components.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Incident Response & Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Breach Response Protocol</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Immediate containment procedures</li>
                          <li>• Forensic investigation process</li>
                          <li>• Regulatory notification requirements</li>
                          <li>• User communication protocols</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Reporting Framework</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Automated compliance reporting</li>
                          <li>• Regulatory filing assistance</li>
                          <li>• Audit trail documentation</li>
                          <li>• Performance metrics tracking</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                5. International Compliance
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>GDPR Compliance Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Data Subject Rights</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Right to access personal data</li>
                          <li>• Right to data portability</li>
                          <li>• Right to rectification</li>
                          <li>• Right to erasure ("forget")</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Data Protection Measures</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Privacy by design principles</li>
                          <li>• Data protection impact assessments</li>
                          <li>• International data transfer safeguards</li>
                          <li>• Consent management systems</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2">Standard Contractual Clauses</h4>
                      <p className="text-sm text-muted-foreground">
                        Approved EU data transfer mechanisms
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-medium mb-2">Binding Corporate Rules</h4>
                      <p className="text-sm text-muted-foreground">
                        Internal data protection policies
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-medium mb-2">Adequacy Decisions</h4>
                      <p className="text-sm text-muted-foreground">
                        EU-recognized jurisdictions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                6. Compliance Resources & Support
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Documentation & Resources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Compliance documentation portal</li>
                      <li>• Regulatory update newsletters</li>
                      <li>• Security best practices guides</li>
                      <li>• Training materials and webinars</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Support & Contact</h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Compliance Team:</span>
                        <br />
                        Email: compliance@hcts.com
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Security Operations:</span>
                        <br />
                        Phone: +1 (800) SECURE-1
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Emergency Hotline:</span>
                        <br />
                        Phone: +1 (800) BREACH-1
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-primary font-medium">
                    Need assistance with compliance requirements? Our dedicated compliance team is available 24/7 to support your regulatory needs.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}