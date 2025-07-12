# 🍽️ HungryHut - Full Stack Food Ordering App

HungryHut is a cross-platform, full-stack food ordering application designed to deliver a fast, intelligent, and user-friendly experience for food lovers and restaurant admins. It features nutrition-based food recommendations, real-time order tracking, secure Stripe payments, and a responsive design for web and desktop environments.

---

## 🔍 Project Overview

HungryHut is a modern, full-stack food ordering platform built to streamline the user and admin experience, from meal selection to real-time order management.

    🛒 Seamless Food Ordering Experience
    Users can browse a wide range of food items, filter by category, add to cart, and place orders in just a few clicks. Order history and status updates are available in the user dashboard.

    🔐 Secure User Authentication and Profile Management
    HungryHut supports user registration, login, password reset (via security question), and JWT-based session handling. Users can update their profile and track past orders conveniently.

    🥗 Smart Nutrition-Based Filtering
    A unique feature that allows users to enter dietary goals (Calories, Protein, Fat, Carbs). A backend algorithm filters menu items dynamically to provide personalized, health-conscious suggestions.

    💳 Real-Time Payments and Order Tracking
    Stripe integration enables secure, real-time payments. Users receive instant updates on order status, including delivery progress.

    🛠️ Powerful Admin Panel
    Admins can:
        Add, update, or delete food items (with images & nutritional info)
        View and manage all user orders
        Update order statuses (e.g., "Out for Delivery")
        Automatically generate trending food data based on order frequency

---

## 🛠️ Technologies Used

### Frontend

* React.js + Vite
* CSS Modules
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (with Mongoose ODM)
* Stripe API

### Authentication

* JWT (JSON Web Token)

### Desktop App

* Electron.js

### Deployment

* Web: Vercel (Frontend and Admin) & Render (Backend)
* Desktop: Electron Packager (Windows .exe)


---

## ✨ Key Features

### User Side

* Log In / Sign Up with JWT authentication
* Browse and filter food items
* Add to cart & place orders
* Smart nutrition-based suggestions
* Track order status
* View order history and edit profile
* Trending food detection

### Admin Panel

* Add / Modify / Delete food items
* Manage orders
* View all user orders
* Simple password-based access control

---

## 🔐 Authentication

* JWT-based secure login system
* Token stored in localStorage
* Role-based access (User/Admin)

---

## 💳 Stripe Payment

* Stripe checkout session
* Secure payment via USD conversion
* Success and cancel redirect handling

---

## 🧠 Smart Logic

* Nutrition Suggestion: Filter food items by user-input nutrition goals (calories, protein, fat, carbs)
* Trending Food: Food items ranked dynamically by order count (using MongoDB counter field)

---


## ⚠️ Challenges Faced

* Building custom filtering logic for nutrition suggestions
* Making trending food section dynamic based on database values
* Integrating Stripe checkout with backend and frontend routing
* Smooth scroll-linked navigation inside SPA

---

## ✅ Learning Outcomes

* Practical understanding of full-stack architecture
* Implemented RESTful API and session management
* Deployed secure and scalable web & desktop versions
* Learned collaborative tools: GitHub, JIRA, and CI/CD deployment

---

## 🌐 Live Demo

[Explore HungryHut on Vercel Frontend](https://hungry-hut-frontends.vercel.app/) <br>
[Explore HungryHut on Vercel Admin](https://hungry-hut-admin.vercel.app/)

---

## 🙏 Design Inspiration

UI Inspired by [GreatStack](https://www.youtube.com/@GreatStackDev)

---

## 📬 Feedback

Feel free to fork, clone, and enhance this project. Contributions and feedback are welcome!

---

### 🌟 Created with passion by Sakib Hasan
