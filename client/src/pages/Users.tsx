import { useState, useEffect } from "react"
import { Button, Typography, Box } from "@mui/material"
import UserWidget from "../components/UserWidget"
import { useGetUsersMutation } from "../services/api"
import { IUser } from "../interface"
import { useAppSelector } from "../store/store"

export default function Users() {

  const adminId = useAppSelector(state => state.users._id)
  const [data, setData] = useState<IUser[]>([])
  const [getUsers] = useGetUsersMutation()
  const [reload, setReload] = useState<boolean>(false)

  const fetchUsers = async () => {
    try {
      const { data, error } = await getUsers(adminId)
      // console.log(adminId)

      console.log(data, error);
      if (error)
        throw new Error()
      
      setData(data)
    }
    catch {
      console.log('Error in getUsers');
    }
  }

  useEffect( () => {
      fetchUsers()
  }, [reload])

  if (data === undefined)
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
              Users {data.length === 0 && 'not found'}
            </Typography>
            {data?.map((user) => (
              <UserWidget
                key={user._id}
                _id={user._id || 'id'}
                name={user.name || 'error in name props'}
                email={user.email}
                disabled={user.disabled || false}
                setReload={setReload}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}