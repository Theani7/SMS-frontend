import React from 'react';
import { useNotificationStore, NotificationType } from '../../store/notification-store';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-[hsl(var(--corporate-success))]" />,
  error: <AlertCircle className="h-5 w-5 text-[hsl(var(--corporate-error))]" />,
  info: <Info className="h-5 w-5 text-[hsl(var(--corporate-info))]" />,
  warning: <AlertTriangle className="h-5 w-5 text-[hsl(var(--corporate-warning))]" />,
};

const bgColors: Record<NotificationType, string> = {
  success: 'bg-[hsl(var(--corporate-success)/0.05)] border-[hsl(var(--corporate-success)/0.2)]',
  error: 'bg-[hsl(var(--corporate-error)/0.05)] border-[hsl(var(--corporate-error)/0.2)]',
  info: 'bg-[hsl(var(--corporate-info)/0.05)] border-[hsl(var(--corporate-info)/0.2)]',
  warning: 'bg-[hsl(var(--corporate-warning)/0.05)] border-[hsl(var(--corporate-warning)/0.2)]',
};

export const Toaster: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            'flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in fade-in slide-in-from-right-5 duration-300',
            bgColors[notification.type]
          )}
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5">
            {icons[notification.type]}
          </div>
          <div className="flex-1 text-sm font-medium text-slate-900">
            {notification.message}
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
