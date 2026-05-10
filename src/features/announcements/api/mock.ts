import { Announcement } from '../types';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Final Exam Schedule Published',
    content: 'The final examination schedule for the Spring 2026 semester is now available for download on the school portal. Please review your specific subject timings and room assignments carefully. Any conflicts should be reported to the registrar office by next Friday.',
    category: 'urgent',
    sender: 'Registrar Office',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    isRead: false,
  },
  {
    id: '2',
    title: 'New Sports Facility Opening',
    content: 'We are excited to announce the grand opening of our new indoor basketball court this Friday at 4:00 PM. All students are invited for the inaugural ceremony and a friendly match between teachers and the varsity team. Refreshments will be served.',
    category: 'general',
    sender: 'Sports Department',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    isRead: true,
  },
  {
    id: '3',
    title: 'Mathematics Workshop: Calculus Tips',
    content: 'A special workshop on advanced calculus techniques will be held next Tuesday in Hall B. This is highly recommended for students preparing for the upcoming STEM competition. Please sign up via the link provided in the student hub.',
    category: 'academic',
    sender: 'Prof. Sarah Johnson',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    isRead: false,
  },
  {
    id: '4',
    title: 'Library Maintenance Notice',
    content: 'The central library will be closed for maintenance this Sunday from 8:00 AM to 2:00 PM. Digital resources will remain accessible throughout this period. We apologize for any inconvenience.',
    category: 'general',
    sender: 'Library Administration',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isRead: true,
  },
  {
    id: '5',
    title: 'Science Fair Project Submissions',
    content: 'This is a reminder that the deadline for submitting your science fair project abstracts is October 15th. Ensure your submission includes a clear problem statement and your hypothesized outcome. Late entries will not be considered for the primary award category.',
    category: 'academic',
    sender: 'Science Department',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    isRead: true,
  },
];

export async function getAnnouncements(): Promise<Announcement[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...MOCK_ANNOUNCEMENTS].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function markAsRead(id: string): Promise<void> {
  const announcement = MOCK_ANNOUNCEMENTS.find(a => a.id === id);
  if (announcement) {
    announcement.isRead = true;
  }
}
