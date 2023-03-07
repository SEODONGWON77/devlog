import mongoose, { mongo } from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(process.env.MONGODB_URI!);
  // mongoose.connect('mongodb+srv://admin:001@cluster0.szzbh.mongodb.net/test?retryWrites=true&w=majority');
};

export default dbConnect;
