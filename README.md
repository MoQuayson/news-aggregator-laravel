# News Aggregator Website

This is a FullStack project that builds a news aggregator website, allowing users to view, search, and customize their news feed by pulling articles from various sources.

---

## Features

1. **User Authentication**:
   - Register and log in to the website.
   - Save user preferences and settings.
2. **Article Search and Filtering**:
   - Search articles by keyword.
   - Filter articles by date, category, and source.
3. **Personalized News Feed**:
   - Customize your feed by selecting preferred sources, categories, and authors.
4. **Mobile-Responsive Design**:
   - Optimized for mobile viewing.

---

## Tech Stack

### Backend: Laravel
- Framework: Laravel
- Authentication: Laravel Sanctum
- API Integration: GuzzleHTTP (e.g., News API)
- Database: MySQL (or SQLite/PostgreSQL)

### Frontend: React
- State Management: Redux
- HTTP Client: Axios
- Styling: Tailwind CSS or Bootstrap

---

## Getting Started

### Prerequisites
- **Backend**: PHP (8.x), Composer, MySQL (or SQLite/PostgreSQL)
- **Frontend**: Node.js (18.x+), npm/yarn

---

### Backend Setup

1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone https://github.com/MoQuayson/news-aggregator-laravel
   cd news-aggregator-laravel
   ```
2. Go to the project directory

```bash
  cd  src
```

3. Build images for frontend and backend
   ```bash
   docker up -d --build
   ```
4. Install dependencies for backend
   ```bash
   	docker exec -it news-aggregator-api composer install
  	docker exec -it news-aggregator-api chmod -R 775 storage bootstrap/cache
  	docker exec -it news-aggregator-api php artisan migrate --seed
  	docker exec -it news-aggregator-api chmod -R 775 /var/www/html/storage
  	docker exec -it news-aggregator-api chmod -R 775 /var/www/html/bootstrap/cache
   ```

### Screenshots
![App Screenshot](https://github.com/MoQuayson/news-aggregator-laravel/blob/master/src/screenshorts/login.png)
![App Screenshot](https://github.com/MoQuayson/news-aggregator-laravel/blob/master/src/screenshorts/signup.png)
![App Screenshot](https://github.com/MoQuayson/news-aggregator-laravel/blob/master/src/screenshorts/news.png)

