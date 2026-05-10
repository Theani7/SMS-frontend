import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnnouncements, markAsRead } from '../api';
import { Announcement } from '../types';

export function useAnnouncements() {
  const queryClient = useQueryClient();

  const announcementsQuery = useQuery<Announcement[]>({
    queryKey: ['announcements'],
    queryFn: getAnnouncements,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  return {
    announcements: announcementsQuery.data || [],
    isLoading: announcementsQuery.isLoading,
    isError: announcementsQuery.isError,
    markAsRead: markAsReadMutation.mutate,
  };
}
