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
  const [page, setPage] = useState<number>(0)
  const [disableRightArrow, setDisableRightArrow] = useState<boolean>(false)


  const fetchUsers = async (cpage: number) => {
    try {
      const { data, error } = await getUsers({adminId, page: cpage})
      console.log(data, error, cpage);
      if (error)
        throw new Error()
      
      setData(data.user)
      setDisableRightArrow(!data.moreUser)
    }
    catch {
      console.log('Error in getUsers');
    }
  }

  const handleLeftArrow = () => {
    setPage(prev => prev - 1)
    fetchUsers(page-1)
  }

  const handleRightArrow = () => {
    setPage(prev => prev + 1)
    fetchUsers(page+1)
  }

  useEffect(() => {
    fetchUsers(0)
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
            <Box
              textAlign='center'
            >
              <Button onClick={() => handleLeftArrow()} disabled={page === 0}>&lt;</Button>
              <Button onClick={() => handleRightArrow()} disabled={disableRightArrow}>&gt;</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}