import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGetAdminIdMutation } from "../../services/api"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../store/store"


export default function User() {

  const navigate = useNavigate()
  const [getAdminId]  = useGetAdminIdMutation()
  const userId = useAppSelector(state => state.users._id)
  const [adminId, setAdminId] = useState<string>('')


  const fetchAdminId = async () => {
    try{
      console.log(userId);
      const sendData = {
        userId: userId
      }
      const { data, error } = await getAdminId(sendData)
      console.log(data, error);
      setAdminId(error.data)  
    }
    catch{
      console.log('Error in fetchAdminId');
    }
  }

  useEffect(()=> {
    fetchAdminId()
  }, [])
  

  return (
    <>
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
          <Button fullWidth variant="outlined" onClick={() => navigate(`/chat/${adminId}`)}>
            <Typography variant='h6' >
              Chat with admin
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  )
}