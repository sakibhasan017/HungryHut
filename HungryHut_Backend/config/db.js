import mongoose from "mongoose";

export const connectDB= async () => {
  await mongoose.connect('mongodb+srv://Golden:sakib097@cluster0.nq7dttw.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}