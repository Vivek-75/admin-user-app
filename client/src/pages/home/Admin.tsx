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
          // border='1px solid black'
          width='20rem'
          m='2rem auto'
        >
          <Box
            m='1rem auto'
          >
            <Button variant="outlined" onClick={() => navigate('/invite')}>
              <Typography variant='h6' >
                Send Invitation
              </Typography>
            </Button>
          </Box>
          <Box
            m='1rem auto'
          >
            <Button variant="contained" onClick={() => {navigate('/users')}}>
              <Typography variant='h6'>
                Chcek Users
              </Typography>
            </Button>
          </Box>  
        </Box>
      </Box>
    </>
  )
}