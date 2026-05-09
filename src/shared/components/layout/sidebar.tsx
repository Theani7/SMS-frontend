import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { useUIStore } from '../../store/ui-store';
import { useAuthStore } from '../../store/auth-store';
import { ROUTES } from '../../lib/constants';
import { SidebarToggle } from './sidebar-toggle';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  X,
} from 'lucide-react';

const mainNavigation = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard, roles: ['admin', 'teacher', 'parent', 'student'] },
];

const managementNavigation = [
  { name: 'Students', href: ROUTES.STUDENTS, icon: Users, roles: ['admin', 'teacher'] },
  { name: 'Teachers', href: ROUTES.TEACHERS, icon: GraduationCap, roles: ['admin'] },
  { name: 'Classes', href: ROUTES.CLASSES, icon: BookOpen, roles: ['admin', 'teacher'] },
];

const operationsNavigation = [
  { name: 'Attendance', href: ROUTES.ATTENDANCE, icon: ClipboardCheck, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Fees', href: ROUTES.FEES, icon: DollarSign, roles: ['admin', 'parent'] },
];

interface NavItemType {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

function NavItem({ item, isActive, collapsed, onClick }: NavItemProps) {
  return (
    <Link to={item.href} onClick={onClick}>
      <div
        className={cn(
          'group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer',
          isActive ? 'bg-primary/10' : 'hover:bg-accent',
          isActive && 'border-l-4 border-indigo-500 -ml-1 pl-4'
        )}
        title={collapsed ? item.name : undefined}
      >
        <item.icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground')} />
        <span
          className={cn(
            'font-medium transition-all duration-200',
            collapsed ? 'lg:hidden lg:opacity-0 w-0' : 'lg:block'
          )}
        >
          {item.name}
        </span>
      </div>
    </Link>
  );
}

interface SectionNavProps {
  items: NavItemType[];
  title: string;
  isCollapsed: boolean;
  location: string;
  onItemClick?: () => void;
}

function SectionNav({ items, title, isCollapsed, location, onItemClick }: SectionNavProps) {
  const filteredItems = items; // Filter by role handled at parent level

  return (
    <div className="space-y-1">
      <h3
        className={cn(
          'px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 transition-all duration-200',
          isCollapsed ? 'lg:hidden lg:opacity-0' : 'lg:block'
        )}
      >
        {title}
      </h3>
      {filteredItems.map((item) => (
        <NavItem
          key={item.name}
          item={item}
          isActive={location === item.href || location.startsWith(`${item.href}/`)}
          collapsed={isCollapsed}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useUIStore();
  const { user } = useAuthStore();

  const allNavItems = [...mainNavigation, ...managementNavigation, ...operationsNavigation];
  const filteredNavItems = allNavItems.filter((item) => user?.role && item.roles.includes(user.role));

  const mainItems = filteredNavItems.filter((item) => mainNavigation.some((m) => m.name === item.name));
  const managementItems = filteredNavItems.filter((item) => managementNavigation.some((m) => m.name === item.name));
  const operationsItems = filteredNavItems.filter((item) => operationsNavigation.some((m) => m.name === item.name));

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-background border-r transition-all duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarCollapsed ? 'lg:w-14' : 'lg:w-60'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={cn('flex h-16 items-center border-b px-4', sidebarCollapsed ? 'lg:justify-center lg:px-2' : '')}>
          {!sidebarCollapsed && <span className="text-xl font-bold">School App</span>}
          {sidebarCollapsed && <div className="h-6 w-6 rounded bg-primary lg:block hidden" />}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {mainItems.length > 0 && (
            <SectionNav items={mainItems} title="MAIN" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
          {managementItems.length > 0 && (
            <SectionNav items={managementItems} title="MANAGEMENT" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
          {operationsItems.length > 0 && (
            <SectionNav items={operationsItems} title="OPERATIONS" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
        </nav>

        {/* User section */}
        <div className={cn('border-t p-4', sidebarCollapsed ? 'lg:px-2 lg:py-3' : '')}>
          {user ? (
            <div className={cn('flex items-center gap-3', sidebarCollapsed ? 'lg:justify-center' : '')}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-medium">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className={cn('flex-1 min-w-0 transition-all duration-200', sidebarCollapsed ? 'lg:hidden lg:opacity-0 lg:w-0' : 'lg:block')}>
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>
          ) : (
            <div className={cn('flex items-center gap-3', sidebarCollapsed ? 'lg:justify-center' : '')}>
              <div className="h-9 w-9 rounded-full bg-muted" />
              <div className={cn('flex-1 min-w-0', sidebarCollapsed ? 'lg:hidden' : 'lg:block')}>
                <p className="text-sm font-medium">Guest</p>
              </div>
            </div>
          )}
        </div>

        <SidebarToggle />
      </aside>
    </>
  );
}