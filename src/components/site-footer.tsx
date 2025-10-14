"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, Mail, Phone, MapPin, Shield, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcuts for footer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + T: Scroll to top
      if (event.altKey && event.key === 't') {
        event.preventDefault();
        scrollToTop();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <footer className="border-t bg-background" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <section className="space-y-4" aria-labelledby="company-info-heading">
            <h3 className="text-lg font-semibold" id="company-info-heading">HCTS Platform</h3>
            <p className="text-sm text-muted-foreground">
              Connecting healthcare providers, intermediaries, and insurance companies
              through secure, compliant digital solutions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Global Healthcare Network</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </section>

          {/* Quick Links Section */}
          <nav className="space-y-4" aria-labelledby="quick-links-heading">
            <h3 className="text-lg font-semibold" id="quick-links-heading">Quick Links</h3>
            <ul className="space-y-2" role="list">
              <li>
                <a href="/marketplace" className="block text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Go to Service Marketplace">
                  Service Marketplace
                </a>
              </li>
              <li>
                <a href="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Go to Dashboard">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/certificates" className="block text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Go to Certificates">
                  Certificates
                </a>
              </li>
              <li>
                <a href="/profile" className="block text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Go to Profile">
                  Profile
                </a>
              </li>
              <li>
                <a href="/purchase-history" className="block text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Go to Purchase History">
                  Purchase History
                </a>
              </li>
            </ul>
          </nav>

          {/* Support Section */}
          <section className="space-y-4" aria-labelledby="support-heading">
            <h3 className="text-lg font-semibold" id="support-heading">Support</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Emergency Support</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-red-500" aria-hidden="true" />
                  <a href="tel:+1800HEALTH1" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1" aria-label="Call emergency support at +1 (800) HEALTH-1">+1 (800) HEALTH-1</a>
                </div>
                <p className="text-xs text-muted-foreground">Available 24/7 for critical issues</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Technical Support</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <a href="mailto:support@hcts.com" className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1" aria-label="Email technical support at support@hcts.com">support@hcts.com</a>
                </div>
                <p className="text-xs text-muted-foreground">Response within 2 hours</p>
              </div>
            </div>
          </section>

          {/* Social & Compliance Section */}
          <section className="space-y-4" aria-labelledby="connect-compliance-heading">
            <h3 className="text-lg font-semibold" id="connect-compliance-heading">Connect & Compliance</h3>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Stay Updated</p>
              <form className="flex space-x-2" role="form" aria-label="Newsletter signup">
                <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 h-8"
                  aria-describedby="newsletter-description"
                />
                <Button size="sm" className="h-8 px-3" type="submit" aria-label="Subscribe to newsletter">
                  <Mail className="h-3 w-3" aria-hidden="true" />
                </Button>
              </form>
              <p id="newsletter-description" className="sr-only">Subscribe to receive updates about HCTS platform</p>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Follow Us</p>
              <ul className="flex space-x-2" role="list">
                <li>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Follow us on Facebook">
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Follow us on Twitter">
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Follow us on LinkedIn">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Follow us on YouTube">
                    <Youtube className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </li>
              </ul>
            </div>

            {/* Compliance Badges */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Compliance</p>
              <ul className="space-y-1" role="list">
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">HIPAA Compliant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">GDPR Ready</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 HCTS Platform. All rights reserved.
          </div>

          {/* Legal Links */}
          <nav className="flex space-x-6 text-sm" role="navigation" aria-label="Legal links">
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Read our Privacy Policy">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="Read our Terms of Service">
              Terms of Service
            </a>
            <a href="/compliance" className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1" aria-label="View our Compliance information">
              Compliance
            </a>
          </nav>

          {/* Back to Top Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Scroll to top of page"
          >
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
            <span>Top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
