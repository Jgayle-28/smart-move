import { useSelector, useDispatch } from 'react-redux'
import { updateCompany } from 'src/store/company/companySlice'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { toast } from 'react-hot-toast'

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

const UpdateCompanyForm = () => {
  const dispatch = useDispatch()
  const { company, isLoading } = useSelector((state) => state.company)

  const formik = useFormik({
    initialValues: {
      companyName: company?.companyName || '',
      companyEmail: company?.companyEmail || '',
      companyPhoneNumber: company?.companyPhoneNumber || '',
      companyAddress: company?.companyAddress || '',
      companyWebsite: company?.companyWebsite || '',
      companyEstimatePolicy: company?.companyEstimatePolicy || '',
    },
    validationSchema,
    onSubmit: () => handleSubmit(),
  })

  const handleSubmit = () => {
    try {
      const companyData = {
        companyName: formik.values.companyName,
        companyEmail: formik.values.companyEmail,
        companyPhoneNumber: formik.values.companyPhoneNumber,
        companyAddress: formik.values.companyAddress,
        companyWebsite: formik.values.companyWebsite,
        companyEstimatePolicy: formik.values.companyEstimatePolicy,
      }

      dispatch(updateCompany({ ...company, ...companyData }))
        .unwrap()
        .then(() => {
          toast.success('Company successfully updated')
        })
    } catch (error) {
      console.error('Error Registering user')
    }
  }

  return (
    <>
      <Card>
        <CardContent>
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
                    formik.touched.companyAddress &&
                    formik.errors.companyAddress
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
                    formik.touched.companyWebsite &&
                    formik.errors.companyWebsite
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
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Stack spacing={3}>
              <Typography variant='h5'>Company Policies</Typography>
              <TextField
                fullWidth
                helperText='This is used on your estimates and will give your customers an idea of how you charge for your services.'
                label='Estimate Policy'
                name='companyEstimatePolicy'
                onChange={formik.handleChange}
                value={formik.values.companyEstimatePolicy}
                multiline
                rows={4}
              />
            </Stack>
            <LoadingButton
              loading={isLoading}
              loadingPosition='start'
              size='large'
              sx={{ mt: 3 }}
              type='submit'
              variant='contained'
            >
              Save Updates
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateCompanyForm
