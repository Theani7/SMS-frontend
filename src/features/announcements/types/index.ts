export type AnnouncementCategory = 'urgent' | 'academic' | 'general';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  sender: string;
  createdAt: string;
  isRead: boolean;
}
