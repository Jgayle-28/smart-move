import { useCallback, useEffect, useMemo, useState } from 'react'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import {
  Avatar,
  Step,
  StepButton,
  StepContent,
  Stepper,
  SvgIcon,
  Typography,
} from '@mui/material'
import { JobCategoryStep } from './JobCategoryStep'
import { JobDetailsStep } from './JobDetailsStep'
import { CustomerDetailsStep } from './CustomerDetailsStep'
import { PaymentDetailStep } from './PaymentDetailStep'
import { JobPreview } from './JobPreview'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { addJob, clearCreatedJob } from 'src/store/jobs/jobSlice'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { EstimateStep } from './EstimateStep'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const initialValues = {
  jobTitle: '',
  jobType: 'move',
  customer: '',
  employees: [],
  pickUpAddresses: [{ address: '', details: '' }],
  dropOffAddresses: [{ address: '', details: '' }],
  estimateDate: null,
  estimateTime: null,
  estimateComments: '',
  jobDate: null,
  jobStartTime: null,
  jobComments: '',
  billTo: '',
  billingSameAsCustomer: false,
  paymentType: '',
}

const validationSchema = Yup.object({
  customer: Yup.string().min(7).required('Customer is required'),
  // pickUpAddress: Yup.string().min(7).required('Pickup address is required'),
  jobTitle: Yup.string().min(7).required('You must enter a job title.'),
})

const StepIcon = (props) => {
  const { active, completed, icon } = props

  const highlight = active || completed

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }),
      }}
      variant='rounded'
    >
      {completed ? (
        <SvgIcon fontSize='small'>
          <CheckOutlinedIcon />
        </SvgIcon>
      ) : (
        icon
      )}
    </Avatar>
  )
}

export const JobCreateForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState('')

  const dispatch = useDispatch()
  const location = useLocation()
  const { state } = location

  useEffect(() => {
    return () => {
      dispatch(clearCreatedJob())
    }
  }, [])

  // If the user just created a customer, we want to pre-populate the customer select field
  useEffect(() => {
    if (state?.customer) {
      initialValues.customer = state?.customer?._id
      setSelectedCustomer(state?.customer.customerName)
    }
  }, [state?.customer])

  const formik = useFormik({
    initialValues,
    validationSchema,
  })

  const { user } = useSelector((state) => state.auth)
  const canJumpAll =
    formik?.values?.customer?.length > 0 && formik?.values?.jobTitle?.length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('in submit')
    try {
      const newJob = {
        createdBy: user._id,
        company: user.company,
        jobTitle: formik.values.jobTitle,
        jobType: formik.values.jobType,
        customer: formik.values.customer,
        employees: formik.values.employees,
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
      }

      await dispatch(addJob(newJob)).unwrap()
      toast.success('Job successfully created')
      handleComplete()
    } catch (error) {
      console.error('Error creating job:', error)
      toast.error('Failed to create job')
    }
  }

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1)
  }, [])

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1)
  }, [])

  const handleComplete = useCallback(() => {
    setIsComplete(true)
  }, [])

  const steps = useMemo(() => {
    return [
      {
        label: 'Job Details & Employee Assignment',
        content: (
          <JobCategoryStep
            formik={formik}
            onBack={handleBack}
            onNext={handleNext}
          />
        ),
      },
      {
        label: 'Customer Details',
        content: (
          <CustomerDetailsStep
            formik={formik}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            onBack={handleBack}
            onNext={handleNext}
          />
        ),
      },
      {
        label: 'Job Details',
        content: (
          <JobDetailsStep
            formik={formik}
            onBack={handleBack}
            onNext={handleNext}
          />
        ),
      },
      {
        label: 'Estimate Details',
        content: (
          <EstimateStep
            formik={formik}
            onBack={handleBack}
            onNext={handleNext}
          />
        ),
      },
      {
        label: 'Payment Details',
        content: (
          <PaymentDetailStep
            formik={formik}
            onBack={handleBack}
            handleSubmit={handleSubmit}
          />
        ),
      },
    ]
  }, [handleBack, handleNext, handleComplete, formik, selectedCustomer])

  if (isComplete) {
    return <JobPreview selectedCustomer={selectedCustomer} formik={formik} />
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      noValidate
      onSubmit={handleSubmit}
    >
      <Stepper
        activeStep={activeStep}
        orientation='vertical'
        sx={{
          '& .MuiStepConnector-line': {
            borderLeftColor: 'divider',
            borderLeftWidth: 2,
            ml: 1,
          },
        }}
      >
        {steps.map((step, index) => {
          const isCurrentStep = activeStep === index
          const isClickable = canJumpAll || index < activeStep

          return (
            <Step key={step.label}>
              <StepButton
                StepIconComponent={StepIcon}
                onClick={() => isClickable && setActiveStep(index)}
                disabled={!isClickable} // disable current & future
                sx={{ ml: 2, cursor: isClickable ? 'pointer' : 'default' }}
              >
                <Typography variant='overline'>{step.label}</Typography>
              </StepButton>
              <StepContent
                sx={{
                  borderLeftColor: 'divider',
                  borderLeftWidth: 2,
                  ml: '20px',
                  ...(isCurrentStep && {
                    py: 4,
                  }),
                }}
              >
                {step.content}
              </StepContent>
            </Step>
          )
        })}
      </Stepper>
    </motion.form>
  )
}
