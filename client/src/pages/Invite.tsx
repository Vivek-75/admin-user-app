import { Typography, Box } from "@mui/material"
import InviteForm from "../components/InviteForm"



export default function Invite() {


  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        // border='1px solid black'
        width='20rem'
        m='2rem auto'
      >

        <Box
          m='1rem auto'
          border='1px solid #999'
          borderRadius='1rem'
          p='1rem'
          pb='0'
        >
          <Typography textAlign='center' variant="h5">Send invitation</Typography>
          <InviteForm />
        </Box>
      </Box>
    </>
  )
}