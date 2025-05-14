# 🌍 Countries Explorer
## 📋 Overview

Countries Explorer is a responsive React application that uses information from the REST Countries API to let users explore nations worldwide.  The application offers an easy-to-use interface for searching, saving favourites, filtering by location, and finding information about nations.
## ✨ Features

- **Comprehensive Country Information**: View comprehensive country information, including flags, population, capital, region, languages, and more.
- **Interactive Filtering**: Countries can be filtered by region or by name or capital.
- **Favorites**: Save your favourite nations for easy access.
- **User Authentication**: A safe user account system that allows for registration and login
- **Smooth Navigation**: User-friendly interface with loading states and animation transitions

## 🚀 Hosting
URL: https://countryapp-1.onrender.com

## 🔍 REST Countries API Integration

1. `GET /all` - Fetch all countries for the Home page
2. `GET /name/{name}` - Search countries by name
3. `GET /region/{region}` - Filter countries by region
4. `GET /alpha/{code}` - Get detailed information about a specific country

## 🛠️ Technology Stack

### Frontend
- **React 19**
- **Tailwind CSS** for styling
- **Local Storage** for favorites persistence

### Backend
- **Express.js** for the REST API
- **MongoDB** for user data storage
- **JWT** for authentication

### DevOps
- **Git** for version control
- **GitHub** for repository hosting
- **Render** for application deployment


## 📝 Project Structure

```
AF-2-DULMIKAUSHALYA/
├── rest-countries-app/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CountryCard.jsx
│   │   │   ├── CountryDetails.jsx
│   │   │   ├── FilterMenu.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/
│   │   │   ├── CountryPage.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── controllers/
    │   └── authController.js
    ├── models/
    │   └── User.js
    ├── node_modules/
    ├── routes/
    │   └── auth.js
    ├── .env
    ├── package-lock.json
    ├── package.json
    └── server.js
```
## 🚀 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-DulmiKaushalya.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm start
   ```
## 🔒 Authentication

The application includes a user authentication system with secure login and registration functionality. User sessions are managed with JWT tokens stored in local storage.



