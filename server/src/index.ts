import express from 'express'
import cors from 'cors'
import cookies from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import adminRoutes from './routes/admin'
import userRoutes from './routes/user'
import chatRoutes from './routes/chat'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { IUserSocketMap } from './interface'
import { connectDb } from './db/connectDb'


dotenv.config()

const app = express()


app.use(cookies())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const server = createServer(app)
const io = new Server(server, {
  cors : {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

(async () => { await connectDb()})();



const getReceiverSocketId = (receiverId: string) => {
	return userSocketMap[receiverId];
};

const userSocketMap: IUserSocketMap = {}

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  console.log('userid', socket.handshake.query.userId);
  
  const userId  = socket.handshake.query.userId;

	if (typeof userId === 'string')
    userSocketMap[userId] = socket.id;

  console.log('map', userSocketMap);

  socket.on('sendMessage', (data) => {
    console.log(data);
  })
  
  socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
    if (typeof userId === 'string')
  		delete userSocketMap[userId]; 
	});
})


app.get('/', (req, res) => {
  res.json({message : "hello"})
})


app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)


server.listen(8080, ()=>{
  console.log('backend -> http://localhost:8080');
})


export {io, server, getReceiverSocketId}