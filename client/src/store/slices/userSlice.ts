import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { api } from '../../services/api'

export interface UserState {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  disabled?: boolean
}


const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    isAdmin: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },

    resetUser: (state) => {
      state = initialState;
      return state;
    },
  },  
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(api.endpoints.getToDos.matchFulfilled, (state, action) => {
  //       state.todos =  action.payload;
  //       return state;
  //     })
  //   }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer