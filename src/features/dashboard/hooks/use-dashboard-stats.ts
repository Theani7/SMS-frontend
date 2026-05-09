import { useQuery } from '@tanstack/react-query';
import { getAdminDashboardStats, getTeacherDashboardStats, getParentDashboardStats, getStudentDashboardStats } from '../api';

export function useAdminStats() {
  return useQuery({
    queryKey: ['dashboard', 'admin'],
    queryFn: getAdminDashboardStats,
  });
}

export function useTeacherStats() {
  return useQuery({
    queryKey: ['dashboard', 'teacher'],
    queryFn: getTeacherDashboardStats,
  });
}

export function useParentStats() {
  return useQuery({
    queryKey: ['dashboard', 'parent'],
    queryFn: getParentDashboardStats,
  });
}

export function useStudentStats() {
  return useQuery({
    queryKey: ['dashboard', 'student'],
    queryFn: getStudentDashboardStats,
  });
}