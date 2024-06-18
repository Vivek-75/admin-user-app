import { Box, Typography, IconButton, Tooltip } from "@mui/material"
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useGetUserByIdMutation } from "../services/api";
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";

export default function ChatHeader () {

  const {id} = useParams()
  console.log(id);

  if(id === undefined)
    return <h1>receiver id not found</h1>
  
  const [name, setName] = useState<string>('')
  const [getUserById] = useGetUserByIdMutation()

  const getName = async () => {
    const {data, error} = await getUserById(id)
    console.log(data, error);
    typeof data === 'string' && setName(data)
  }

  useEffect(() => {
    getName()
  }, [])


  return (
    <>
      <Box 
        display='flex' 
        justifyContent='space-between'
        bgcolor='#373A40'
        color='#f2f2f2'
        p='.5rem'
        pl='1.5rem'
        borderRadius='1rem 1rem 0 0'  
      >
        <Box >
          <Typography
            variant='h6'
            mt='.3rem'
          >
            {name}
          </Typography>
        </Box>
        <Box 
          display='flex'
          justifyContent='flex-end'
          gap='.5rem'
          pr='.5rem'
        >
          <Tooltip title="Video call">
            <IconButton>
              <VideoCallIcon style={{fill: "cyan"}} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Call">
            <IconButton>
              <CallIcon style={{fill: "cyan"}} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  )
}