import mongoose from "mongoose";
import { IUser } from "../interface";


const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;
// export const User = mongoose.model<IUser>('User', userSchema); 