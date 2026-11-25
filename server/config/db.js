import mongoose from "mongoose";

// Global variable mein connection cache store karenge
let cached = global.mongoose;

// Agar cache available nahi hai toh create karo
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {

  // Agar connection already available hai
  if (cached.conn) {
    return cached.conn;
  }

  // Agar connection promise available nahi hai
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongoose) => {
        return mongoose;
      });
  }

  // Connection complete hone ka wait karo
  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectDB;