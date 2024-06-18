import { Typography, Box } from "@mui/material"
import InviteForm from "../components/InviteForm"
import { useEffect, useState } from "react"
import { useAppSelector } from "../store/store"
import { useGetPendingUsersMutation } from "../services/api"
import { IUser } from "../interface"
import InviteWidget from "../components/InviteWidget"



export default function Invite() {

  const adminId = useAppSelector(state => state.users._id)
  const [data, setData] = useState<IUser[]>([])
  const [getPendingUsers] = useGetPendingUsersMutation()
  const [reload, setReload] = useState<boolean>(false)


  const fetchUsers = async () => {
    try {
      const { data, error } = await getPendingUsers(adminId)
      if (error || data === undefined)
        throw new Error()
      setData(data)
      console.log(data, error);
      
    }
    catch {
      console.log('Error in getUsers');
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [reload])

  if (data === undefined)
    return <h1>loading...</h1>

  console.log(data);


  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        m='1rem auto'
      >
        <Box
          m='1rem auto'
          borderRadius='2rem'
          p='1rem'
          pb='0'
          boxShadow='12px 12px 16px 0 rgba(0, 0, 0, 0.2), -8px -8px 12px 0 rgba(255, 255, 255, 1.3)'            
          bgcolor='#f2f2f2'
        >
          <Typography textAlign='center' variant="h5">Send invitation</Typography>
          <InviteForm setReload={setReload}/>
        </Box>

      </Box>
    </>
  )
}