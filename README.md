# 📝 To-Do List Web App

A simple and responsive To-Do List application built with **HTML, CSS, JavaScript, Firebase Authentication, and Firestore**.

Users can create an account, log in securely, and manage daily tasks. Tasks are stored in Firebase Firestore and organized by date, allowing users to maintain separate task lists for different days.

---

## 🚀 Features

### 🔐 Authentication

- User Sign Up with email and password
- User Login with email and password
- Firebase Authentication integration
- Secure logout functionality

### 📅 Date-Based Task Management

- Select any date and load tasks for that specific day
- Automatic loading of today's tasks on login
- Separate task lists for different dates

### ✅ Task Management

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Press **Enter** to quickly add tasks
- Automatic saving to Firebase Firestore

### 🎭 Demo Mode

A built-in demo account allows visitors to test the application without creating an account.

Demo tasks include:

- Go for a run
- Read a book
- Drink 4 litre water
- Practice coding

### ☁️ Cloud Storage

- Tasks are stored in Firebase Firestore
- Data remains available across devices
- Each user's data is isolated and secure

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Firebase Authentication
- Firebase Firestore Database

---

## 📂 Project Structure

```text
project/
│
├── index.html
├── script.js
├── to-do-list.html
├── to-do-list.js
├── firebase-config.js
├── style.css
├── to-do-list.css
└── README.md
```

---

## ⚙️ Firebase Setup

### 1. Create Firebase Project

1. Visit Firebase Console.
2. Create a new project.
3. Enable Authentication.
4. Enable Firestore Database.

---

### 2. Enable Authentication

Navigate to:

```text
Authentication → Sign-in Method
```

Enable:

```text
Email / Password
```

---

### 3. Configure Firestore

Create a Firestore Database and configure rules according to your requirements.

Example development rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                          && request.auth.uid == userId;
    }
  }
}
```

---

### 4. Create firebase-config.js

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🎮 Demo Account

To use Demo Mode, create a Firebase Authentication account:

```text
Email: random@gmail.com
Password: random@gmail.com
```

Then click the **Demo** button on the home page.

---

## ▶️ Running the Project

Since this project uses ES Modules and Firebase imports, it should be served from a web server.

### Option 1: VS Code Live Server

Install:

```text
Live Server
```

Right-click:

```text
index.html → Open with Live Server
```

### Option 2: Firebase Hosting

```bash
firebase init hosting
firebase deploy
```

---

## 🔒 Security Notes

This project is intended for learning and portfolio purposes.

Before deploying publicly:

- Add stronger password validation
- Use production Firestore security rules
- Implement email verification
- Add password reset functionality
- Protect demo accounts from abuse

---

## 🌟 Future Improvements

- Task editing
- Task priorities
- Categories and tags
- Dark mode
- Notifications and reminders
- Drag-and-drop task sorting
- Mobile application version
- Offline support

---

## 👨‍💻 Author

**Nishant Kumar**

Built as a learning project to practice:

- Firebase Authentication
- Firestore Database
- JavaScript Modules
- CRUD Operations
- User Authentication Flows

---

## 📜 License

This project is open-source and available for educational and personal use.
