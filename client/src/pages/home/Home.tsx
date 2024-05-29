import { useAppSelector } from "../../store/store"
import Admin from "./Admin"
import User from "./User"


export default function Home() {

  const isAdmin = useAppSelector(state => state.users.isAdmin)
  // console.log(isAdmin);
  
  
  return (
    <>
      {isAdmin ? <Admin /> : <User />}
      {/* <button onClick={() => handleLogout()}>Logout</button> */}
    </>
  )
}