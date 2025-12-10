import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/bisai',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Game settings
  pointsPerQuestion: 1,
  teamColors: ['red', 'blue'],
  timePerQuestion: 30,
  
  // Auth settings
  passwordMinLength: 6,
  jwtExpiresIn: '7d',
};

export default config;
