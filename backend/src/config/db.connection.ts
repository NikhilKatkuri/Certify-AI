import mongoose from 'mongoose';
import 'dotenv/config';

/**
 * Connect to MongoDB database
 */

const DB_URI = process.env['DATABASE_URI'];

const connectToDatabase = async (): Promise<void> => {
  if (!DB_URI)
    throw new Error('Database URI is not defined in environment variables');

  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URI).then(() => {
      console.log('Connected to the database successfully');
    });

    // Listen for connection errors
    mongoose.connection.on('error', err => {
      console.error(`Database connection error: ${err}`);
    });
  } catch (error) {
    throw new Error(`Failed to connect to the database: ${error}`);
  }
};

export default connectToDatabase;
