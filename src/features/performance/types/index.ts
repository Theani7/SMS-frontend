export interface PerformanceStat {
  label: string;
  value: string;
  change?: string;
  status?: string;
}

export interface SubjectPerformance {
  subject: string;
  grade: string;
  progress: number;
  status: 'excellent' | 'good' | 'improving' | 'warning';
}

export interface TrajectoryPoint {
  week: string;
  gpa: number;
  projected?: boolean;
}
