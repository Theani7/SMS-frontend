import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  TrendingUp,
  MoreHorizontal,
  DollarSign,
  Bell,
  Users,
  ClipboardCheck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/shared/components/ui/sheet";
import { cn } from "~/shared/lib/utils";
import { useAuthStore } from "~/shared/store/auth-store";

interface TabItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const mainTabs: TabItem[] = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Assignments", href: "/assignments", icon: ClipboardList },
  { label: "Timetable", href: "/timetable", icon: Calendar },
  { label: "Performance", href: "/performance", icon: TrendingUp },
];

const moreTabs: TabItem[] = [
  { label: "Fees", href: "/fees", icon: DollarSign },
  { label: "Announcements", href: "/announcements", icon: Bell },
];

const parentTabs: TabItem[] = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Children", href: "/children", icon: Users },
  { label: "Attendance", href: "/attendance", icon: ClipboardCheck },
  { label: "Fees", href: "/fees", icon: DollarSign },
];

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  const Icon = tab.icon;

  return (
    <button
      onClick={onClick}
      aria-label={tab.label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
        isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "fill-indigo-100" : "")} />
      <span className="text-xs font-medium">{tab.label}</span>
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
      )}
    </button>
  );
}

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isParent = user?.role === "parent";
  const tabs = isParent ? parentTabs : mainTabs;

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const handleMoreNavigate = (href: string) => {
    setIsMoreOpen(false);
    navigate(href);
  };

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center border-t bg-white dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/60 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex flex-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab.href}
              tab={tab}
              isActive={isActive(tab.href)}
              onClick={() => handleNavigate(tab.href)}
            />
          ))}
          {!isParent && (
            /* More tab */
            <button
              aria-label="More options"
              onClick={() => setIsMoreOpen(true)}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-300"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs font-medium">More</span>
            </button>
          )}
        </div>
      </nav>

      {!isParent && (
        <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>More Options</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-2">
              {moreTabs.map((tab) => (
                <button
                  key={tab.href}
                  onClick={() => handleMoreNavigate(tab.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
                    isActive(tab.href)
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}