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
  Calendar,
  ClipboardList,
  TrendingUp,
  Bell,
  X,
} from 'lucide-react';

const mainNavigation = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, icon: LayoutDashboard, roles: ['admin', 'teacher', 'parent', 'student'] },
];

const academicsNavigation = [
  { name: 'Timetable', href: ROUTES.TIMETABLE, icon: Calendar, roles: ['student'] },
  { name: 'Assignments', href: ROUTES.ASSIGNMENTS, icon: ClipboardList, roles: ['student'] },
];

const managementNavigation = [
  { name: 'Students', href: ROUTES.STUDENTS, icon: Users, roles: ['admin', 'teacher'] },
  { name: 'Teachers', href: ROUTES.TEACHERS, icon: GraduationCap, roles: ['admin'] },
  { name: 'Classes', href: ROUTES.CLASSES, icon: BookOpen, roles: ['admin', 'teacher'] },
];

const operationsNavigation = [
  { name: 'Attendance', href: ROUTES.ATTENDANCE, icon: ClipboardCheck, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Performance', href: ROUTES.PERFORMANCE, icon: TrendingUp, roles: ['student'] },
  { name: 'Fees', href: ROUTES.FEES, icon: DollarSign, roles: ['admin', 'parent', 'student'] },
  { name: 'Announcements', href: ROUTES.ANNOUNCEMENTS, icon: Bell, roles: ['student'] },
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
          'group relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer',
          isActive 
            ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border-slate-200 dark:border-slate-700 font-semibold' 
            : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        )}
        title={collapsed ? item.name : undefined}
      >
        <item.icon className={cn('h-[18px] w-[18px] shrink-0 transition-colors', isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600')} />
        <span
          className={cn(
            'text-[13px] transition-all duration-200',
            collapsed ? 'lg:hidden lg:opacity-0 w-0' : 'lg:block'
          )}
        >
          {item.name}
        </span>
        {isActive && !collapsed && (
          <div className="ml-auto h-1 w-1 rounded-full bg-indigo-500" />
        )}
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
          'px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.08em] mb-1.5 transition-all duration-200',
          isCollapsed ? 'lg:hidden lg:opacity-0' : 'lg:block'
        )}
      >
        {title}
      </h3>
      <div className="space-y-0.5">
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
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const user = useAuthStore((state) => state.user);

  const allNavItems = [...mainNavigation, ...academicsNavigation, ...managementNavigation, ...operationsNavigation];
  const filteredNavItems = allNavItems.filter((item) => user?.role && item.roles.includes(user.role));

  const mainItems = filteredNavItems.filter((item) => mainNavigation.some((m) => m.name === item.name));
  const academicItems = filteredNavItems.filter((item) => academicsNavigation.some((m) => m.name === item.name));
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
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-50 dark:bg-slate-900 border-r transition-all duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarCollapsed ? 'lg:w-14' : 'lg:w-64'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={cn('flex h-14 items-center px-4 mb-2', sidebarCollapsed ? 'lg:justify-center lg:px-2' : '')}>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-button">
              <GraduationCap className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">EduCore</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto h-8 w-8"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-4 scrollbar-none">
          {mainItems.length > 0 && (
            <SectionNav items={mainItems} title="Overview" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
          {academicItems.length > 0 && (
            <SectionNav items={academicItems} title="Academics" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
          {managementItems.length > 0 && (
            <SectionNav items={managementItems} title="Management" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
          {operationsItems.length > 0 && (
            <SectionNav items={operationsItems} title="Operations" isCollapsed={sidebarCollapsed} location={location.pathname} onItemClick={() => setSidebarOpen(false)} />
          )}
        </nav>

        <SidebarToggle />
      </aside>
    </>
  );
}