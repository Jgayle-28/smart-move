import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Switch,
  FormControlLabel,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { paths } from 'src/paths'
import { useAuth } from 'src/hooks/use-auth'
import { addCustomer, updateCustomer } from 'src/store/customers/customerSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'src/hooks/use-router'
import { formatPhoneNumber } from 'src/utils/format-phone-number'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddressSelect from '../shared/AddressSelect'

export const CustomerForm = (props) => {
  const { customer, isEdit, ...other } = props

  const [createJob, setCreateJob] = useState(false)

  const { user } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      customerName: customer?.customerName || '',
      customerEmail: customer?.customerEmail || '',
      customerPhoneNumber: customer?.customerPhoneNumber || '',
      altCustomerPhoneNumber: customer?.customerPhoneNumber || '',
      customerAddress: customer?.customerAddress || '',
      referredBy: customer?.referredBy || '',
      comments: customer?.comments || '',
      company: customer?.company || '',
      addedBy: customer?.addedBy || '',
    },
    validationSchema: Yup.object({
      customerName: Yup.string().max(255).required('FirstName is required'),
      customerEmail: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      customerPhoneNumber: Yup.string()
        .max(15)
        .required('Phone number required'),
      altCustomerPhoneNumber: Yup.string().max(15),
      customerAddress: Yup.string().max(255),
      referredBy: Yup.string().max(255),
      comments: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      handleSubmit(helpers)
    },
  })
  console.log('formik :>> ', formik.values)

  const handleSubmit = (helpers) => {
    const customerData = {
      customerName: formik.values.customerName,
      customerEmail: formik.values.customerEmail,
      customerPhoneNumber: formik.values.customerPhoneNumber,
      altCustomerPhoneNumber: formik.values.altCustomerPhoneNumber,
      customerAddress: formik.values.customerAddress,
      referredBy: formik.values.referredBy,
      comments: formik.values.comments,
      company: isEdit ? formik.values.company : user.company,
      addedBy: isEdit ? formik.values.addedBy : user._id,
    }
    // Only add the _id for customers being edited
    if (customer) {
      customerData._id = customer._id
    }

    if (isEdit) {
      try {
        dispatch(updateCustomer(customerData))
          .unwrap()
          .then(() => {
            router.push(paths.dashboard.customers.index)
            toast.success('Customer successfully updated')
            helpers.resetForm()
          })
      } catch (error) {
        console.log('error ----->', error)
        toast.error(error.message)
      }
    } else {
      try {
        dispatch(addCustomer(customerData))
          .unwrap()
          .then((res) => {
            if (res.status === 201) {
              // If adding a customer and user wants to create a job for them
              if (!isEdit && createJob) {
                navigate('/dashboard/jobs/create', {
                  state: { customer: res.customer },
                })
              } else {
                router.push(paths.dashboard.customers.index)
              }
              toast.success('Customer successfully added')
            }
          })
      } catch (error) {
        console.log('error ----->', error)
        toast.error(error.message)
      }
    }
  }

  const handleAddressChange = (name, newValue) => {
    formik.setFieldValue(name, newValue)
  }

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title={isEdit ? 'Edit Customer' : ''} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.customerName && formik.errors.customerName)
                }
                fullWidth
                helperText={
                  formik.touched.customerName && formik.errors.customerName
                }
                label='Full name'
                name='customerName'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.customerName}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.customerEmail && formik.errors.customerEmail
                  )
                }
                fullWidth
                helperText={
                  formik.touched.customerEmail && formik.errors.customerEmail
                }
                label='Email address'
                name='customerEmail'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.customerEmail}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.customerPhoneNumber &&
                    formik.errors.customerPhoneNumber
                  )
                }
                fullWidth
                helperText={
                  formik.touched.customerPhoneNumber &&
                  formik.errors.customerPhoneNumber
                }
                label='Phone Number'
                name='customerPhoneNumber'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formatPhoneNumber(formik.values.customerPhoneNumber)}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.altCustomerPhoneNumber &&
                    formik.errors.altCustomerPhoneNumber
                  )
                }
                fullWidth
                helperText={
                  formik.touched.altCustomerPhoneNumber &&
                  formik.errors.altCustomerPhoneNumber
                }
                label='Alternate Phone Number'
                name='altCustomerPhoneNumber'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formatPhoneNumber(formik.values.altCustomerPhoneNumber)}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(
                    formik.touched.customerAddress &&
                    formik.errors.customerAddress
                  )
                }
                fullWidth
                helperText={
                  formik.touched.customerAddress &&
                  formik.errors.customerAddress
                }
                label='Address'
                name='customerAddress'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.customerAddress}
              />
              {/* <AddressSelect
                error={
                  !!(
                    formik.touched.customerAddress &&
                    formik.errors.customerAddress
                  )
                }
                fullWidth
                helperText={
                  formik.touched.customerAddress &&
                  formik.errors.customerAddress
                }
                label='Address'
                name='customerAddress'
                onBlur={formik.handleBlur}
                savedValue={formik.values.customerAddress}
                onChange={handleAddressChange}
              /> */}
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={
                  !!(formik.touched.referredBy && formik.errors.referredBy)
                }
                fullWidth
                helperText={
                  formik.touched.referredBy && formik.errors.referredBy
                }
                label='Referred By'
                name='referredBy'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.referredBy}
              />
            </Grid>
            <Grid xs={12} md={12}>
              <TextField
                error={!!(formik.touched.comments && formik.errors.comments)}
                fullWidth
                helperText={formik.touched.comments && formik.errors.comments}
                label='Comments'
                name='comments'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.comments}
                multiline
                rows={4}
              />
            </Grid>
            {/* switch controls whether we route to job create or back to customers */}
            {!isEdit && (
              <Grid xs={12} md={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={createJob}
                      name='createJob'
                      onChange={() => setCreateJob((prevState) => !prevState)}
                    />
                  }
                  label='Immediately create Job for this customer'
                />
              </Grid>
            )}
          </Grid>

          {/* <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='space-between'
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Make Contact Info Public
                </Typography>
                <Typography color='text.secondary' variant='body2'>
                  Means that anyone viewing your profile will be able to see
                  your contacts details
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isVerified}
                color='primary'
                edge='start'
                name='isVerified'
                onChange={formik.handleChange}
                value={formik.values.isVerified}
              />
            </Stack>
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='space-between'
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Available to hire
                </Typography>
                <Typography color='text.secondary' variant='body2'>
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.hasDiscount}
                color='primary'
                edge='start'
                name='hasDiscount'
                onChange={formik.handleChange}
                value={formik.values.hasDiscount}
              />
            </Stack>
          </Stack> */}
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          flexWrap='wrap'
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type='submit'
            variant='contained'
          >
            {isEdit ? 'Update Customer' : 'Add Customer'}
          </Button>
          <Button
            color='inherit'
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.dashboard.customers.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  )
}

CustomerForm.propTypes = {
  customer: PropTypes.object.isRequired,
}
