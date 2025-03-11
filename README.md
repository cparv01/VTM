# Vulnerability Threat Management And Issue Prioritization

A full-stack web application for managing security vulnerabilities, threat assessment, and issue prioritization with AI-powered assistance.

## Table of Contents
- [Features](#features)
- [Demo & Screenshots](#demo--screenshots)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- 🔒 Vulnerability tracking and management
- 🤖 AI-powered chatbot for assistance
- 📊 Interactive dashboard with analytics
- 🔔 Real-time notifications
- 🌓 Dark/Light theme support
- 📱 Responsive design
- 🔐 User authentication and authorization
- 📝 Detailed issue reporting
- 💬 Interactive chat interface

## Demo & Screenshots

### Video Demo
https://drive.google.com/file/d/1ZXSd4aJOdCmfRS-z844lfT00B5ewk15m/preview

*Watch our application demo showcasing key features and functionality*

### Screenshots

#### Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard showing vulnerability analytics and metrics*

#### Issue Management
![Issue Management](screenshots/issues.png)
*Issue tracking and management interface*

#### AI Chatbot
![AI Chatbot](screenshots/chatbot.png)
*AI-powered chatbot for quick assistance*

#### Dark Theme
![Dark Theme](screenshots/dark-theme.png)
*Application in dark mode*

#### Notifications
![Notifications](screenshots/notifications.png)
*Real-time notification system*

> Note: Replace `path_to_your_video` and the screenshot paths with actual paths to your media files. You can store these in a `screenshots` or `assets` directory in your repository.

## Tech Stack

### Frontend
- React.js (v18.2.0)
- Material UI (v5.15.15)
- React Router (v6.23.0)
- Bootstrap (v5.3.3)
- Axios (v1.6.7)
- React ApexCharts (v1.4.1)
- Various UI components (React Select, React CSV, etc.)

### Backend
- Laravel (v8.54)
- PHP (^7.3|^8.0)
- Laravel Sanctum for authentication
- MySQL/PostgreSQL
- Guzzle HTTP Client

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- PHP (v7.3 or higher)
- Composer
- MySQL or PostgreSQL
- Git

## Installation

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
composer install

# Create .env file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Start development server
php artisan serve
```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
```

### Backend (.env)
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

## API Documentation

The API documentation can be accessed at `/api/documentation` after starting the backend server.

## Development

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
php artisan test
```

### Code Style
- Frontend follows ESLint configuration
- Backend follows PSR-12 coding standards

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
