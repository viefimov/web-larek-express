import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  dbAddress: process.env.DB_ADDRESS,
  uploadPath: process.env.UPLOAD_PATH,
  uploadPathTemp: process.env.UPLOAD_PATH_TEMP,
  originAllow: process.env.ORIGIN_ALLOW,
  authRefreshTokenExpiry: process.env.AUTH_REFRESH_TOKEN_EXPIRY,
  authAccessTokenExpiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
};
