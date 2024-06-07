import mongoose from "mongoose";
import { IPendingUser } from "../interface";


const pendingUserSchema = new mongoose.Schema<IPendingUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true
  }
})

const PendingUser = mongoose.model<IPendingUser>('PendingUser', pendingUserSchema);
export default PendingUser;
// export const User = mongoose.model<IUser>('User', userSchema); 