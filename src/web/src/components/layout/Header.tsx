// src/components/layout/Header.tsx
import { Link } from "react-router-dom";
import { Newspaper, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
import { getAvatarFallback } from "@/lib/utils";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6" />
            <span className="text-xl font-bold">NewsAggregator</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img src={getAvatarFallback(user.name)} alt={user.name} className="h-8 w-8 rounded-full bg-secondary" />
                  <span className="hidden sm:inline-block text-sm font-medium">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
