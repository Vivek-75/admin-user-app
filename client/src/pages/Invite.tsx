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
          border='1px solid #999'
          borderRadius='1rem'
          p='1rem'
          pb='0'
        >
          <Typography textAlign='center' variant="h5">Send invitation</Typography>
          <InviteForm setReload={setReload}/>
        </Box>

        <Box
          m='2rem auto'
          // border='1px solid #999'
          borderRadius='1rem'
          // p='1rem'
          pb='0'
        >
          <Box bgcolor='#FFF7FC' p='.5rem' borderRadius='1rem'>
            <Typography variant='h5' textAlign='center'>
              Pending users {data.length === 0 && 'not found'}
            </Typography>
            {data?.map((user) => (
              <InviteWidget
                key={user._id}
                _id={user._id || 'id'}
                name={user.name || 'error in name props'}
                email={user.email}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}