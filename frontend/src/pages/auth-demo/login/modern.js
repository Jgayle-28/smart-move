import * as Yup from 'yup'
import { useFormik } from 'formik'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import {
  Box,
  Button,
  Link,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { paths } from 'src/paths'

const initialValues = {
  email: '',
  password: '',
  submit: null,
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().max(255).required('Password is required'),
})

const Page = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  })

  return (
    <>
      <Seo title='Login' />
      <div>
        <Box sx={{ mb: 4 }}>
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
            <SvgIcon sx={{ mr: 1 }} fontSize='small'>
              <KeyboardBackspaceOutlinedIcon />
            </SvgIcon>
            <Typography variant='subtitle2'>Dashboard</Typography>
          </Link>
        </Box>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant='h5'>Log in</Typography>
          {/* <Typography
            color="text.secondary"
            variant="body2"
          >
            Don&apos;t have an account?
            &nbsp;
            <Link
              href="#"
              underline="hover"
              variant="subtitle2"
            >
              Register
            </Link>
          </Typography> */}
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              autoFocus
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
          </Stack>
          <Button
            fullWidth
            sx={{ mt: 3 }}
            size='large'
            type='submit'
            variant='contained'
          >
            Continue
          </Button>
          <Box sx={{ mt: 3 }}>
            <Link href='/forgot-password' underline='hover' variant='subtitle2'>
              Forgot password?
            </Link>
          </Box>
        </form>
      </div>
    </>
  )
}

export default Page
