import { PageContainer } from '../../shared/components/layout/page-container';
import { AnnouncementsInbox } from '../../features/announcements/components/announcements-inbox';

export function AnnouncementsPage() {
  return (
    <PageContainer
      title="Announcements"
      description="Stay updated with the latest school news and notices."
      withMesh={true}
    >
      <AnnouncementsInbox />
    </PageContainer>
  );
}
