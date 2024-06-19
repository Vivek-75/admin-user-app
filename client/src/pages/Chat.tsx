import { Box, useMediaQuery } from "@mui/material"
import ChatHeader from "../components/ChatHeader";
import Chats from "../components/Chats";



export default function Chat() {

  const matches = useMediaQuery('(min-width:600px)');

  
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        m='1rem auto'
      >
        <Box
          m='0rem auto'
          width={matches ? '40rem' : '95%'}
        >
          <ChatHeader />
          <Chats />
        </Box>
      </Box>

    </>
  )
}