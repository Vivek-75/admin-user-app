import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Box, TextField, Button, Typography, useMediaQuery, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store"
import { useLoginMutation, useRegisterMutation } from "../services/api"
import { setUser } from "../store/slices/userSlice"
import { IUser } from "../interface";



const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  isAdmin: yup.boolean()
});

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  isAdmin: yup.boolean()
})

const initialLoginValue: IUser = {
  email: "",
  password: "",
  isAdmin: true,
}

const initialRegisterValue: IUser = {
  name: '',
  ...initialLoginValue
}

export default function Form() {

  const [isLogin, setIsLogin] = useState<boolean>(false)
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const dispatch = useAppDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const [login] = useLoginMutation()
  const navigate = useNavigate();


  if (isLoading)
    return <h1>loading...</h1>

  const handleLogin = async (values: IUser, onSubmitProps: any) => {
    try {
      const userData: IUser = {
        email: values.email,
        password: values.password,
        isAdmin: values.isAdmin,
      }
      const { data, error } = await login(userData)

      if (error)
        throw new Error()
      localStorage.setItem('userId', data._id)
      dispatch(setUser(data))

      console.log(data, error);
      onSubmitProps.resetForm()
    }
    catch {
      console.log('Error in login');
    }
  }

  const handleRegister = async (values: IUser, onSubmitProps: any) => {
    try {
      const userData: IUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        isAdmin: values.isAdmin,
      }
      const { data, error } = await register(userData)

      if (error)
        throw new Error()
      localStorage.setItem('userId', data._id)
      dispatch(setUser(data))

      console.log(data);
      onSubmitProps.resetForm()
    }
    catch {
      console.log('Error in register');
    }
  }

  const handleFormSubmit = async (values: IUser, onSubmitProps: any) => {
    if (isLogin)
      await handleLogin(values, onSubmitProps)
    else
      await handleRegister(values, onSubmitProps)
  }

  return (
    <>
    <Box
      display='grid'
      justifyContent='center'
      alignItems='center'
      p='1rem .5rem'
      mt='5rem'
    >

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialLoginValue : initialRegisterValue}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="15px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              width={isNonMobile ? '20rem' : '15rem'}
            >
              {!isLogin && (
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTON */}
            <Box>
              <Button
                fullWidth
                type="submit"
                variant='contained'
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  fontSize: '.8rem',
                  cursor: 'pointer'
                }}
              >
                {isLogin
                  ? "Don't have an account sign up here."
                  : "Alredy have an account login here."}
              </Typography>
              <Typography
                onClick={() => {
                  navigate('/forgotpassword')
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  fontSize: '.8rem',
                  color: 'blue',
                  cursor: 'pointer'
                }}
              >
                {isLogin && "Forgot password"}
              </Typography>

            </Box>
          </form>
        )}

      </Formik>
      </Box>

    </>
  )
}

