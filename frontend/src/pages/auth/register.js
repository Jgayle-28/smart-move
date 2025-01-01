import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, SvgIcon, Typography } from '@mui/material'
import { Logo } from 'src/components/logo'
import { RouterLink } from 'src/components/router-link'
import { paths } from 'src/paths'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import CreateUserForm from 'src/components/auth/forms/CreateUserForm'
import CreateCompanyForm from 'src/components/auth/forms/CreateCompanyForm'
import UserContent from 'src/components/auth/form-content/UserContent'
import CompanyContent from 'src/components/auth/form-content/CompanyContent'
import PaymentForm from 'src/components/auth/forms/PaymentForm'
import { useLocation } from 'react-router-dom'

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const location = useLocation()
  const { state } = location

  const getCurrentFormContent = () => {
    switch (currentStep) {
      case 1:
        return <UserContent />
      case 2:
        return <CompanyContent />
      default:
        return <UserContent />
    }
  }

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return <CreateUserForm creationCallback={setCurrentStep} />
      case 2:
        return <CreateCompanyForm creationCallback={setCurrentStep} />
      case 3:
        return (
          <PaymentForm
            creationCallback={setCurrentStep}
            plan={state.plan}
            isYearly={state.isYearly}
          />
        )
      default:
        return <CreateUserForm creationCallback={setCurrentStep} />
    }
  }
  const getStepColor = (step) => {
    if (step === 2) {
      return currentStep >= 2 ? 'text.primary' : 'text.disabled'
    }
    if (step === 3) {
      return currentStep >= 3 ? 'text.primary' : 'text.disabled'
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
      }}
    >
      {/* Form Content // left side */}
      {getCurrentFormContent()}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flex: {
            xs: '1 1 auto',
            md: '0 0 auto',
          },
          flexDirection: 'column',
          justifyContent: {
            md: 'center',
          },
          maxWidth: '100%',
          p: {
            xs: 4,
            md: 8,
          },
          width: {
            md: 600,
          },
        }}
      >
        <div>
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems='center'
              component={RouterLink}
              direction='row'
              display='inline-flex'
              href={paths.index}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  height: 24,
                  width: 24,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  lineHeight: 2.5,
                  '& span': {
                    color: 'primary.main',
                  },
                }}
              >
                Deliverly <span>PRO</span>
              </Box>
            </Stack>
          </Box>
          <Stack sx={{ mb: 4 }} spacing={1}>
            <Typography variant='h5'>Register</Typography>
            <Typography color='text.secondary' variant='body2'>
              Already have an account?{' '}
              <RouterLink to={paths.auth.login} variant='subtitle2'>
                Login
              </RouterLink>
            </Typography>
          </Stack>
          <Stack
            alignItems='center'
            direction='row'
            display='flex'
            spacing={1}
            sx={{ textDecoration: 'none' }}
          >
            <Typography color='text.primary'>User Info </Typography>{' '}
            <SvgIcon color='text.primary'>
              <ArrowRightAltIcon
                sx={{
                  color: 'text.primary',
                }}
              />
            </SvgIcon>
            <Typography color={getStepColor(2)}>Company Info </Typography>
            <SvgIcon>
              <ArrowRightAltIcon
                sx={{
                  color: getStepColor(2),
                }}
              />
            </SvgIcon>
            <Typography color={getStepColor(3)}>Payment</Typography>
          </Stack>
          {/* Form // right Side */}
          {getCurrentForm()}
        </div>
      </Box>
    </Box>
  )
}
export default RegisterPage
RegisterPage.propTypes = {
  children: PropTypes.node,
}
