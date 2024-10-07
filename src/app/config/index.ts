import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  saltRounds: process.env.SALTROUND,
  accessToken_Secret:process.env.ACCESS_TOKEN_SECRET,
  accessToken_ExpiresIn:process.env.ACCESS_TOKEN_EXPIRESIN,
  refreshToken_Secret:process.env.REFRESH_TOKEN_SECRET,
  refreshToken_ExpiresIn:process.env.REFRESH_TOKEN_EXPIRESIN ,
  cloudinary_name:process.env.CLOUDINARY_NAME,
  cloudinary_api:process.env.CLOUDINARY_API_KEY,
  cloudinary_secret:process.env.CLOUDINARY_API_SECRET,
  store_id:process.env.STORE_ID,
  signature_key:process.env.SIGNETURE_KEY,
  payment_Url:process.env.PAYMENT_URL,
  verify_payment_url:process.env.VERIFY_PAYMENT_URL
};
