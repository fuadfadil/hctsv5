"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Stethoscope, Menu, Search, Home, ShoppingCart, BarChart3, User, Settings, LogOut } from "lucide-react";
import { useUserRole } from "@/hooks/use-user-role";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion, PanInfo } from "framer-motion";
import { getSession } from "@/lib/auth-client";

const DynamicUserProfile = dynamic(() => import("@/components/auth/user-profile"), { ssr: false });

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [session, setSession] = useState<any>(null);
  const { role } = useUserRole();
  const router = useRouter();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData?.data || null);
    };
    fetchSession();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + H: Go to Home
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        router.push('/');
      }
      // Alt + M: Go to Marketplace
      if (event.altKey && event.key === 'm') {
        event.preventDefault();
        router.push('/marketplace');
      }
      // Alt + D: Go to Dashboard
      if (event.altKey && event.key === 'd') {
        event.preventDefault();
        router.push('/dashboard');
      }
      // Alt + P: Go to Profile
      if (event.altKey && event.key === 'p') {
        event.preventDefault();
        router.push('/profile');
      }
      // Alt + S: Focus search input (mobile)
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        const searchInput = document.getElementById('mobile-search');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
    setIsOpen(false);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Close drawer if swiped left with sufficient velocity or distance
    if (offset < -100 || velocity < -500) {
      setIsOpen(false);
    }
  };

  // Touch-friendly button sizes and spacing
  const touchTargetClasses = "min-h-[44px] min-w-[44px]";

  const quickActions = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      roles: ["insurance", "intermediary", "provider"],
    },
    {
      label: "Marketplace",
      href: "/marketplace",
      icon: ShoppingCart,
      roles: ["all"],
    },
    {
      label: "Purchase History",
      href: "/purchase-history",
      icon: ShoppingCart,
      roles: ["insurance", "intermediary", "provider"],
    },
  ];

  const filteredActions = quickActions.filter(action =>
    action.roles.includes("all") || action.roles.includes(role || "")
  );

  return (
    <header className="border-b" role="banner">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            aria-label="HCTS Platform - Go to homepage"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10" aria-hidden="true">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              HCTS
            </span>
          </Link>
        </h1>
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1"
            aria-label="Go to Home page"
          >
            Home
          </Link>
          <Link
            href="/marketplace"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1"
            aria-label="Go to Marketplace page"
          >
            Marketplace
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1"
            aria-label="Go to Dashboard page"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1"
            aria-label="Go to Profile page"
          >
            Profile
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DynamicUserProfile />
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${touchTargetClasses}`}
                aria-label="Open mobile navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <motion.div
              ref={sheetRef}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="h-full"
            >
              <SheetContent side="left" className="w-80 p-0" id="mobile-navigation">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10" aria-hidden="true">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  HCTS Navigation
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6">
                {/* Search */}
                <div className="relative">
                  <label htmlFor="mobile-search" className="sr-only">Search the platform</label>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="mobile-search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    aria-label="Search input"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                    aria-label="Go to Home page"
                  >
                    <Home className="h-5 w-5" aria-hidden="true" />
                    Home
                  </Link>
                  <Link
                    href="/marketplace"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                    aria-label="Go to Marketplace page"
                  >
                    <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                    Marketplace
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                    aria-label="Go to Dashboard page"
                  >
                    <BarChart3 className="h-5 w-5" aria-hidden="true" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                    aria-label="Go to Profile page"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    Profile
                  </Link>
                </nav>

                {/* Quick Actions */}
                {filteredActions.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3" id="quick-actions-heading">Quick Actions</h3>
                    <div className="flex flex-col gap-2" role="list" aria-labelledby="quick-actions-heading">
                      {filteredActions.map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                          role="listitem"
                          aria-label={`Quick action: ${action.label}`}
                        >
                          <action.icon className="h-4 w-4" aria-hidden="true" />
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* User Profile Section */}
                {session && (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 px-3 py-2" role="region" aria-labelledby="user-profile-heading">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" id="user-profile-heading">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-1" role="list" aria-label="User account options">
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                        role="listitem"
                        aria-label="Go to your profile settings"
                      >
                        <Settings className="h-4 w-4" aria-hidden="true" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-accent transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${touchTargetClasses}`}
                        role="listitem"
                        aria-label="Sign out of your account"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
            </motion.div>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
