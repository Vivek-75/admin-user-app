import * as yup from "yup";
import { Formik } from "formik";
import { Box, TextField, Button, useMediaQuery } from "@mui/material";
import { IUser } from "../interface";
import { useCreateUserAndInviteMutation } from "../services/api";


const formSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
})

const formValue: IUser = {
  name: "",
  email: "",
}


export default function InviteForm() {

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [createUserAndInvite] = useCreateUserAndInviteMutation()


  const handleFormSubmit = async (values: IUser, onSubmitProps: any) => {
    console.log('submit');
    console.log(values);
    const sendData = {
      name: values.name,
      email: values.email,
    }
    const {data, error} = await createUserAndInvite(sendData)

    console.log(data, error);
    onSubmitProps.resetForm()
  }


  return (
    <>
      <Box
        display='grid'
        justifyContent='center'
        alignItems='center'
        p='1rem .5rem'
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formValue}
          validationSchema={formSchema}
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
              </Box>

              {/* BUTTON */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  variant='contained'
                  sx={{
                    m: "1.5rem 0",
                    p: "1rem",
                  }}
                >
                  INVITE
                </Button>
              </Box>
            </form>
          )}

        </Formik>

      </Box>
    </>
  )
}