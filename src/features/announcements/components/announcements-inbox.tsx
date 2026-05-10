import { useState, useMemo } from 'react';
import { useAnnouncements } from '../hooks/use-announcements';
import { Announcement, AnnouncementCategory } from '../types';
import { cn, formatDate } from '../../../shared/lib/utils';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { 
  Bell, 
  Search, 
  ChevronRight, 
  Clock, 
  User, 
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Info,
  Loader2
} from 'lucide-react';
import { Input } from '../../../shared/components/ui/input';

export function AnnouncementsInbox() {
  const { 
    announcements, 
    isLoading, 
    markAsRead, 
    markAsUnread,
    isMarkingRead,
    isMarkingUnread
  } = useAnnouncements();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<AnnouncementCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredAnnouncements = useMemo(() => {
    return (announcements as Announcement[])
      .filter((a) => filter === 'all' || a.category === filter)
      .filter((a) => 
        a.title.toLowerCase().includes(search.toLowerCase()) || 
        a.content.toLowerCase().includes(search.toLowerCase())
      );
  }, [announcements, filter, search]);

  const selectedAnnouncement = useMemo(() => 
    (announcements as Announcement[]).find((a) => a.id === selectedId) || null
  , [announcements, selectedId]);

  const handleSelect = (announcement: Announcement) => {
    setSelectedId(announcement.id);
    if (!announcement.isRead) {
      markAsRead(announcement.id);
    }
  };

  const getCategoryIcon = (category: AnnouncementCategory) => {
    switch (category) {
      case 'urgent': return <AlertCircle className="h-3 w-3" />;
      case 'academic': return <BookOpen className="h-3 w-3" />;
      case 'general': return <Info className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category: AnnouncementCategory) => {
    switch (category) {
      case 'urgent': return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50";
      case 'academic': return "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50";
      case 'general': return "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] min-h-[600px] border border-slate-200/60 dark:border-slate-800/60 rounded-2xl bg-white dark:bg-slate-950 overflow-hidden shadow-soft">
      {/* Left Sidebar: List */}
      <div className="w-full lg:w-[400px] flex flex-col border-r border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/50">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">Inbox</h2>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900">
                {announcements.filter(a => !a.isRead).length} Unread
              </span>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input 
              placeholder="Search announcements..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {(['all', 'urgent', 'academic', 'general'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                  filter === cat 
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-900">
          {filteredAnnouncements.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Bell className="h-8 w-8 text-slate-200 dark:text-slate-800 mb-2" />
              <p className="text-xs font-bold text-slate-400 uppercase">No announcements</p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <button
                key={announcement.id}
                onClick={() => handleSelect(announcement)}
                className={cn(
                  "w-full p-4 flex gap-4 text-left transition-all relative group",
                  selectedId === announcement.id 
                    ? "bg-white dark:bg-slate-900 shadow-[inset_4px_0_0_0_#4f46e5] lg:shadow-none lg:border-r-2 lg:border-indigo-500" 
                    : "hover:bg-white/50 dark:hover:bg-slate-900/50"
                )}
              >
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {!announcement.isRead && (
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                      )}
                      <h3 className={cn(
                        "text-[13px] tracking-tight truncate",
                        announcement.isRead ? "font-medium text-slate-600 dark:text-slate-400" : "font-bold text-slate-900 dark:text-slate-100"
                      )}>
                        {announcement.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
                      {formatDate(announcement.createdAt)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant="outline" className={cn("text-[9px] h-4 font-bold uppercase tracking-widest px-1.5", getCategoryColor(announcement.category))}>
                      {announcement.category}
                    </Badge>
                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                      <User className="h-2.5 w-2.5" />
                      {announcement.sender.split(' ')[0]}
                    </span>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 text-slate-300 dark:text-slate-700 self-center transition-transform",
                  selectedId === announcement.id ? "translate-x-0.5 text-indigo-500" : "group-hover:translate-x-0.5"
                )} />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar: Detail */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
        {selectedAnnouncement ? (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-2 duration-200">
            <div className="p-6 lg:p-10 border-b border-slate-50 dark:border-slate-900 flex justify-between items-start">
              <div className="space-y-4 max-w-2xl">
                <Badge className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5", getCategoryColor(selectedAnnouncement.category))}>
                  {getCategoryIcon(selectedAnnouncement.category)}
                  <span className="ml-1.5">{selectedAnnouncement.category}</span>
                </Badge>
                <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                  {selectedAnnouncement.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Sender</p>
                      <p className="text-xs font-medium text-slate-500">{selectedAnnouncement.sender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                      <Clock className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Sent At</p>
                      <p className="text-xs font-medium text-slate-500">{formatDate(selectedAnnouncement.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
              <div className="max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] space-y-6">
                {selectedAnnouncement.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-50 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-950/50 flex justify-end">
              <Button 
                variant="outline" 
                className="text-xs font-bold gap-2 h-9 rounded-xl border-slate-200 dark:border-slate-800 min-w-[120px]"
                disabled={isMarkingRead || isMarkingUnread}
                onClick={() => {
                  if (selectedAnnouncement.isRead) {
                    markAsUnread(selectedAnnouncement.id);
                  } else {
                    markAsRead(selectedAnnouncement.id);
                  }
                }}
              >
                {isMarkingRead || isMarkingUnread ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : selectedAnnouncement.isRead ? (
                  <>
                    <Bell className="h-4 w-4" />
                    Mark Unread
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Read
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="h-20 w-20 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
              <Bell className="h-8 w-8 text-slate-300 dark:text-slate-700" />
            </div>
            <div className="max-w-[240px] space-y-1">
              <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">Select an announcement</h3>
              <p className="text-xs font-medium text-slate-500">Read school-wide updates, academic notices and urgent alerts.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
