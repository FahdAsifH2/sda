# SDA Project: Examination System (MEEN Stack)

This project is a **University Examm Preporatory App** built using the **MEEN stack** (MongoDB, Express.js, EJS, and Node.js). It provides functionalities for students and teachers to interact with an examination system, including user authentication, profile management, exam solving, and more.

---

## Features

- **User Roles**:  
  Supports three user roles:  
  - **Admin**
  - **Teacher**
  - **Student**

- **Authentication**:  
  User login, role-based access, and verification using **JWT** (JSON Web Tokens).

- **Dynamic Dashboards**:  
  Separate dashboard views for students and teachers.

- **CRUD Operations**:  
  Manage user profiles, solve exams, browse exams, and more.

- **Secure and Scalable**:  
  Built with modern design principles like role-based authorization and modular architecture.

---

## Technologies Used

- **MongoDB**: Database for storing user information and exam data.
- **Express.js**: Backend framework for routing and handling server-side logic.
- **EJS (Embedded JavaScript)**: Templating engine for dynamic rendering of frontend pages.
- **Node.js**: Backend runtime environment.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v16.x or above
- **MongoDB**: A running MongoDB instance
- **npm**: Node Package Manager (comes with Node.js)
- **Git**: For cloning the repository

---

## Installation and Setup

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/FahdAsifH2/sda.git
cd sda
```

### 2. Install Dependencies
Run the following command to install all required Node.js packages:
```bash
npm install
```

### 3. Set Up the Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/examSystem
JWT_SECRET=your_jwt_secret_key
```

- Replace `your_jwt_secret_key` with a secure key of your choice.

### 4. Start the MongoDB Server
Ensure MongoDB is running on your system. You can start it with the following command:
```bash
mongod
```

### 5. Run the Application
Start the server using:
```bash
npm start
```
The application will be accessible at `http://localhost:3000`.

---

## Project Structure

Here is an overview of the folder structure:

```
sda/
├── model/               # Mongoose schemas and database models
├── public/              # Static files (CSS, images, etc.)
├── routes/              # Application routes
├── views/               # EJS templates for dynamic pages
├── .env                 # Environment variables
├── server.js            # Main application entry point
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

---

## Usage Instructions

### 1. Admin Panel
- URL: `/admin`
- Manage teachers, students, and system settings.

### 2. Teacher Dashboard
- URL: `/teacher`
- Features:
  - Upload exams
  - Manage students
  - Browse exam submissions

### 3. Student Dashboard
- URL: `/student`
- Features:
  - Solve exams
  - Browse available exams
  - Edit profile information

---

## Important Endpoints

Here are some key routes of the application:

| **Method** | **Endpoint**              | **Description**              |
|------------|---------------------------|------------------------------|
| `GET`      | `/login`                  | Login page                   |
| `POST`     | `/auth/login`             | Authenticate user            |
| `GET`      | `/student`                | Student dashboard            |
| `GET`      | `/teacher`                | Teacher dashboard            |
| `POST`     | `/student/editProfile`    | Update student profile       |
| `POST`     | `/teacher/uploadExam`     | Upload an exam (teacher)     |

---

## Design Principles

The project follows **Separation of Concerns (SoC)** and modular architecture to ensure:

- **High Cohesion**: Each module handles a specific task (e.g., authentication, routing).
- **Low Coupling**: Components interact via well-defined interfaces.

---

## Contributors
- **Usman Zafar**
- [GitHub Profile](https://github.com/syed-muhammad-usman-zafar)
- **Fahd Asif**  
  [GitHub Profile](https://github.com/FahdAsifH2)

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
