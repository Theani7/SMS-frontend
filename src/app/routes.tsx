import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/auth-layout';
import { AppLayout } from './layouts/app-layout';
import { ProtectedRoute } from '../shared/components/route-protection';
import { ROUTES, USER_ROLES } from '../shared/lib/constants';

// Auth Pages
import { LoginPage } from '../pages/auth/login-page';

// Dashboard Pages
import { DashboardPage } from '../pages/dashboard/index-page';

// Feature Pages
import { StudentsPage } from '../pages/students/student-list-page';
import { TeachersPage } from '../pages/teachers/teacher-list-page';
import { ClassesPage } from '../pages/classes/class-list-page';
import { ClassFormPage } from '../pages/classes/class-form-page';
import { AttendancePage } from '../pages/attendance/attendance-list-page';
import { AttendanceMarkPage } from '../pages/attendance/mark-attendance-page';
import { FeesPage } from '../pages/fees/fee-list-page';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<div>Register Page</div>} />
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
          path={ROUTES.TEACHERS}
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TeachersPage />
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
            <ProtectedRoute allowedRoles={['admin', 'parent']}>
              <FeesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}