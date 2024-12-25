import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { Seo } from 'src/components/seo'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { forgotPassword } from 'src/store/auth/authSlice'

const initialValues = {
  enteredEmail: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
})

const Page = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (error) {
      setError(null)
    }
    dispatch(forgotPassword(formik.values.enteredEmail))
      .unwrap()
      .then(() => {
        setSuccess(true)
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
  })

  return (
    <>
      <Seo title='Forgot Password' />
      <div>
        {/* <Box sx={{ mb: 4 }}>
          <Link
            color='text.primary'
            component={RouterLink}
            href={paths.dashboard.index}
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
            }}
            underline='hover'
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant='subtitle2'>Dashboard</Typography>
          </Link>
        </Box> */}
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant='h5'>Forgot password</Typography>
        </Stack>
        {success ? (
          <Alert severity='success'>
            Email has been sent containing a reset link
          </Alert>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              autoFocus
              error={
                error ||
                !!(formik.touched.enteredEmail && formik.errors.enteredEmail)
              }
              fullWidth
              helperText={
                error ||
                (formik.touched.enteredEmail && formik.errors.enteredEmail)
              }
              label='Email Address'
              name='enteredEmail'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='email'
              value={formik.values.enteredEmail}
            />
            <Button
              fullWidth
              size='large'
              sx={{ mt: 3 }}
              type='submit'
              variant='contained'
            >
              Send reset link
            </Button>
          </form>
        )}
      </div>
    </>
  )
}

export default Page
