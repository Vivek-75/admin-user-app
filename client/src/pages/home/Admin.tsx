import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";


export default function Admin () {

  const navigate = useNavigate()
  

  return (
    <>
      <Box >
        <Box      
          display='flex'
          flexDirection='column'
          justifyContent='center'
          width='15rem'
          m='2rem auto'
        >
          <Box
            m='1rem auto'
            width='100%'
          >
            <Button fullWidth variant="outlined" onClick={() => navigate('/invite')}>
              <Typography variant='h6' >
                Send Invitation
              </Typography>
            </Button>
          </Box>
          <Box
            m='1rem auto'
            width='100%'
          >
            <Button fullWidth variant="contained" onClick={() => {navigate('/users')}}>
              <Typography variant='h6'>
                Check Users
              </Typography>
            </Button>
          </Box>  
          <Box
            m='1rem auto'
            width='100%'
            >
            <Button fullWidth variant="contained" onClick={() => {navigate('/chat')}}>
              <Typography variant='h6'>
                Chat with user
              </Typography>
            </Button>
          </Box>        
        </Box>
      </Box>
      
    </>
  )
}