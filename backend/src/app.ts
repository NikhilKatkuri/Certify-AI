/**
 * imports
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const { NODE_ENV, CLIENT_URL } = process.env;
const isProduction = NODE_ENV === 'production';

/**
 * app
 */

const app: ReturnType<typeof express> = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * CORS Configuration
 * In production, only allow requests from the specified CLIENT_URL.
 * In development, allow requests from any origin.
 *
 * Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
 * Allowed Headers: Content-Type, Authorization
 *
 */

app.use(
  cors({
    origin: isProduction ? CLIENT_URL : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'LinkFlow Server is running!',
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// 404 handler for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
