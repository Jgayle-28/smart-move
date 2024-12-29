import { useCallback, useEffect, useMemo, useState } from 'react'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import {
  Avatar,
  Step,
  StepContent,
  StepLabel,
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

const initialValues = {
  jobTitle: '',
  jobType: 'move',
  customer: '',
  pickUpAddress: '',
  pickUpAddress2: '',
  dropOffAddress: '',
  dropOffAddress2: '',
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
    onSubmit: () => handleSubmit(),
  })

  const { user } = useSelector((state) => state.auth)

  const handleSubmit = () => {
    try {
      const newJob = {
        createdBy: user._id,
        company: user.company,
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
      }

      dispatch(addJob(newJob))
        .unwrap()
        .then((res) => {
          toast.success('Job successfully created')
          handleComplete()
        })
    } catch (error) {
      console.error('Error creating job')
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
        label: 'Job Type',
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
        content: <PaymentDetailStep formik={formik} onBack={handleBack} />,
      },
    ]
  }, [handleBack, handleNext, handleComplete, formik, selectedCustomer])

  if (isComplete) {
    return <JobPreview selectedCustomer={selectedCustomer} formik={formik} />
  }

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
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

          return (
            <Step key={step.label}>
              <StepLabel StepIconComponent={StepIcon}>
                <Typography sx={{ ml: 2 }} variant='overline'>
                  {step.label}
                </Typography>
              </StepLabel>
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
    </form>
  )
}
