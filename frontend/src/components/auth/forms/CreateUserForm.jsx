import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from 'src/store/auth/authSlice'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { toast } from 'react-hot-toast'
import { useRouter } from 'src/hooks/use-router'

const initialValues = {
  email: '',
  name: '',
  password: '',
  policy: false,
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup.string().max(255).required('Name is required'),
  password: Yup.string().min(7).max(255).required('Password is required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
})

const CreateUserForm = ({ creationCallback }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => handleSubmit(),
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const { isLoading } = useSelector((state) => state.auth)

  const handleSubmit = () => {
    try {
      const newUser = {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        isAdmin: true,
        role: 'admin',
      }

      dispatch(registerUser(newUser))
        .unwrap()
        .then(() => {
          toast.success('User account successfully created!')
          creationCallback(2)
          // setTimeout(() => router.push(paths.dashboard.index), 500)
        })
    } catch (error) {
      console.error('Error Registering user')
    }
  }

  return (
    <>
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant='subtitle2' color='primary.main' sx={{ mb: 1 }}>
            Let's start by creating an account.
          </Typography>
          <Typography variant='h5'>Create User Account</Typography>
          {/* <Typography color='text.secondary' variant='body2'>
            Already have an account? &nbsp;
            <Link href='/login' underline='hover' variant='subtitle2'>
              Log in
            </Link>
          </Typography> */}
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label='Name'
              name='name'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label='Email Address'
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='email'
              value={formik.values.email}
            />
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
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                )
              }
              fullWidth
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
              label='Confirm Password'
              name='passwordConfirmation'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='password'
              value={formik.values.passwordConfirmation}
            />
          </Stack>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 1,
            }}
          >
            <Checkbox
              checked={formik.values.policy}
              name='policy'
              onChange={formik.handleChange}
            />
            <Typography color='text.secondary' variant='body2'>
              I have read the{' '}
              <Link href='/terms-of-service' underline='hover'>
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {!!(formik.touched.policy && formik.errors.policy) && (
            <FormHelperText error>{formik.errors.policy}</FormHelperText>
          )}
          <LoadingButton
            loading={isLoading}
            loadingPosition='start'
            fullWidth
            size='large'
            sx={{ mt: 3 }}
            type='submit'
            variant='contained'
          >
            Next
          </LoadingButton>
        </form>
      </div>
    </>
  )
}

export default CreateUserForm
