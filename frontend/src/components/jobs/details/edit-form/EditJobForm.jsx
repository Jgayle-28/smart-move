import {
  Button,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Box,
  TextField,
  MenuItem,
  Checkbox,
} from '@mui/material'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import _ from 'lodash'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { updateJob } from 'src/store/jobs/jobSlice'
// Jobs Steps ------------------------------->
import { CustomerDetailsStep } from '../../form/CustomerDetailsStep'
import { useEffect, useState } from 'react'
import { JobDetailsStep } from '../../form/JobDetailsStep'
import { PaymentDetailStep } from '../../form/PaymentDetailStep'
import { EstimateStep } from '../../form/EstimateStep'

const categoryOptions = [
  {
    label: 'Move',
    value: 'move',
  },
  {
    label: 'Delivery',
    value: 'delivery',
  },
  {
    label: 'Pick Up and Drop Off',
    value: 'pu_do',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

const validationSchema = Yup.object({
  customer: Yup.string().min(7).required('Customer is required'),
  pickUpAddress: Yup.string().min(7).required('Pickup address is required'),
  jobTitle: Yup.string().min(7).required('You must enter a job title.'),
})

function EditJobForm({
  focusJob,
  handleToggleEdit,
  handleSaveComplete,
  handleJobDeleteClick,
}) {
  const [selectedCustomer, setSelectedCustomer] = useState('')

  useEffect(() => {
    if (focusJob) setSelectedCustomer(focusJob.customer.customerName)
  }, [focusJob])

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      createdBy: focusJob?.createdBy,
      jobTitle: focusJob?.jobTitle,
      jobType: focusJob?.jobType,
      customer: focusJob?.customer._id,
      pickUpAddress: focusJob?.pickUpAddress,
      pickUpAddress2: focusJob?.pickUpAddress2,
      dropOffAddress: focusJob?.dropOffAddress,
      dropOffAddress2: focusJob?.dropOffAddress2,
      jobDate: focusJob?.jobDate || new Date(),
      jobStartTime: focusJob?.jobStartTime || new Date(),
      jobComments: focusJob?.jobComments,
      estimateDate: focusJob?.estimateDate || new Date(),
      estimateTime: focusJob?.estimateTime || new Date(),
      estimateComments: focusJob?.estimateComments,
      billTo: focusJob?.billTo,
      billingSameAsCustomer: focusJob?.billingSameAsCustomer || false,
      paymentType: focusJob?.paymentType,
      isPaid: focusJob?.isPaid,
    },
    validationSchema,
    onSubmit: () => handleSubmit(),
  })

  const handleSubmit = () => {
    try {
      const updatedJob = {
        _id: focusJob._id,
        company: focusJob.company,
        createdBy: formik.values.createdBy,
        jobTitle: formik.values.jobTitle,
        jobType: formik.values.jobType,
        customer: formik.values.customer,
        pickUpAddress: formik.values.pickUpAddress,
        pickUpAddress2: formik.values.pickUpAddress2,
        dropOffAddress: formik.values.dropOffAddress,
        dropOffAddress2: formik.values.dropOffAddress2,
        jobDate: formik.values.jobDate,
        jobStartTime: formik.values.jobStartTime,
        jobComments: formik.values.jobComments,
        estimateDate: formik.values.estimateDate,
        estimateTime: formik.values.estimateTime,
        estimateComments: formik.values.estimateComments,
        billTo: formik.values.billTo,
        billingSameAsCustomer: formik.values.billingSameAsCustomer,
        paymentType: formik.values.paymentType,
        isPaid: formik.values.isPaid,
      }

      dispatch(updateJob(updatedJob))
        .unwrap()
        .then(() => {
          toast.success('Job successfully updated')
          handleSaveComplete()
        })
    } catch (error) {
      console.error('Error creating job')
    }
  }

  const togglePaidStatus = () => {
    formik.setFieldValue('isPaid', !formik.values.isPaid)
  }

  const isUntouched =
    JSON.stringify(formik.values) === JSON.stringify(formik.initialValues)

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <div>
            <Button
              size='small'
              startIcon={
                <SvgIcon fontSize='small'>
                  <ArrowLeftIcon />
                </SvgIcon>
              }
              onClick={handleToggleEdit}
            >
              Go Back
            </Button>
          </div>
        </Grid>
        <Grid xs={6}>
          <Stack direction='row' justifyContent='flex-end' spacing={2}>
            <Button
              size='small'
              color='success'
              disabled={isUntouched}
              startIcon={
                <SvgIcon fontSize='small'>
                  <CheckCircleOutlineOutlined />
                </SvgIcon>
              }
              onClick={handleSubmit}
            >
              Save Updates
            </Button>
            <Button
              color='error'
              size='small'
              startIcon={
                <SvgIcon fontSize='small'>
                  <RemoveCircleOutline />
                </SvgIcon>
              }
              onClick={handleJobDeleteClick}
            >
              Delete Job
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <form>
            <Stack spacing={4}>
              <Box>
                <Stack spacing={2}>
                  <Typography variant='h6'>Job Type</Typography>
                  <TextField
                    value={formik.values.jobType}
                    name='jobType'
                    fullWidth
                    label='Job Type'
                    select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.jobType && formik.errors.jobType)}
                    helperText={formik.touched.jobType && formik.errors.jobType}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Box>

              <Box>
                <Stack spacing={2}>
                  <CustomerDetailsStep
                    formik={formik}
                    isEdit={true}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                  />
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <JobDetailsStep formik={formik} isEdit={true} />
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <EstimateStep formik={formik} isEdit={true} />
                </Stack>
              </Box>
              <Box>
                <Stack spacing={2}>
                  <PaymentDetailStep formik={formik} isEdit={true} />
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
                    checked={formik.values.isPaid}
                    name='isPaid'
                    onChange={togglePaidStatus}
                  />
                  <Typography color='text.secondary' variant='body2'>
                    Mark Job As {formik.values.isPaid ? 'Unpaid' : 'Paid'}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default EditJobForm
