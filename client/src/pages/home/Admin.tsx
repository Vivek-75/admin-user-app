import { Box, Typography, Button, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import UserList from "../../components/UserList";




export default function Admin () {

  const navigate = useNavigate()
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <Box >
        <Box      
          display='flex'
          flexDirection='column'
          justifyContent='center'
          my='1rem'
          mx={matches ? '1rem' : 'auto'}
          p={matches ? '1rem' : '.3rem'}
          borderRadius='1rem'
          >
          <Heading />
          <UserList />
        </Box>
      </Box>
      
    </>
  )
}