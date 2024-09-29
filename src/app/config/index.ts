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
};
