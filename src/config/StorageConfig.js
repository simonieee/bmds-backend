import dotenv from 'dotenv';
dotenv.config();

export default {
  AWS_END_POINT: process.env.AWS_END_POINT,
  ACCESS_KEY: process.env.ACCESS_KEY,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  REGION: process.env.REGION,
  BUCKET_NAME: process.env.BUCKET_NAME,
};
