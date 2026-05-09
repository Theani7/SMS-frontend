import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useUIStore } from '../../store/ui-store';

export function SidebarToggle() {
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <Button
      variant="outline"
      size="icon"
      className="hidden lg:flex absolute top-20 -right-3 h-7 w-7 rounded-full border bg-background shadow-sm z-50"
      onClick={toggleSidebarCollapse}
      aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
    </Button>
  );
}
