<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Plateful Logo">
</p>

# Plateful

Plateful is a meal discovery app built with Laravel, React, and Inertia.js. It uses a custom service wrapper around
the  
MealDB API to enable searching for meals and viewing detailed ingredient information. Users can seamlessly explore  
recipes and their ingredients with a smooth, interactive interface powered by modern full-stack technologies.

---

## ⚙️ Tech Stack

- **Frontend:** React, Inertia.js, Vite, Tailwind CSS
- **Backend:** Laravel 12

---

## 🛠 Requirements

To run Plateful locally, make sure you have the following installed on your machine:

- **PHP 8.2** or higher
- **Composer**
- **Node.js**
- **Yarn** or **npm**
- **MySQL** (or compatible database)

Make sure your database server is running before starting the application.

---

## 🚀 Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/plateful.git
    cd plateful
    ```

2. **Install dependencies:**

    ```bash
    composer install
    yarn install
    ```

3. **Set up environment variables:**

   Copy the `.env.example` file to `.env` and configure your database and other settings.

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Run migrations:**

    ```bash
    php artisan migrate
    ```

5. **Import Categories, Areas & Ingredients:**

    ```bash
    php artisan mealdb:import-masterdata
    ```

6. **Start the development server:**

    ```bash
    php artisan serve
    yarn dev
    ```

7. **Open your browser:**

Visit `http://localhost:8000` (or the port you configured) to view the app.

---

## Note

This is a personal project built for fun.
