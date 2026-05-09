# Mock to Real API Migration Guide

## Overview

This guide explains how to migrate from mock APIs to real REST APIs when your backend is ready.

## Migration Steps

### 1. Create Real API Functions

For each feature, create a `real.ts` file with actual API calls.

Example for students (`src/features/students/api/real.ts`):
```typescript
import type { Student, CreateStudentData, UpdateStudentData } from '../types/student';
import { apiClient } from '../../api/client';

export async function getStudents(search?: string): Promise<Student[]> {
  const params = search ? { search } : {};
  const response = await apiClient.get<Student[]>('/students', { params });
  return response.data;
}

export async function getStudent(id: string): Promise<Student> {
  const response = await apiClient.get<Student>(`/students/${id}`);
  return response.data;
}

export async function createStudent(data: CreateStudentData): Promise<Student> {
  const response = await apiClient.post<Student>('/students', data);
  return response.data;
}

export async function updateStudent(id: string, data: UpdateStudentData): Promise<Student> {
  const response = await apiClient.put<Student>(`/students/${id}`, data);
  return response.data;
}

export async function deleteStudent(id: string): Promise<void> {
  await apiClient.delete(`/students/${id}`);
}
```

### 2. Update Index Export

In each feature's `api/index.ts`, swap the export:

**Before (Mock):**
```typescript
export { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from './mock';
```

**After (Real):**
```typescript
export { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from './real';
```

### 3. Features to Migrate

| Feature | Mock File | Real File |
|---------|-----------|----------|
| Auth | `features/auth/api/mock.ts` | `features/auth/api/real.ts` |
| Dashboard | `features/dashboard/api/mock.ts` | `features/dashboard/api/real.ts` |
| Students | `features/students/api/mock.ts` | `features/students/api/real.ts` |
| Teachers | `features/teachers/api/mock.ts` | `features/teachers/api/real.ts` |
| Classes | `features/classes/api/mock.ts` | `features/classes/api/real.ts` |
| Attendance | `features/attendance/api/mock.ts` | `features/attendance/api/real.ts` |
| Fees | `features/fees/api/mock.ts` | `features/fees/api/real.ts` |

### 4. Environment Configuration

Create a `.env` file:
```
VITE_API_URL=http://localhost:3000/api
```

For production:
```
VITE_API_URL=https://api.your-domain.com/api
```

### 5. Expected API Response Format

The frontend expects these response formats:

**Students:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "rollNo": "string",
  "class": "string",
  "classId": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "gender": "male" | "female" | "other",
  "phone": "string",
  "address": "string",
  "parentName": "string",
  "parentPhone": "string",
  "admissionDate": "YYYY-MM-DD",
  "status": "active" | "inactive" | "graduated",
  "createdAt": "ISO date string"
}
```

**Teachers:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "employeeId": "string",
  "subject": "string",
  "phone": "string",
  "address": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "gender": "male" | "female" | "other",
  "hireDate": "YYYY-MM-DD",
  "status": "active" | "inactive" | "on-leave",
  "createdAt": "ISO date string"
}
```

**Classes:**
```json
{
  "id": "string",
  "name": "string",
  "grade": "string",
  "section": "string",
  "teacherId": "string",
  "teacherName": "string",
  "capacity": "number",
  "currentStrength": "number",
  "roomNumber": "string",
  "schedule": "string",
  "status": "active" | "inactive",
  "createdAt": "ISO date string"
}
```

**Attendance:**
```json
{
  "id": "string",
  "studentId": "string",
  "studentName": "string",
  "classId": "string",
  "className": "string",
  "date": "YYYY-MM-DD",
  "status": "present" | "absent" | "late",
  "remarks": "string"
}
```

**Fees:**
```json
{
  "id": "string",
  "studentId": "string",
  "studentName": "string",
  "className": "string",
  "feeType": "string",
  "amount": "number",
  "dueDate": "YYYY-MM-DD",
  "paidDate": "YYYY-MM-DD",
  "status": "pending" | "paid" | "overdue" | "waived",
  "remarks": "string",
  "createdAt": "ISO date string"
}
```

**Auth:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin" | "teacher" | "parent" | "student",
    "avatar": "string",
    "createdAt": "ISO date string"
  },
  "token": "string"
}
```

## Rollback Procedure

If you need to revert to mock APIs:
1. In each `features/[module]/api/index.ts`, change the export back to mock
2. No other changes needed - the mock data will be used immediately

## Testing the Migration

1. Start your backend server
2. Update `VITE_API_URL` in `.env`
3. Run `npm run dev`
4. Test each feature to verify data loads from the real API
5. Check browser console for any API errors