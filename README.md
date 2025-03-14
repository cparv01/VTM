# Vulnerability Threat Management And Issue Prioritization (VTM)

A **full-stack web application** for managing security vulnerabilities, threat assessment, and issue prioritization with **AI-powered assistance**.

---

## 📜 Table of Contents
- [🚀 Features](#-features)
- [🎥 Demo & Screenshots](#-demo--screenshots)
- [🛠 Tech Stack](#-tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [📌 Prerequisites](#-prerequisites)
- [⚙️ Installation](#-installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [⚙️ Environment Variables](#-environment-variables)
- [📄 API Documentation](#-api-documentation)
- [🛠 Development](#-development)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📬 Support](#-support)

---

## 🚀 Features
✅ **Vulnerability Tracking & Management**  
🤖 **AI-powered chatbot for assistance**  
📊 **Interactive dashboard with analytics**  
🔔 **Real-time notifications**  
🌙 **Dark/Light mode support**  
📱 **Fully responsive design**  
🔐 **User authentication & authorization**  
📝 **Detailed issue reporting**  
💬 **Interactive chat interface**  

---

## 🎥 Demo & Screenshots

### 🎬 Video Demo
▶️ [Watch the demo](https://drive.google.com/file/d/1ZXSd4aJOdCmfRS-z844lfT00B5ewk15m/preview)

### 📷 Screenshots
#### 📊 Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard showcasing vulnerability analytics*

#### 📝 Issue Management
![Issue Management](screenshots/issues.png)
*Efficient issue tracking & management interface*

#### 🤖 AI Chatbot
![AI Chatbot](screenshots/chatbot.png)
*AI-powered chatbot providing real-time assistance*

#### 🌙 Dark Mode
![Dark Theme](screenshots/dark-theme.png)
*Sleek and modern dark mode interface*

#### 🔔 Notifications
![Notifications](screenshots/notifications.png)
*Stay updated with real-time alerts*

---

## 🛠 Tech Stack

### 🌐 Frontend
- **React.js** (v18.2.0)
- **Material UI** (v5.15.15)
- **React Router** (v6.23.0)
- **Bootstrap** (v5.3.3)
- **Axios** (v1.6.7)
- **ApexCharts** (v1.4.1)

### 🔙 Backend
- **Laravel** (v8.54)
- **PHP** (^7.3 | ^8.0)
- **Laravel Sanctum** (Authentication)
- **MySQL/PostgreSQL**
- **Guzzle HTTP Client**

---

## 📌 Prerequisites
Before installation, ensure you have:
- **Node.js** (v16+)
- **PHP** (v7.3+)
- **Composer**
- **MySQL/PostgreSQL**
- **Git**

---

## ⚙️ Installation

### 💻 Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### 🖥 Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

---

## ⚙️ Environment Variables

### 📌 Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
```

### 🔙 Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

MAIL_MAILER=smtp
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
```

---

## 📄 API Documentation
Access API documentation at **`/api/documentation`** after starting the backend server.

---

## 🛠 Development

### 🧪 Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
php artisan test
```

### 🎨 Code Style
- **Frontend**: ESLint rules applied
- **Backend**: Follows PSR-12 standards

---

## 🤝 Contributing
1. **Fork** the repository
2. **Create a new branch** (`git checkout -b feature/NewFeature`)
3. **Commit your changes** (`git commit -m 'Add NewFeature'`)
4. **Push the branch** (`git push origin feature/NewFeature`)
5. **Submit a Pull Request** 🚀

---

## 📜 License
This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 📬 Support
For support, please open an **issue** in the repository or contact the development team.

---
