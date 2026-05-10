import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/auth-layout';
import { AppLayout } from './layouts/app-layout';
import { ProtectedRoute } from '../shared/components/route-protection';
import { ROUTES, USER_ROLES } from '../shared/lib/constants';
import { Loader2 } from 'lucide-react';

// Loading Fallback
const PageLoader = () => (
  <div className="flex h-[400px] w-full items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" aria-hidden="true" />
  </div>
);

// Auth Pages
const LoginPage = lazy(() => import('../pages/auth/login-page').then(m => ({ default: m.LoginPage })));

// Dashboard Pages
const DashboardPage = lazy(() => import('../pages/dashboard/index-page').then(m => ({ default: m.DashboardPage })));

// Feature Pages
const StudentsPage = lazy(() => import('../pages/students/student-list-page').then(m => ({ default: m.StudentsPage })));
const StudentFormPage = lazy(() => import('../pages/students/student-form-page').then(m => ({ default: m.StudentFormPage })));
const TeachersPage = lazy(() => import('../pages/teachers/teacher-list-page').then(m => ({ default: m.TeachersPage })));
const TeacherFormPage = lazy(() => import('../pages/teachers/teacher-form-page').then(m => ({ default: m.TeacherFormPage })));
const ClassesPage = lazy(() => import('../pages/classes/class-list-page').then(m => ({ default: m.ClassesPage })));
const ClassFormPage = lazy(() => import('../pages/classes/class-form-page').then(m => ({ default: m.ClassFormPage })));
const AttendancePage = lazy(() => import('../pages/attendance/attendance-list-page').then(m => ({ default: m.AttendancePage })));
const AttendanceMarkPage = lazy(() => import('../pages/attendance/mark-attendance-page').then(m => ({ default: m.AttendanceMarkPage })));
const FeesPage = lazy(() => import('../pages/fees/fee-list-page').then(m => ({ default: m.FeesPage })));
const FeeFormPage = lazy(() => import('../pages/fees/fee-form-page').then(m => ({ default: m.FeeFormPage })));

// Student Portal Pages
const AssignmentsPage = lazy(() => import('../pages/assignments/assignments-page').then(m => ({ default: m.AssignmentsPage })));
const PerformancePage = lazy(() => import('../pages/performance/performance-page').then(m => ({ default: m.PerformancePage })));
const TimetablePage = lazy(() => import('../pages/timetable/timetable-page').then(m => ({ default: m.TimetablePage })));
const AnnouncementsPage = lazy(() => import('../pages/announcements/announcements-page').then(m => ({ default: m.AnnouncementsPage })));
const ChildrenPage = lazy(() => import('../pages/children/children-page').then(m => ({ default: m.ChildrenPage })));
const ChildDetailPage = lazy(() => import('../pages/children/child-detail-page').then(m => ({ default: m.ChildDetailPage })));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<div>Registration is not available. Please contact the administrator.</div>} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={Object.values(USER_ROLES)}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.STUDENTS}
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <StudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.STUDENTS}/new`}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StudentFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.STUDENTS}/:id`}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <StudentFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.TEACHERS}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TeachersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.TEACHERS}/new`}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TeacherFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.TEACHERS}/:id`}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TeacherFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CLASSES}
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ClassesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.CLASSES}/new`}
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ClassFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.CLASSES}/:id`}
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ClassFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ATTENDANCE}
            element={
              <ProtectedRoute allowedRoles={Object.values(USER_ROLES)}>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ATTENDANCE_MARK}
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <AttendanceMarkPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.FEES}
            element={
              <ProtectedRoute allowedRoles={['admin', 'parent', 'student']}>
                <FeesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.FEES}/new`}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FeeFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.FEES}/:id`}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FeeFormPage />
              </ProtectedRoute>
            }
          />

          {/* Student Specific Routes */}
          <Route
            path={ROUTES.ASSIGNMENTS}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <AssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PERFORMANCE}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <PerformancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.TIMETABLE}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <TimetablePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ANNOUNCEMENTS}
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />

          {/* Parent Specific Routes */}
          <Route
            path={ROUTES.CHILDREN}
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ChildrenPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.CHILDREN}/:id`}
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ChildDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
}