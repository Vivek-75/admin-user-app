import mongoose from "mongoose";
import { IAdmin } from "../interface";


const adminSchema = new mongoose.Schema<IAdmin>({
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
    default: true
  }
})

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
// export const User = mongoose.model<IUser>('User', userSchema); 