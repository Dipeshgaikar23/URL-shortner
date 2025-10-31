import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/mongodb.config.js';
import createUrlRoute from './src/routes/url.route.js';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import { redirectFromShortUrl } from './src/controllers/shorturl.controller.js';
import errorHandler from './src/utils/errorhandler.js';
import cors from 'cors';
import { attachUser } from './src/utils/attachuser.helper.js';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Unified and dynamic CORS config
const allowedOrigins = [
  'http://localhost:5173',
  'https://url-shortner-frontend-6yrb.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);
app.use('/api/create', createUrlRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);


app.listen(PORT, () => {
  connectDB();
  console.log(`✅ App is listening on port ${PORT}`);
});
