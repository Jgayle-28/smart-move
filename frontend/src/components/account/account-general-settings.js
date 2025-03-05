import { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Grid2 as Grid,
  Divider,
  Switch,
} from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useAuth } from 'src/hooks/use-auth'
import Spinner from '../shared/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { updateUser } from 'src/store/auth/authSlice'
import { toast } from 'react-hot-toast'
import { OptionsColorPreset } from '../settings/settings-drawer/options-color-preset'
import { OptionsColorScheme } from '../settings/settings-drawer/options-color-scheme'
import { OptionsNavColor } from '../settings/settings-drawer/options-nav-color'
import { OptionsLayout } from '../settings/settings-drawer/options-layout'
import { OptionsContrast } from '../settings/settings-drawer/options-contrast'

// Import your Settings context here
import { SettingsContext } from 'src/contexts/settings-context'

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

  const { handleUpdate, colorPreset, paletteMode, navColor, layout, contrast } =
    useContext(SettingsContext) // Use context to get handleUpdate

  const initialValues = user
    ? {
        name: user?.name,
        email: user?.email,
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
        _id: user?._id,
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        company: user?.company,
        isAdmin: user?.isAdmin,
        role: user?.role,
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

  const handleFieldUpdate = (field, value) => {
    if (handleUpdate) {
      handleUpdate({ [field]: value }) // Update the theme settings using context
    }
  }

  return (
    <Stack spacing={4} {...props}>
      {user?.role === 'admin' && (
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
      )}
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant='h6'>App Settings</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={5} sx={{ p: 3 }}>
                <OptionsColorPreset
                  onChange={(value) => handleFieldUpdate('colorPreset', value)}
                  value={colorPreset}
                />
                <OptionsColorScheme
                  onChange={(value) => handleFieldUpdate('paletteMode', value)}
                  value={paletteMode}
                />
                <OptionsNavColor
                  onChange={(value) => handleFieldUpdate('navColor', value)}
                  value={navColor}
                />
                <OptionsLayout
                  onChange={(value) => handleFieldUpdate('layout', value)}
                  value={layout}
                />
                <OptionsContrast
                  onChange={(value) => handleFieldUpdate('contrast', value)}
                  value={contrast}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* {user.isAdmin && (
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
      )} */}
    </Stack>
  )
}
