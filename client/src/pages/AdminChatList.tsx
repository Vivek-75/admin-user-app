import { useEffect, useState } from "react"
import { useGetAllUsersMutation } from "../services/api"
import { useAppSelector } from "../store/store"
import { IUser } from "../interface"
import { Box, Typography } from "@mui/material"
import ChatUserList from "../components/ChatUserList"


export default function AdminChatList() {

  const adminId = useAppSelector(state => state.users._id)
  const [getAllUsers] = useGetAllUsersMutation()
  const [users, setUsers] = useState<IUser[]>()

  const fetchData = async () => {
    try {
      const { data, error } = await getAllUsers(adminId)
      console.log(data, error);
      setUsers(data)
    }
    catch {
      console.log('Error in getAllUsers');
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (users === undefined)
    return <h1>loading...</h1>

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
        >

          <Box bgcolor='#FFF7FC' p='.5rem' borderRadius='1rem'>
            <Typography variant='h5' textAlign='center'>
              {users.length === 0 ? 'users not found' : 'Select to chat'}
            </Typography>
            {users?.map((user) => (
              <ChatUserList
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