import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useThemeStore } from '../../store/theme-store';
import { useUIStore } from '../../store/ui-store';
import { useAuthStore } from '../../store/auth-store';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { toggleSidebar, sidebarOpen } = useUIStore();
  const { user, logout } = useAuthStore();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground capitalize">{user?.role}</span>
          <span>/</span>
          <span>Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          System Online
        </div>

        <div className="flex items-center gap-1 border-r pr-3 mr-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'light' ? (
              <Moon className="h-[18px] w-[18px]" />
            ) : (
              <Sun className="h-[18px] w-[18px]" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-indigo-500 border-2 border-background" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 px-1 hover:bg-transparent">
              <Avatar className="h-8 w-8 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start leading-none">
                <span className="text-sm font-semibold">{user?.name}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
