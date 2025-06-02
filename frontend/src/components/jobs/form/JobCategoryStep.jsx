import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { Button, Card, Radio, Stack, SvgIcon, Typography } from '@mui/material'
import EmployeeSelect from 'src/components/shared/EmployeeSelect'
import { useSelector } from 'react-redux'

const categoryOptions = [
  {
    description: 'House, apartment, business, misc.',
    title: 'Move',
    value: 'move',
  },
  {
    description: 'One time or scheduled deliveries',
    title: 'Delivery',
    value: 'delivery',
  },
  {
    description: 'For small jobs and Jobs that do not originate in house',
    title: 'Pick Up and Drop Off',
    value: 'pu_do',
  },
  {
    description: 'Anything that might come up.',
    title: 'Other',
    value: 'other',
  },
]

export const JobCategoryStep = (props) => {
  const { formik, onBack, onNext, ...other } = props
  const [category, setCategory] = useState(formik.values.jobType)
  const { employees } = useSelector((state) => state.employees)

  const handleCategoryChange = useCallback((category) => {
    setCategory(category)
    formik.setFieldValue('jobType', category)
  }, [])

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant='h6'>
          What type of job would you like to create...
        </Typography>
      </div>
      <Stack spacing={2}>
        {categoryOptions.map((option) => (
          <Card
            name='jobType'
            key={option.value}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              ...(category === option.value && {
                backgroundColor: 'primary.alpha12',
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={() => handleCategoryChange(option.value)}
            variant='outlined'
          >
            <Stack direction='row' spacing={2}>
              <Radio checked={category === option.value} color='primary' />
              <div>
                <Typography variant='subtitle1'>{option.title}</Typography>
                <Typography color='text.secondary' variant='body2'>
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
      {employees?.length > 0 && (
        <>
          <Typography variant='h6' sx={{ marginTop: 1 }}>
            Assign Employees
          </Typography>
          <EmployeeSelect
            value={formik.values.employees}
            onChange={(field, newValue) =>
              formik.setFieldValue('employees', newValue)
            }
          />
        </>
      )}

      <div>
        <Button
          endIcon={
            <SvgIcon fontSize='small'>
              <ArrowRightAltOutlinedIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant='contained'
        >
          Continue
        </Button>
      </div>
    </Stack>
  )
}

JobCategoryStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}
