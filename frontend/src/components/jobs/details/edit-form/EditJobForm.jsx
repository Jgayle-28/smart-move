import {
  Button,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  Grid2 as Grid,
  Box,
  TextField,
  MenuItem,
  Checkbox,
} from '@mui/material'
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
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
import EmployeeSelect from 'src/components/shared/EmployeeSelect'

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
  const dispatch = useDispatch()

  useEffect(() => {
    if (focusJob) setSelectedCustomer(focusJob.customer.customerName)
  }, [focusJob])

  const handleSubmit = async () => {
    try {
      const updatedJob = {
        _id: focusJob._id,
        createdBy: formik.values.createdBy,
        jobTitle: formik.values.jobTitle,
        jobType: formik.values.jobType,
        employees: formik.values.employees,
        customer: formik.values.customer,
        pickUpAddresses: formik.values.pickUpAddresses,
        dropOffAddresses: formik.values.dropOffAddresses,
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

      await dispatch(updateJob(updatedJob)).unwrap()
      toast.success('Job successfully updated')
      handleSaveComplete()
    } catch (error) {
      console.error('Error updating job:', error)
      toast.error('Failed to update job')
    }
  }

  const formik = useFormik({
    initialValues: {
      createdBy: focusJob?.createdBy || '',
      jobTitle: focusJob?.jobTitle || '',
      jobType: focusJob?.jobType || '',
      customer: focusJob?.customer._id || '',
      employees: focusJob?.employees.map((e) => e._id) || [],
      pickUpAddresses: focusJob?.pickUpAddresses || [
        { address: '', details: '' },
      ],
      dropOffAddresses: focusJob?.dropOffAddresses || [
        { address: '', details: '' },
      ],
      jobDate: focusJob?.jobDate,
      jobStartTime: focusJob?.jobStartTime,
      jobComments: focusJob?.jobComments || '',
      estimateDate: focusJob?.estimateDate,
      estimateTime: focusJob?.estimateTime,
      estimateComments: focusJob?.estimateComments || '',
      billTo: focusJob?.billTo || '',
      billingSameAsCustomer: focusJob?.billingSameAsCustomer || false,
      paymentType: focusJob?.paymentType || '',
      isPaid: focusJob?.isPaid || false,
    },
    validationSchema,
  })

  const togglePaidStatus = () => {
    formik.setFieldValue('isPaid', !formik.values.isPaid)
  }

  const isUntouched =
    JSON.stringify(formik.values) === JSON.stringify(formik.initialValues)

  return (
    <>
      <Grid container spacing={4} sx={{ mb: 1 }}>
        <Grid size={{ xs: 6 }}>
          <Button
            size='small'
            startIcon={
              <SvgIcon>
                <KeyboardBackspaceOutlinedIcon />
              </SvgIcon>
            }
            onClick={handleToggleEdit}
          >
            Go Back
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Stack direction='row' justifyContent='flex-end' spacing={2}>
            <Button
              size='small'
              color='success'
              disabled={isUntouched}
              startIcon={
                <SvgIcon>
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
                <SvgIcon>
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
                  <Typography variant='h6' sx={{ marginTop: 1 }}>
                    Assign Employees
                  </Typography>
                  <EmployeeSelect
                    value={formik.values.employees}
                    onChange={(field, newValue) =>
                      formik.setFieldValue('employees', newValue)
                    }
                  />
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
