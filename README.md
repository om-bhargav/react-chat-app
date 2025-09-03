# React Chat App

A modern real-time chat application built with **React** and **Vite**. This project provides a fast and responsive interface for live chatting, with clean code organization and extensible architecture.

---

## 🚀 Demo

https://harmonious-croissant-e223b0.netlify.app/

---

## ✨ Features

- 🔥 Real-time messaging (one-to-one or group chat)  
- 🔐 User authentication (Email/Password, OAuth, or custom auth)  
- 📱 Fully responsive design (desktop & mobile)  
- 🖼️ File and image sharing in chats  
- 💬 Typing indicators and online status  
- ⚡ Built with Vite for blazing-fast development and builds  

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite  
- **State Management:** React Context API (depending on implementation)  
- **Backend/Realtime:** Firebase *(adjust based on your setup)*  
- **Styling:** Bootstrap / CSS Modules / Styled Components  
- **Linting:** ESLint (preconfigured with Vite template)  

---

## 📂 Folder Structure

react-chat-app/
├── public/ # Static assets

├── src/

│ ├── components/ # Reusable React components

│ ├── contexts/ # Context API providers

│ ├── pages/ # Page-level components (Login, Chat, etc.)

│ ├── services/ # API or WebSocket/Firebase integration

│ ├── styles/ # Global styles or Tailwind setup

│ ├── App.jsx # Root application component

│ └── main.jsx # Application entry point

├── .env # Environment variables

├── .gitignore

├── package.json

├── vite.config.js

└── README.md

## ⚙️ Getting Started

### ✅ Prerequisites

- **Node.js** (>=16 recommended)  
- **npm** or **yarn**

### 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/om-bhargav/react-chat-app.git
   cd react-chat-app

🔑 Environment Variables

Create a .env file in the root folder. Example for Firebase setup:

VITE_FIREBASE_API_KEY=your-api-key

VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain

VITE_FIREBASE_PROJECT_ID=your-project-id

VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket

VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id

VITE_FIREBASE_APP_ID=your-app-id

📜 Available Scripts

Command	Description

npm run dev	Start development server with HMR

npm run build	Build the app for production

npm run preview	Preview production build locally

npm run lint	Run ESLint for code linting and formatting

🤝 Contributing
Contributions are always welcome!

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.


📬 Contact

Author: Om Bhargav

GitHub: https://github.com/om-bhargav

Project Link: https://harmonious-croissant-e223b0.netlify.app/
