import { Box, Typography, IconButton, Grid } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useDeleteUserMutation, useDisableUserMutation } from "../services/api";
import { IUserWidget } from "../interface";


export default function UserWidget(props: IUserWidget) {

  const {
    _id: userId,
    name,
    email,
    disabled,
    setReload,
  } = props;

  const [deleteUser] = useDeleteUserMutation();
  const [disableUser] = useDisableUserMutation();

  const handleDelete = async () => {
    console.log('delete user');
    if(userId === undefined ){
      console.log('type error in userwidget');
      return;
    }
    const {data, error} = await deleteUser(userId);
    console.log(data, error);
    setReload(prev => !prev);
  }

  const handleDisable = async () => {
    console.log('disable user');
    if(userId === undefined ){
      console.log('type error in userwidget');
      return;
    }
    const {data, error} = await disableUser(userId);
    console.log(data, error);
    setReload(prev => !prev);
  }

  
  return(
    <>
      <Box 
        sx={{ flexGrow: 1}}
        bgcolor='#FFE5F1'
        // border='1px solid black' 
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
                onClick={() => handleDelete()}
              >
                <DeleteOutlineOutlinedIcon />            
              </IconButton>
              <IconButton onClick={() => {!disabled && handleDisable()}}>
                {disabled ? 
                <NoAccountsOutlinedIcon /> :
                <AccountCircleOutlinedIcon />
                }
              </IconButton>
              <IconButton>
                <ReplayOutlinedIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}