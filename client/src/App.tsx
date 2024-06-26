import { useEffect } from 'react'
import './App.css'
import { Login } from './pages/Login'
import { useAppSelector, useAppDispatch } from './store/store'
import { useGetUserDataMutation } from './services/api'
import { setUser } from './store/slices/userSlice'
import Home from './pages/home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { CssBaseline } from '@mui/material'
import NewPassword from './pages/newPassword/NewPassword'
import ForgetPassword from './pages/newPassword/ForgetPassword'
import Invite from './pages/Invite'
import InviteSetPassword from './pages/InviteSetPassword'
import Chat from './pages/Chat'


function App() {
  const isAuth = Boolean(localStorage.getItem('userId'))
  const userId = useAppSelector(state => state.users._id)
  const isAdmin = useAppSelector(state => state.users.isAdmin)
  const dispatch = useAppDispatch()
  const [ getUserData ] = useGetUserDataMutation()

  
  const getUser = async () => {
    try{
      const {data, error} = await getUserData()
      if(error)
        throw new Error()
      console.log(data, error);
      
      if(data.auth != undefined && !data.auth){
        localStorage.removeItem('userId')
        console.log('logged out');     
        return 
      }
      else
        dispatch(setUser(data))
      
    }
    catch{
      console.log('User is not logged in');
    }
  }
  
  useEffect(() => {
    if(userId == '' && isAuth)
      getUser()
  }, [])
  
  if(isAuth && userId == '')
    return <h1>Loading...</h1>
  
  return (
    <BrowserRouter>
      <CssBaseline />
      {isAuth &&<> <Navbar /> </>}
      <Routes>
        <Route path='/login' element={isAuth ? <Navigate to='/' /> : <Login />} />
        <Route path='/' element={isAuth ? <Home /> : <Navigate to='/login' /> } />
        <Route path='/invite' element={isAuth && isAdmin ? <Invite /> : <Navigate to='/login' />} />
        {/* <Route path='/users' element={isAuth && isAdmin ? <Users /> : <Navigate to='/login' />} /> */}
        <Route path='/forgotpassword' element={<ForgetPassword />} />
        <Route path='/forgotpassword/:id' element={<NewPassword />} />
        <Route path='/resetpassword/:id' element={<NewPassword />} />
        <Route path='/invite/setpassword/:id' element={<InviteSetPassword />} />
        {/* <Route path='/chat' element={isAdmin ? <AdminChatList /> : <Navigate to='/' /> } /> */}
        <Route path='/chat/:id' element={isAuth ? <Chat /> : <Navigate to='/' /> } />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
