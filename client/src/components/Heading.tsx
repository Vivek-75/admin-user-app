import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";


export default function Heading(){

  const navigate = useNavigate()

  const handleInvite = () => {
    navigate('/invite')
  }

  return (
    <Box 
      display='flex' 
      justifyContent='space-between'
      bgcolor='#f2f2f2'
      p='1rem'
      borderRadius='1rem 1rem 0 0'  
    >
      <Box>
        <Typography
          variant='h5'
        >
          Users
        </Typography>
      </Box>
      <Box 
        display='flex'
        justifyContent='flex-end'
        gap='.5rem'
      >
        <Button variant='contained' size="small" onClick={() => handleInvite()}>Invite</Button>
        {/* <Button variant='outlined' size="small">Chat</Button> */}
      </Box>
    </Box>
  )
}