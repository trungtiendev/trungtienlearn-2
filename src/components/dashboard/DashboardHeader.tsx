"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, BookOpen, ShoppingBag, FileText, Gift } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    id: string;
    email: string;
    email_confirmed_at?: string;
  };
  profile?: {
    full_name?: string;
    avatar_url?: string;
    role?: string;
    bio?: string;
  };
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">TT</div>
            <span className="text-xl font-bold">
              TrungTien<span className="text-primary">Learn</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium">{profile?.full_name || user.email}</span>
              <span className="text-xs text-muted-foreground capitalize">{profile?.role || "user"}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
