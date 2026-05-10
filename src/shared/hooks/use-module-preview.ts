export interface ModulePreview {
  label: string;
}

export function useModulePreview(_module: 'timetable' | 'assignments' | 'announcements'): ModulePreview | null {
  return null; // Stub until Task 5
}