import mongoose from 'mongoose';
const connectDB = (url)=>{
   console.log("In connectDB");
   return mongoose.connect(url);
}
export default connectDB;
