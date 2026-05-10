import { SubjectPerformance, TrajectoryPoint } from '../types';

export async function getPerformanceInsights(): Promise<{
  trajectory: TrajectoryPoint[];
  subjects: SubjectPerformance[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    trajectory: [
      { week: 'W1', gpa: 3.65 },
      { week: 'W2', gpa: 3.70 },
      { week: 'W3', gpa: 3.68 },
      { week: 'W4', gpa: 3.75 },
      { week: 'W5', gpa: 3.82 },
      { week: 'W6', gpa: 3.82 },
      { week: 'W7', gpa: 3.88, projected: true },
      { week: 'W8', gpa: 3.90, projected: true },
    ],
    subjects: [
      { subject: 'Mathematics', grade: 'A', progress: 92, status: 'excellent' },
      { subject: 'Physics', grade: 'A+', progress: 96, status: 'excellent' },
      { subject: 'Computer Science', grade: 'B+', progress: 84, status: 'good' },
      { subject: 'English Lit', grade: 'B-', progress: 78, status: 'warning' },
    ]
  };
}
