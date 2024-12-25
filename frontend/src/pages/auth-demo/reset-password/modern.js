import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { Seo } from 'src/components/seo'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { resetPassword } from 'src/store/auth/authSlice'
import { useRouter } from 'src/hooks/use-router'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'

const initialValues = {
  password: '',
  passwordConfirm: '',
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(7, 'Must be at least 7 characters')
    .max(255)
    .required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
})

const Page = () => {
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues,
    validationSchema,
  })
  const router = useRouter()
  const dispatch = useDispatch()
  const { token } = useParams()
  console.log('token :>> ', token)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (error) {
      setError(null)
    }
    try {
      dispatch(resetPassword({ token, password: formik.values.password }))
        .unwrap()
        .then(() => {
          toast.success('Password reset successfully')
          router.push('/login')
        })
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || 'An error occurred'
      setError(errorMessage)
    }
  }

  return (
    <>
      <Seo title='Reset Password' />
      <div>
        {/* <Box sx={{ mb: 4 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.index}
            sx={{
              alignItems: 'center',
              display: 'inline-flex'
            }}
            underline="hover"
          >
            <SvgIcon sx={{ mr: 1 }}>
              <ArrowLeftIcon />
            </SvgIcon>
            <Typography variant="subtitle2">
              Dashboard
            </Typography>
          </Link>
        </Box> */}
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant='h5'>Reset password</Typography>
        </Stack>
        <form noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {error ? (
              <Alert severity='error'>{error}</Alert>
            ) : (
              <>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label='Password'
                  name='password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='password'
                  value={formik.values.password}
                />
                <TextField
                  error={
                    !!(
                      formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm
                    )
                  }
                  fullWidth
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                  label='Password (Confirm)'
                  name='passwordConfirm'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='password'
                  value={formik.values.passwordConfirm}
                />
              </>
            )}
          </Stack>
          <Button
            fullWidth
            size='large'
            sx={{ mt: 3 }}
            type='submit'
            variant='contained'
          >
            Reset
          </Button>
        </form>
      </div>
    </>
  )
}

export default Page
