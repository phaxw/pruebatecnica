import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT, 10) || 27017,
  dbUser: process.env.DB_USER || 'mongoadmin',
  dbPass: process.env.DB_PASS || 'password123',
  dbName: process.env.DB_NAME || 'prueba_tecnicadb',
  secretKey: process.env.SECRETKEY || 'hola',
};

console.log('Database Config:', {
  dbHost: config.dbHost,
  dbPort: config.dbPort,
  dbUser: config.dbUser,
  dbPass: config.dbPass,
  dbName: config.dbName,
  secretKey: config.secretKey,
});
