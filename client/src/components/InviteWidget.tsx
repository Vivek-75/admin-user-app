import { Box, Typography, IconButton, Grid } from "@mui/material"
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useReInviteMutation } from "../services/api";
import { IUserWidget } from "../interface";


export default function InviteWidget(props: IUserWidget) {

  const {
    _id: userId,
    name,
    email,
  } = props;

  const [reInvite] = useReInviteMutation()

  const handleInvite = async () => {
    console.log('delete user');
    if(userId === undefined ){
      console.log('type error in userwidget');
      return;
    }
    const {data, error} = await reInvite(userId);
    console.log(data, error);
  }

  console.log('invitewidasfd');
  

  
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
              <IconButton onClick={() => handleInvite()}>
                <ReplayOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}