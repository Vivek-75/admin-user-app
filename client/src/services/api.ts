import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../interface';

const backendUrl = 'http://localhost:8080';

interface IEmail {
  email: string
}

interface IResetPassword {
  resetToken?: string,
  invitationToken?: string,
  password: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  endpoints: (builder) => ({
    //auth
    register: builder.mutation<UserId, IUser>({
      query: (user) => ({
        url: `/auth/register`,
        method: 'POST',
        body: user,
        credentials: "include"
      })
    }),
    login: builder.mutation<UserId, IUser>({
      query: (user) => ({
        url: `/auth/login`,
        method: 'POST',
        body: user,
        credentials: "include"
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: "include"
      })
    }),
    getUserData: builder.mutation<UserId, void>({
      query: () => ({
        url: `/verifyAuth`,
        method: 'POST',
        credentials: "include"
      })
    }),
    
    //application
    getUsers: builder.mutation<IUser[], string>({
      query: (adminId) => ({
        url: `/user/${adminId}`,
        credentials: "include"
      })
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: 'DELETE',
        credentials: "include"
      })
    }),
    disableUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/admin/disable/${id}`,
        method: 'PATCH',
        credentials: "include"
      })
    }),
    verifyEmail: builder.mutation<string, IEmail>({
      query: (email) => ({
        url: `/user/verifyemail`,
        method: 'POST',
        body: email,
        credentials: "include"
      })
    }),
    setNewPassword: builder.mutation<string, IResetPassword>({
      query: (data) => ({
        url: `/user/updatepassword`,
        method: 'POST',
        body: data,
        credentials: "include"
      })
    }),
    createUserAndInvite: builder.mutation<string, IUser>({
      query: (data) => ({
        url: `/admin/createuserandinvite`,
        method: 'POST',
        body: data,
        credentials: "include"
      })
    }),
    inviteSetPassword: builder.mutation<string, IResetPassword>({
      query: (data) => ({
        url: `/admin/invite/setpassword`,
        method: 'POST',
        body: data,
        credentials: "include"
      })
    }),
    reInvite: builder.mutation<string, string>({
      query: (userId) => ({
        url: `/admin/reinvite/${userId}`,
        method: 'POST',
        credentials: "include"
      })
    }),
    getPendingUsers: builder.mutation<IUser[], string>({
      query: (adminId) => ({
        url: `/admin/pendingusers/${adminId}`,
        credentials: "include"
      })
    }),
  }),
})


export const {useRegisterMutation,
  useLoginMutation, 
  useLogoutMutation , 
  useGetUserDataMutation, 
  useGetUsersMutation,
  useDeleteUserMutation,
  useDisableUserMutation,
  useVerifyEmailMutation,
  useSetNewPasswordMutation,
  useCreateUserAndInviteMutation,
  useInviteSetPasswordMutation,
  useReInviteMutation,
  useGetPendingUsersMutation,
  } = api
// export const { useGetTodoQuery, useGetToDoByIdQuery, useLazyGetToDoByIdQuery, useGetToDosQuery, useCreateTodoMutation } = api