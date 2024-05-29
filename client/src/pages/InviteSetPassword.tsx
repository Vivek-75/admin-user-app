import { useState } from "react"
import { Box, TextField, Button, useMediaQuery, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useInviteSetPasswordMutation } from "../services/api";


export default function InviteSetPassword() {

  const [password, setPassword] = useState<string>('')
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { id: invitationToken } = useParams()
  const [inviteSetPassword] = useInviteSetPasswordMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const sendData = {
      invitationToken: invitationToken || '0',
      password: password,
    }

    const { data, error } = await inviteSetPassword(sendData)
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
          <Typography variant="h5" textAlign='center' >Set Password</Typography>
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