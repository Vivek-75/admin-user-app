import mongoose from "mongoose";


export const connectDb = async () => {
  if(typeof process.env.MONGO_URI === 'string'){
  await mongoose.connect(process.env.MONGO_URI).then((
    ) => {
      console.log('connected to db');
    }).catch((err) => {
      console.log(err);
    })
  }
}