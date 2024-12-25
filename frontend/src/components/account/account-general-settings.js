import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAuth } from 'src/hooks/use-auth'
import Spinner from '../shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { updateUser } from 'src/store/auth/authSlice'
import { toast } from 'react-hot-toast'

const tempValues = {
  email: '',
  name: '',
  password: '',
  passwordConfirmation: '',
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
})

export const AccountGeneralSettings = (props) => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  const { isLoading } = useSelector((state) => state.auth)

  const initialValues = user
    ? {
        name: user.name,
        email: user.email,
        password: '',
        passwordConfirmation: '',
      }
    : tempValues

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit()
      resetForm(initialValues)
    },
  })

  const handleSubmit = () => {
    try {
      const updatedUser = {
        _id: user._id,
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        company: user.company,
        isAdmin: user.isAdmin,
        role: user.role,
      }
      dispatch(updateUser(updatedUser))
        .unwrap()
        .then(() => {
          toast.success('Account successfully updated')
        })
    } catch (error) {
      console.error('Error Registering user')
    }
  }

  // if (!user) return <Spinner />
  return (
    <Stack spacing={4} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant='h6'>Basic details</Typography>
            </Grid>
            <Grid xs={12} md={8}>
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
                    sx={{ flexGrow: 1 }}
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
                    sx={{
                      flexGrow: 1,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderStyle: 'dashed',
                      },
                    }}
                  />
                  {/* <TextField
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                  /> */}
                  <LoadingButton
                    loading={isLoading}
                    loadingPosition='start'
                    fullWidth
                    size='large'
                    type='submit'
                    variant='outlined'
                  >
                    Save Updates
                  </LoadingButton>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant='h6'>Public profile</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={8}>
              <Stack divider={<Divider />} spacing={3}>
                <Stack
                  alignItems='flex-start'
                  direction='row'
                  justifyContent='space-between'
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant='subtitle1'>
                      Make Contact Info Public
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      Means that anyone viewing your profile will be able to see
                      your contacts details.
                    </Typography>
                  </Stack>
                  <Switch />
                </Stack>
                <Stack
                  alignItems='flex-start'
                  direction='row'
                  justifyContent='space-between'
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant='subtitle1'>
                      Available to hire
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      Toggling this will let your teammates know that you are
                      available for acquiring new projects.
                    </Typography>
                  </Stack>
                  <Switch defaultChecked />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      {user.isAdmin && (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Typography variant='h6'>Delete Account</Typography>
              </Grid>
              <Grid xs={12} md={8}>
                <Stack alignItems='flex-start' spacing={3}>
                  <Typography variant='subtitle1'>
                    Delete your account and all of your source data. This is
                    irreversible.
                  </Typography>
                  <Button color='error' variant='outlined'>
                    Delete account
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Stack>
  )
}
