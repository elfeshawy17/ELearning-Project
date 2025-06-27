# Eduverse eLearning Platform Backend 🚀

Welcome to the **Eduverse eLearning Platform Backend** 🌐, a robust and scalable RESTful API designed to power a university-level eLearning ecosystem. Built with modern technologies, it supports multi-role dashboards for **Admins**, **Professors**, and **Students**, offering seamless management of courses, lectures, assignments, enrollments, payments, and submissions. With a focus on usability, security, and modularity, Eduverse ensures a top-tier educational experience. 🎓

---

## Table of Contents 📋

- [Project Overview](#project-overview) 🌟
- [Key Features](#key-features) ✅
- [Technology Stack](#technology-stack) 🛠️
- [System Architecture](#system-architecture) 🏗️
- [API Workflow](#api-workflow) 🌐
- [Data Models](#data-models) 📊
- [User Flows](#user-flows) 🧑‍🏫
- [Summary Workflow](#summary-workflow) 📈
- [Prerequisites](#prerequisites) ⚙️
- [Installation](#installation) 🔧
- [Usage](#usage) 📖
- [API Endpoints](#api-endpoints) 🔗
- [Contributing](#contributing) 🤝
- [FAQ](#faq) ❓
- [License](#license) 📜
- [Contact](#contact) 📧

---

## Project Overview 🌟

**Eduverse** is a comprehensive eLearning platform tailored for university education, offering multi-dashboard access for **Admins**, **Professors**, and **Students** via web and mobile interfaces. The backend, built with **Node.js**, **Express.js**, and **MongoDB**, provides a modular, RESTful API that powers user authentication, course management, lecture delivery, assignment tracking, enrollments, and payments. With Swagger-documented APIs and role-based access control, Eduverse ensures scalability, security, and maintainability. 📚

### Objectives 🎯
- 🚀 Deliver a seamless, role-based eLearning experience.
- 🔒 Ensure secure authentication and data management.
- 📤 Support file uploads for lectures and assignments.
- 💸 Track enrollments and payments with real-time updates.
- 🛠️ Maintain a modular, scalable architecture for future growth.

---

## Key Features ✅

- 🔐 **Secure Authentication**: Role-based login (Admin, Professor, Student) with JWT and bcrypt.
- 📚 **Course Management**: Create, update, and manage courses with lectures and assignments.
- 📝 **Assignment Workflow**: Upload, submit, and track assignments with statuses (pending, submitted, missed).
- 🎥 **Lecture Delivery**: Organize and deliver lecture content with file uploads.
- 📋 **Enrollment System**: Manage student course enrollments seamlessly.
- 💳 **Payment Tracking**: Monitor course payments with hourly rate calculations.
- ⚡ **Scalable Architecture**: Modular design with real-time database syncing and structured error handling.
- 📘 **API Documentation**: Interactive Swagger UI for developers.

---

## Technology Stack 🛠️

| Component         | Technology             | Purpose                       |
|-------------------|------------------------|-------------------------------|
| **Backend**       | Node.js (Express)      | RESTful API server            |
| **Database**      | MongoDB (Mongoose)     | Data storage & management     |
| **Authentication** | JWT, bcrypt           | Secure user access            |
| **API Testing**   | Postman, Swagger       | API documentation & testing   |
| **Frontend**      | React, TypeScript, Tailwind CSS | Web dashboards (separate repos) |

> **Note**: This repository contains the backend only. Frontend dashboards are in separate repositories.

---

## System Architecture 🏗️

Eduverse follows a modular architecture for scalability. The diagram below shows the core components and their interactions.

```mermaid
graph TD
    A[Client Apps] --> B[Express Server]
    B --> C[MongoDB Database]
    B --> D[File Storage]
    C --> E[Data Models]
    D --> F[Uploaded Files]
```

---

## API Workflow 🌐

The backend provides a clean, RESTful API structure with role-based access control. Below is the workflow for key operations.

### 1. Authentication & Authorization 🔐
- **Endpoints**: `/api/auth/register`, `/api/auth/login`
- **Workflow**:
  1. Users authenticate via a unified login endpoint.
  2. A JWT token is issued upon successful login.
  3. Middleware enforces role-based access on protected endpoints.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant DB as MongoDB
    Client->>Server: POST /api/auth/login
    Server->>DB: Validate credentials
    DB-->>Server: User data
    Server-->>Client: JWT Token
    Client->>Server: Request protected endpoint (with JWT)
    Server->>Server: Verify JWT & role
    Server-->>Client: Response (success/error)
```

### 2. User Management 🧑‍💼
- **Endpoints**: `/api/users`, `/api/users/:id`
- **Actions**: Create, update, delete, list users (Admin-only).
- **Workflow**: Admins manage users via dashboard, triggering API calls.

### 3. Course Management 📚
- **Endpoints**: `/api/courses`, `/api/courses/:id`
- **Actions**: Create, update, delete, list courses (Admin/Professor).
- **Workflow**:
  - Admins assign professors to courses.
  - Professors manage course content (lectures, assignments).

### 4. Enrollment Management 📋
- **Endpoints**: `/api/enrollments`, `/api/enrollments/:id`
- **Actions**: Enroll students, view enrollments (Admin/Student).
- **Workflow**: Admins enroll students; students view enrolled courses.

### 5. Lecture & Assignment Management 🎥📝
- **Endpoints**: `/api/lectures`, `/api/assignments`
- **Actions**: Professors upload content linked to courses.
- **Workflow**: Files are stored and associated with courses via API.

### 6. Assignment Submission 📤
- **Endpoints**: `/api/submissions`
- **Actions**: Students submit assignments; API updates status.
- **Workflow**: Students upload files; API validates and stores submissions.

### 7. Profile Management 🧑
- **Endpoints**: `/api/users/me`, `/api/users/:id`
- **Actions**: View and update profile information (all roles).

### 8. API Documentation 📘
- **Endpoint**: `/api-docs`
- **Workflow**: Developers access Swagger UI for endpoint details and testing.

---

## Data Models 📊

The backend uses MongoDB with Mongoose for structured data storage. Below are the core schemas and their relationships.

| Model        | Key Fields                                                                 |
|--------------|---------------------------------------------------------------------------|
| **User**     | `name`, `email`, `password`, `department`, `role` (student/professor/admin), `level`, `academicId`, `courses[]` |
| **Course**   | `title`, `courseCode`, `professor`, `department`, `hours`, `lectures[]`, `assignments[]` |
| **Assignment**| `course`, `title`, `fileUrl`, `duedate`                                   |
| **Lecture**  | `course`, `title`, `fileUrl`, `order`                                     |
| **Enrollment**| `studentName`, `academicId`, `courses[]`                                 |
| **Payment**  | `studentId`, `courses[]`, `totalFee`, `hasPaid`, `hourlyRate`            |
| **Submission**| `student`, `assignment`, `fileUrl`, `status` (pending/submitted/missed), `submittedAt` |

### Entity Relationship Diagram
This diagram visualizes the relationships between data models.

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : enrolls
    USER ||--o{ COURSE : teaches
    COURSE ||--o{ LECTURE : contains
    COURSE ||--o{ ASSIGNMENT : contains
    USER ||--o{ SUBMISSION : submits
    USER ||--o{ PAYMENT : pays
    ENROLLMENT ||--o{ COURSE : includes
    ASSIGNMENT ||--o{ SUBMISSION : receives
    PAYMENT ||--o{ COURSE : covers
```

---

## User Flows 🧑‍🏫

### Admin Flow
Admins manage the platform via a dedicated dashboard.

```mermaid
graph LR
    A[Admin Login] --> B[Manage Users]
    A --> C[Manage Courses]
    A --> D[Manage Enrollments]
    A --> E[Track Payments]
    B --> F[Create/Update/Delete Users]
    C --> G[Assign Professors]
    D --> H[Enroll Students]
    E --> I[View Payment Status]
```

### Professor Flow
Professors manage courses and content.

```mermaid
graph LR
    A[Professor Login] --> B[View Assigned Courses]
    B --> C[Upload Lectures]
    B --> D[Upload Assignments]
    B --> E[View Submissions]
    E --> F[Grade Assignments]
```

### Student Flow
Students access learning materials and submit assignments.

```mermaid
graph LR
    A[Student Login] --> B[View Enrolled Courses]
    B --> C[Access Lectures]
    B --> D[Submit Assignments]
    B --> E[View Grades]
    B --> F[Manage Profile]
    B --> G[View Payments]
```

---

## Summary Workflow 📈

The diagram below summarizes the workflow across roles, highlighting the API's modular structure.

```mermaid
graph TD
    A[Client Apps] --> B[Auth API]
    B --> C[Role Access]
    C --> D[Admin Actions]
    C --> E[Professor Actions]
    C --> F[Student Actions]
    D --> G[Manage Data]
    E --> G
    F --> G
    G --> H[MongoDB]
    H --> I[File Storage]
```

---

## Prerequisites ⚙️

Ensure the following are installed:
- **Node.js** (v16 or higher) 🟢
- **MongoDB** (v5 or higher, local or cloud-hosted) 📊
- **npm** (v8 or higher) 📦
- **Git** for cloning the repository 🌐
- A code editor like **VS Code** ✍️

---

## Installation 🔧

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/elfeshawy17/ELearning-Project.git
   cd eduverse-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=3000
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Verify Setup**:
   - Server runs on `http://localhost:3000` 🌐.
   - Test endpoints with Postman or cURL.

---

## Usage 📖

The backend powers the Eduverse platform with RESTful APIs. Key functionalities include:
- 🔐 **Authentication**: Register and log in users with role-based access.
- 📚 **Course Management**: Create and manage courses, lectures, and assignments.
- 📤 **File Uploads**: Upload lecture and assignment files.
- 📋 **Enrollments**: Manage student course enrollments.
- 💳 **Payments**: Track course payments.
- 📝 **Submissions**: Submit and track assignments.

### Example API Request
**Enroll a Student**:
```bash
POST /api/enrollments
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "studentName": "John Doe",
  "academicId": "ST12345",
  "courses": ["course_id_1", "course_id_2"]
}
```

---

## API Endpoints 🔗

| Endpoint            | Description                     | Methods         | Roles             |
|---------------------|---------------------------------|-----------------|-------------------|
| `/api/auth`         | User registration & login       | POST            | All               |
| `/api/users`        | Manage user profiles            | GET, POST, PUT, DELETE | Admin       |
| `/api/users/me`     | View/update own profile         | GET, PUT        | All               |
| `/api/courses`      | Course management              | GET, POST, PUT, DELETE | Admin, Professor |
| `/api/assignments`  | Assignment upload & tracking    | GET, POST, PUT  | Professor, Student |
| `/api/lectures`     | Lecture content management      | GET, POST, PUT  | Professor, Student |
| `/api/enrollments`  | Student enrollment management   | GET, POST, DELETE | Admin, Student   |
| `/api/payments`     | Payment processing & tracking   | GET, POST, PUT  | Admin, Student     |
| `/api/submissions`  | Assignment submission tracking  | GET, POST, PUT  | Professor, Student |
| `/api-docs`         | Swagger API documentation       | GET             | Developers        |

> 📘 **Swagger UI**: Access interactive API docs at `/api-docs`.

---

## Contributing 🤝

We welcome contributions to enhance Eduverse! To contribute:
1. Fork the repository 🍴.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Submit a pull request 📬.

Follow the [code of conduct](CODE_OF_CONDUCT.md) and include tests for new features.

---

## FAQ ❓

**Q: How do I reset my password?**  
A: Use the `/api/auth/reset-password` endpoint with your registered email.

**Q: Can I use a different database?**  
A: The backend is optimized for MongoDB, but you can adapt it for other databases with modifications.

**Q: How are files stored?**  
A: Files are stored locally or in cloud storage (e.g., AWS S3), configurable via environment variables.

**Q: What security measures are in place?**  
A: JWT authentication, bcrypt password hashing, input validation, and rate limiting ensure robust security 🔒.

---

## License 📜

This project is licensed under the [MIT License](LICENSE).

---

## Contact 📧

For questions, feedback, or support, reach out to the project contributors:
- **Name**: Mohamed Elfeshawy  
  **Email**: elfeshawy2001@gmail.com  
  **GitHub**: https://github.com/elfeshawy17
- **Name**: Mohamed Tamer
  **Email**: mohamed.tamer3355@gmail.com 
  **GitHub**: https://github.com/motamer12

Join us in revolutionizing university education with **Eduverse**! 🌍
