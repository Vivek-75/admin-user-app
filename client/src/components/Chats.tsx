import { Box, IconButton, TextField, Typography } from "@mui/material"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { IDBChat, useCreateChatMutation, useGetChatMutation } from "../services/api";




export default function Chats() {

  const {id: receiverId} = useParams()
  const senderId = useAppSelector(state =>  state.users._id)
  const [createChat] = useCreateChatMutation()
  const [getChat] = useGetChatMutation()
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<IDBChat[]>()

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
            overflow-y='scroll'
          >
            {/* <Box
              display='flex'
              m='.2rem .5rem'
              justifyContent='flex-start'
            >
              <Typography
                bgcolor='#8DECB4'
                p='.5rem'
                borderRadius='.8rem .8rem .8rem 0rem'
              >
                hiiiiiiiiiiiiiiiii
              </Typography>
            </Box>

            <Box
              display='flex'
              m='.2rem .5rem'
              justifyContent='flex-end'
            >
              <Typography
                bgcolor='#8DECB4'
                p='.5rem'
                borderRadius='.8rem .8rem 0rem .8rem'
              >
                hiiiiiiiiiiiiiiiii
              </Typography>
            </Box> */}


            {messages?.map((data) => (
              // <Typography key={data._id} textAlign={data.receiverId == receiverId ? 'left' : 'right'}>
              //   {data.message}
              // </Typography> 
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
              <SendOutlinedIcon style={{fill: "green"}} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}