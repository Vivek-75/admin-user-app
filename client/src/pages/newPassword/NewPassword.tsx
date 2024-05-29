import { useState } from "react"
import { Box, TextField, Button, useMediaQuery, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useSetNewPasswordMutation } from "../../services/api";



export default function NewPassword() {

  const [password, setPassword] = useState<string>('')
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { id: reserToken } = useParams()
  const [newPassword] = useSetNewPasswordMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sendData = {
      password: password,
      resetToken: reserToken || '0',
    }

    const { data, error } = await newPassword(sendData)
    console.log(data, error);
  }

  return (
    <>
      <Box
        display='grid'
        justifyContent='center'
        alignItems='center'
        height='80vh'
      >
        <Box
          width={isNonMobile ? '20rem' : '15rem'}
          height='10rem'
        >
          <Typography variant="h5" textAlign='center' >New Password</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              margin="1.5rem 0"
            >
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
              />
            </Box>
            <Button type="submit" fullWidth variant="contained" >Submit</Button>
          </form>
        </Box>
      </Box>
    </>
  )
}