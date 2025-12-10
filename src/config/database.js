import mongoose from 'mongoose';
import { config } from './env.js';

export async function connectDatabase() {
  try {
    await mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

export function disconnectDatabase() {
  mongoose.disconnect();
}

export default mongoose;
