import mongoose from 'mongoose';

const config = process.env;

const db: any = {};
db.connect = () => {
  // Connecting to the database

  let connString = ((config.MONGO_URI as string) +
    config.DATABASE_NAME) as string;

  mongoose
    .connect(connString, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    })
    .then(() => {
      console.log(
        `Successfully connected to MongoDB database: ${config.DATABASE_NAME}`
      );
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};
export default db;
