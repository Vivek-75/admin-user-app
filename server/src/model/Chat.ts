import mongoose from "mongoose";
import { IChat } from "../interface";


const chatSchema = new mongoose.Schema<IChat>({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

const Chat = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;
// export const User = mongoose.model<IUser>('User', userSchema); 