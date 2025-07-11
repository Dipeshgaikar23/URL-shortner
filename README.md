   # URL Shortener

A full-stack URL shortening application built with React, Node.js, Express, and MongoDB. This application allows users to create shortened URLs, track click statistics, and manage their URLs through a user dashboard.

## Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Slugs**: Registered users can create custom URL slugs
- **Click Tracking**: Track the number of clicks on each shortened URL
- **User Authentication**: Register, login, and manage your shortened URLs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- TanStack React Query for data fetching
- TanStack Router for routing
- Tailwind CSS for styling
- Vite as the build tool

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_KEY=your_jwt_secret_key
   APP_URL=http://localhost:3000/
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### URL Operations
- `POST /api/create` - Create a new short URL
- `GET /api/urls/urls` - Get all URLs for the logged-in user
- `GET /:id` - Redirect to the original URL

## Project Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── dao/           # Data Access Objects
│   │   ├── middlewares/   # Express middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   ├── app.js             # Express app setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── apis/          # API client functions
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── routing/       # Router configuration
    │   ├── store/         # Redux store
    │   ├── utils/         # Utility functions
    │   ├── App.jsx        # Main App component
    │   └── main.jsx       # Entry point
    ├── index.html
    └── package.json
```

## Future Enhancements

- QR code generation for shortened URLs
- Advanced analytics (geographic data, referrer information)
- URL expiration options
- Password-protected URLs
- API rate limiting
- Social sharing options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
