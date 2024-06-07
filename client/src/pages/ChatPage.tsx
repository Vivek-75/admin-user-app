import { Box, Typography, TextField, IconButton } from "@mui/material"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useAppSelector } from "../store/store";
import { useCreateChatMutation, useGetChatMutation } from "../services/api";


interface IChat {
  _id: string,
  senderId: string,
  receiverId: string,
  message: string,
  // createdAt: string,
  // updatedAt: string,
  // _id: string,
}


export default function ChatPage() {

  const {id: receiverId} = useParams()
  const senderId = useAppSelector(state =>  state.users._id)
  const [createChat] = useCreateChatMutation()
  const [getChat] = useGetChatMutation()
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<IChat[]>()

  const sendText = async () =>{
    try{
      if(text == '')
        return;

      const sendData = {
        senderId: senderId,
        receiverId: receiverId || '',
        text: text,
      }
      const { data, error } = await createChat(sendData)
      console.log(data, error);
      
      setText('')
    }
    catch{
      console.log('Error in sendText');
    }
  }
  
  const fetchChats = async () => {
    try{
      const sendData = {
        senderId: senderId,
        receiverId: receiverId || '',
      }
      const { data, error } = await getChat(sendData)
      console.log(data, error);
      setMessages(data)
    }
    catch{
      console.log('Error in fetchChats');
    }
  }

  useEffect(()=>{
    fetchChats()
  }, [])

  if(messages === undefined)
    return <h1>loading...</h1>

  console.log('m', messages);
  
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        m='2rem auto'
      >
        <Box
          m='1rem auto'
          borderRadius='1rem'
          p='1rem'
          pb='0'
          width='40rem'
          border='1px solid black'
        >
          <Box>

            {/* {console.log(messages, 'mes')} */}

            {messages?.map((data) => (
              <Typography key={data._id} textAlign={data.receiverId == receiverId ? 'right' : 'left'}>
                {data.message}
              </Typography> 
            ))}
          </Box>

          <Box
            // border='1px solid black'
            display='flex'
            gap='1rem'
            m='1.5rem 0 1rem'
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
              <SendOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

    </>
  )
}