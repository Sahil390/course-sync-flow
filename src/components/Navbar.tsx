import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  hideGetStarted?: boolean;
}

export const Navbar = ({ onMenuClick, showMenuButton = false, hideGetStarted = false }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showMenuButton && (
              <Button variant="ghost" size="icon" onClick={onMenuClick}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent gradient-primary">
                StudySync
              </span>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/materials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary"
            >
              Study Materials
            </NavLink>
            <NavLink
              to="/quiz"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary"
            >
              Quizzes
            </NavLink>
            <NavLink
              to="/forum"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary"
            >
              Forum
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <NavLink to="/profile" className="w-full">Profile</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink to="/login" className="w-full">Logout</NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!hideGetStarted && (
              <NavLink to="/login">
                <Button variant="default" className="hidden sm:flex gradient-primary border-0">
                  Get Started
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
