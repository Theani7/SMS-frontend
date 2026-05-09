# API Endpoints Reference

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.your-domain.com/api
```

## Authentication

### POST /auth/login
Login user
```json
Request: { "email": "string", "password": "string" }
Response: { "user": User, "token": "string" }
```

### POST /auth/register
Register new user
```json
Request: { "email": "string", "password": "string", "name": "string", "role": "string" }
Response: { "user": User, "token": "string" }
```

## Students

- GET /students - List all students
- GET /students/:id - Get student by ID
- POST /students - Create student
- PUT /students/:id - Update student
- DELETE /students/:id - Delete student

## Teachers

- GET /teachers - List all teachers
- GET /teachers/:id - Get teacher by ID
- POST /teachers - Create teacher
- PUT /teachers/:id - Update teacher
- DELETE /teachers/:id - Delete teacher

## Classes

- GET /classes - List all classes
- GET /classes/:id - Get class by ID
- POST /classes - Create class
- PUT /classes/:id - Update class
- DELETE /classes/:id - Delete class

## Attendance

- GET /attendance - List attendance records
- POST /attendance - Mark attendance
- PUT /attendance/:id - Update attendance

## Fees

- GET /fees - List fee records
- GET /fees/:id - Get fee by ID
- POST /fees - Create fee
- PUT /fees/:id - Update fee
- DELETE /fees/:id - Delete fee