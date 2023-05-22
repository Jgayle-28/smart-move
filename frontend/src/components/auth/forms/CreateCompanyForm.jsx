import { useSelector, useDispatch } from 'react-redux'
import { registerCompany } from 'src/store/company/companySlice'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Stack, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { paths } from 'src/paths'
import { toast } from 'react-hot-toast'
import { useRouter } from 'src/hooks/use-router'
import { updateUser } from 'src/store/auth/authSlice'

const initialValues = {
  companyName: '',
  companyEmail: '',
  companyPhoneNumber: '',
  companyAddress: '',
  companyWebsite: '',
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
  companyEmail: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  companyName: Yup.string().max(255).required('Name is required'),
  companyPhoneNumber: Yup.string().matches(
    phoneRegExp,
    'Phone number is not valid'
  ),
  companyName: Yup.string().max(255).required('Address is required'),
})

const CreateCompanyForm = ({ creationCallback }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => handleSubmit(),
  })

  console.log('formik :>> ', formik)

  const dispatch = useDispatch()
  const router = useRouter()

  const { user } = useSelector((state) => state.auth)
  const { company, isLoading } = useSelector((state) => state.company)

  const handleSubmit = () => {
    console.log('formik values from company :>> ', formik)
    try {
      const newCompany = {
        companyName: formik.values.companyName,
        companyEmail: formik.values.companyEmail,
        companyPhoneNumber: formik.values.companyPhoneNumber,
        companyAddress: formik.values.companyAddress,
        companyWebsite: formik.values.companyWebsite,
        owner: user._id,
        // staff:[user._id] commented out because not sure if owner should be considered staff
      }
      // Create company
      dispatch(registerCompany(newCompany))
        .unwrap()
        .then((createdCompany) => {
          const newUser = { ...user, company: createdCompany._id }
          // Update user with company id
          dispatch(updateUser(newUser))
            .unwrap()
            .then((res) => {
              console.log('res :>> ', res)
              toast.success(
                'Registration complete, hang tight while we redirect you to your dashboard'
              )
              setTimeout(() => router.push(paths.dashboard.index), 700)
            })
        })
    } catch (error) {
      console.error('Error Registering user')
    }
  }

  return (
    <>
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography color='primary.main' sx={{ mb: 1 }}>
            Tell us about your business.
          </Typography>{' '}
          <Typography variant='h5'>Company Information</Typography>
        </Stack>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              error={
                !!(formik.touched.companyName && formik.errors.companyName)
              }
              fullWidth
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
              label='Company Name'
              name='companyName'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.companyName}
            />
            <TextField
              error={
                !!(formik.touched.companyEmail && formik.errors.companyEmail)
              }
              fullWidth
              helperText={
                formik.touched.companyEmail && formik.errors.companyEmail
              }
              label='Email Address'
              name='companyEmail'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='email'
              value={formik.values.companyEmail}
            />
            <TextField
              error={
                !!(
                  formik.touched.companyPhoneNumber &&
                  formik.errors.companyPhoneNumber
                )
              }
              fullWidth
              helperText={
                formik.touched.companyPhoneNumber &&
                formik.errors.companyPhoneNumber
              }
              label='Company Phone Number'
              name='companyPhoneNumber'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.companyPhoneNumber}
            />
            <TextField
              error={
                !!(
                  formik.touched.companyAddress && formik.errors.companyAddress
                )
              }
              fullWidth
              helperText={
                formik.touched.companyAddress && formik.errors.companyAddress
              }
              label='Company Address'
              name='companyAddress'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.companyAddress}
            />
            <TextField
              error={
                !!(
                  formik.touched.companyWebsite && formik.errors.companyWebsite
                )
              }
              fullWidth
              helperText={
                formik.touched.companyWebsite && formik.errors.companyWebsite
              }
              label='Company Website'
              name='companyWebsite'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.companyWebsite}
            />
            {/* <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label='Password'
              name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
          </Stack>
          {/* <Box
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
              <Link component='a' href='#'>
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {!!(formik.touched.policy && formik.errors.policy) && (
            <FormHelperText error>{formik.errors.policy}</FormHelperText>
          )} */}
          <LoadingButton
            loading={isLoading}
            loadingPosition='start'
            fullWidth
            size='large'
            sx={{ mt: 3 }}
            type='submit'
            variant='contained'
          >
            Get Started With Smart Move
          </LoadingButton>
        </form>
      </div>
    </>
  )
}

export default CreateCompanyForm
