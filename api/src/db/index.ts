import mongoose from 'mongoose';

import 'dotenv/config';

async function connectToDatabase() {
  const URL = process.env.DATABASE_URL as string;

  try {
    mongoose.connect(URL);

    console.info('*** database connected!');
  } catch (error) {
    console.error('*** database error', error);
    process.exit(1);
  }
}

export default connectToDatabase;
