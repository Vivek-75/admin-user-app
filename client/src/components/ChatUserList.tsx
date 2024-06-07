import { Box, Typography, IconButton, Grid } from "@mui/material"
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { IUserWidget } from "../interface";
import { useNavigate } from "react-router-dom";

export default function ChatUserList(props: IUserWidget) {

  const {
    _id,
    name,
    email,
  } = props;

  const navigate = useNavigate()

  const handleChat = () => {
    navigate(`/chat/${_id}`)
  }

  return(
    <>
      <Box 
        sx={{ flexGrow: 1}}
        bgcolor='#FFE5F1'
        width='100%' 
        p='.5rem 1rem'
        m='.5rem 0'
        borderRadius='.5rem'
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box>
              <Typography >
                {name}
              </Typography>
              <Typography fontSize='.9rem'>
                {email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box
              display='flex'
              justifyContent='flex-end'
              alignItems='flex-end'
              mt='.2rem'
            >
              <IconButton
                onClick={() => handleChat()}
              >
                <ChatOutlinedIcon  />            
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}