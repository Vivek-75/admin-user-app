import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useAppSelector } from '../store/store';
import { useEffect, useState } from 'react';
import { useGetUsersMutation, useReInviteMutation } from '../services/api';
import { IRows, IUser } from '../interface';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDeleteUserMutation, useDisableUserMutation } from "../services/api";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useNavigate } from 'react-router-dom';



export default function UserList() {


  const adminId = useAppSelector(state => state.users._id)
  const [data, setData] = useState<IUser[]>([])
  const [getUsers] = useGetUsersMutation()
  const [reload, setReload] = useState<boolean>(false)
  const [rows, setRows] = useState<IRows[]>([])
  const [deleteUser] = useDeleteUserMutation();
  const [disableUser] = useDisableUserMutation();
  const [reInvite] = useReInviteMutation()
  const navigate = useNavigate()




  const fetchUsers = async () => {
    try {
      const { data, error } = await getUsers(adminId)
      console.log(data, error);
      if (error)
        throw new Error()
      
      setData(data)
    }
    catch {
      console.log('Error in getUsers');
    }
  }

  const handleDelete = async ({id: userId}: {id: string}) => {
    
    // e.stopPropagation();
    console.log('delete user', userId);
    if(userId === undefined ){
      console.log('type error in userlist');
      return;
    }
    const {data, error} = await deleteUser(userId);
    console.log(data, error);
    setReload(prev => !prev);
  }

  const handleDisable = async ({id: userId}: {id: string}) => {
    console.log('disable user');
    if(userId === undefined ){
      console.log('type error in userlist');
      return;
    }
    const {data, error} = await disableUser(userId);
    console.log(data, error);
    setReload(prev => !prev);
  }

  const handleInvite = async ({id: userId}: {id: string}) => {
    console.log('reinvite user');
    if(userId === undefined ){
      console.log('type error in userlist');
      return;
    }
    const {data, error} = await reInvite(userId);
    console.log(data, error);
    alert('invite sent')
  }

  const handleChat = ({id: _id}: {id: string}) => {
    navigate(`/chat/${_id}`)
  }


  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'status', headerName: 'Status', width: 250 },
    { field: 'disabled', headerName: 'Availability', width: 250 },
    { field: 'actions', headerName: 'Actions', width: 250, renderCell: (params) => {
      // console.log(params, 'params');
      
      return (
        <Box
          display='flex'
          justifyContent='flex-start'
          alignItems='center'
          mt='.3rem'
          gap='.2rem'
        >
          <Tooltip title="Delete">
            <span>
              <IconButton
                onClick={() => handleDelete(params.row)}
                // disabled={params.row.status === 'Pending'}
              >
                <DeleteOutlineOutlinedIcon />            
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Disable">
            <span>
              <IconButton 
                onClick={() => {params.row.disabled === 'Enable'  && handleDisable(params.row)}} 
                // disabled={params.row.status === 'Pending'}
              >
                {params.row.disabled === 'Disabled'  ? 
                <NoAccountsOutlinedIcon /> :
                <AccountCircleOutlinedIcon />
              }
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Invite">
            <span>
              <IconButton onClick={() => handleInvite(params.row)} disabled={params.row.status==='Accepted'}>
                <ReplayOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Message">
            <span>
              <IconButton
                onClick={() => {handleChat(params.row)}}
                disabled={params.row.disabled === 'Disabled' || params.row.status === 'Pending'}
              >
                <ChatOutlinedIcon  />            
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      );
    } }

  ];



  const getRows = () => {
    let newRows: IRows[] | undefined = [];
    data.forEach(user => {
      newRows.push({
        id: user._id || 'id',
        name: user.name || 'cant find name',
        email: user.email,
        status: user.pending ? 'Pending' : 'Accepted',
        disabled: user.disabled ? 'Disabled' : 'Enable' 
      })
    })
    console.log(rows);
    return newRows;
  }

  // console.log(data, 'data');
  // console.log(rows, 'rows');
  
  useEffect( () => {
    fetchUsers()
  }, [reload])

  useEffect( () => {
    setRows(getRows())
  }, [data])

  if (data === undefined)
    return <h1>loading...</h1>
  // console.log(data.length);
  
  // if(rows.length === 0 && data.length === 0)
  //   return <h1>loading rows...</h1>


  return (
    <Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Box>
  )
}