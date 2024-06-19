import { Box, IconButton, TextField, Typography } from "@mui/material"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { IDBChat, useCreateChatMutation, useGetChatMutation } from "../services/api";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";



export default function Chats() {

  const authId = (localStorage.getItem('userId'))
  const { id: receiverId } = useParams()
  const senderId = useAppSelector(state => state.users._id)
  const [createChat] = useCreateChatMutation()
  const [getChat] = useGetChatMutation()
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<IDBChat[]>()
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  const sendText = async () => {
    console.log('send Text');
    
    try {
      if (text == '')
        return;

      const sendData = {
        senderId: senderId,
        receiverId: receiverId || '',
        text: text,
      }

      const { data, error } = await createChat(sendData)
      console.log(data, error);

      setText('')
      const DBdata = {
        _id: String(Math.floor(Math.random() * 1000000)),
        from: senderId,
        to: receiverId || '',
        message: text,
      }
      setMessages(prev => [...prev, DBdata])
    }
    catch {
      console.log('Error in sendText');
    }
  }

  const fetchChats = async () => {
    try {
      const sendData = {
        senderId: senderId,
        receiverId: receiverId || '',
      }
      const { data, error } = await getChat(sendData)
      console.log(data, error);
      setMessages(data)
    }
    catch {
      console.log('Error in fetchChats');
    }
  }

  const newMessage = (data: IDBChat) => {
    console.log('newmessage', data);
    setMessages(prev => [...prev, data])
  }

  useEffect(() => {
    fetchChats()
  }, [])


  useEffect(() => {
    const newSocket = io('http://localhost:8080', {
      query: {
        userId: authId
      },
    });

    setSocket(newSocket)
    
    newSocket.on('connect', () => {
      console.log('connected', newSocket.id);
    })

    newSocket.on('newMessage', data => {
      console.log('data', data);
      const text:IDBChat = {
        _id: data._id,
        from: data.from,
        to: data.to,
        message: data.message
      }
      newMessage(text)
    })

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [])  

  

  return (
    <>
      <Box>
        <Box
          border='1px solid black'
          height='400px'
          display='flex'
          flexDirection='column'
          bgcolor='#f2f2f2'
          borderRadius='0 0 1rem 1rem '
          >
          <Box
            height='100%'
            sx={{overflowY: 'scroll'}}
          >
            {messages?.map((data) => (
              <Box
                key={data._id}
                display='flex'
                m='.2rem .5rem'
                justifyContent={data.to == receiverId ? 'flex-end' : 'flex-start'}
              >
                <Typography
                  bgcolor='#8DECB4'
                  p='.5rem'
                  borderRadius={data.to == receiverId ? '.8rem .8rem 0rem .8rem' : '.8rem .8rem .8rem 0rem'}
                >
                  {data.message}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            display='flex'
            gap='1rem'
            mt='auto'
            p='.5rem 1rem 1rem '
            width='100%'
            bgcolor='white'
            borderRadius='0 0 1rem 1rem '
          >
            <TextField
              hiddenLabel
              id="outlined-hidden-label-small"
              variant="outlined"
              size="small"
              value={text}
              onChange={e => setText(e.target.value)}
              fullWidth
            />
            <IconButton
              onClick={() => sendText()}
            >
              <SendOutlinedIcon style={{ fill: "green" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}