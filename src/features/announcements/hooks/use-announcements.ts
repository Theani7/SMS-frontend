import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnnouncements, markAsRead, markAsUnread } from '../api';
import { Announcement } from '../types';
import { useNotificationStore } from '../../../shared/store/notification-store';

export function useAnnouncements() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  const announcementsQuery = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      addNotification('success', 'Announcement marked as read');
    },
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: markAsUnread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      addNotification('success', 'Announcement marked as unread');
    },
  });

  return {
    announcements: announcementsQuery.data || [],
    isLoading: announcementsQuery.isLoading,
    isError: announcementsQuery.isError,
    markAsRead: markAsReadMutation.mutate,
    markAsUnread: markAsUnreadMutation.mutate,
    isMarkingRead: markAsReadMutation.isPending,
    isMarkingUnread: markAsUnreadMutation.isPending,
  };
}
