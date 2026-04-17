# WisdomVersa

WisdomVersa is a full-stack educational technology (Ed-Tech) platform designed to bridge the gap between instructors and learners. It provides a seamless environment for creating, hosting, and consuming high-quality course content. Built with the MERN stack, the platform focuses on responsive design, secure authentication, and a smooth user experience for both students and content creators.

## Tech Stack

### Frontend
- **Framework**: React.js (v19)
- **State Management**: Redux Toolkit & Redux Persist
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v7)
- **Icons & UI**: Lucide React, React Icons, Swiper (for carousels)
- **Forms**: React Hook Form
- **Animations**: React Type Animation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt, and Google OAuth
- **Media Management**: Cloudinary (Video & Image storage)
- **Payments**: Razorpay Integration
- **Mailing**: Nodemailer (OTP & transactional emails)

---

## Features

### For Students
- **Course Discovery**: Browse courses by categories with a built-in search and filter system.
- **Interactive Learning**: A dedicated video player for watching lessons, tracking progress, and managing course navigation.
- **Dashboard**: Track enrolled courses, view progress bars, and manage purchase history.
- **Cart & Payments**: Add courses to a cart and securely checkout using Razorpay.
- **Reviews**: Rate and review courses to help other learners.

### For Instructors
- **Course Builder**: Multi-step course creation flow (Course Information -> Course Builder -> Publishing).
- **Content Management**: Organize courses into Sections and Sub-sections (lessons) with video uploads.
- **Performance Metrics**: A dashboard to view total students, total income, and per-course statistics using Chart.js.
- **Profile Management**: Update professional details and manage course visibility.

---

## Project Structure

```text
├── server/             # Node.js backend
│   ├── config/         # Database and third-party service configs
│   ├── controllers/    # API logic and request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API routes
│   └── middlewares/    # Auth and role-validation logic
├── src/                # React frontend
│   ├── components/     # UI components (Core, Common, Dashboard)
│   ├── pages/          # Main route views
│   ├── services/       # Frontend API connection logic
│   ├── slices/         # Redux state slices
│   └── utils/          # Helper functions and constants
└── public/             # Static assets
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd WisdomVersa
```

### 2. Backend Setup
Create a `.env` file in the `server/` directory and add the following:
```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=WisdomVersa
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```
Install dependencies and start the server:
```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup
Create a `.env` file in the root directory:
```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```
Install dependencies and start the client:
```bash
# From the root directory
npm install
npm start
```

*Tip: You can use `npm run dev` from the root to start both client and server concurrently.*

---

## Key API Endpoints

- **Auth**: `/api/v1/auth` (Login, Signup, OTP, Reset Password)
- **Courses**: `/api/v1/course` (CRUD operations for courses, categories, and reviews)
- **Profile**: `/api/v1/profile` (User data, instructor dashboard, enrolled courses)
- **Payments**: `/api/v1/payment` (Razorpay capture and verification)

---

## Scripts

- `npm run dev`: Runs both frontend and backend concurrently.
- `npm start`: Starts the React development server.
- `npm run server`: Starts the backend server using nodemon.

---

## Notes
- Ensure Cloudinary and Razorpay credentials are valid for media uploads and payments to work.
- The project uses MongoDB. Make sure your local instance is running or use a MongoDB Atlas URI.
