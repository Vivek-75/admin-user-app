import { useState } from "react"
import { Box, TextField, Button, useMediaQuery, Typography } from "@mui/material"
import { useVerifyEmailMutation } from "../../services/api";



export default function ForgetPassword() {

  const [email, setEmail] = useState<string>('')
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [verifyEmail] = useVerifyEmailMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email);
    const sendData = {
      email: email,
    }
    const { data } = await verifyEmail(sendData)
    console.log(data);
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
          <Typography variant="h5" textAlign='center' >Forget Password</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              margin="1.5rem 0"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
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