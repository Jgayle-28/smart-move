import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import { Button, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import { QuillEditor } from 'src/components/quill-editor'

export const JobDetailsStep = (props) => {
  const { formik, onBack, onNext, isEdit = false, ...other } = props

  const handleChange = (field, value) => {
    formik.setFieldValue(field, value)
  }

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant='h6'>Job Title</Typography>
      </div>
      <TextField
        fullWidth
        label='Job Title'
        name='jobTitle'
        onChange={formik.handleChange}
        value={formik.values.jobTitle}
        onBlur={formik.handleBlur}
        error={!!(formik.touched.jobTitle && formik.errors.jobTitle)}
        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
        placeholder=''
      />
      <div>
        <Typography variant='h6'>Time & Date</Typography>
      </div>
      <Stack alignItems='center' direction='row' spacing={3}>
        <MobileDatePicker
          name='jobDate'
          label='Start Date'
          inputFormat='MM/dd/yyyy'
          onChange={(date) => handleChange('jobDate', date)}
          renderInput={(inputProps) => <TextField {...inputProps} />}
          value={
            formik.values.jobDate !== null ? formik.values.jobDate : new Date()
          }
        />
        <MobileTimePicker
          name='jobStartTime'
          label='Start Time'
          inputFormat='hh:mm aa'
          renderInput={(inputProps) => <TextField {...inputProps} />}
          onChange={(time) => handleChange('jobStartTime', time)}
          value={
            formik.values.jobStartTime !== null
              ? formik.values.jobStartTime
              : new Date()
          }
        />
      </Stack>

      <div>
        <Typography variant='h6'>
          Comments, details, items to be picked up or delivered, etc.
        </Typography>
      </div>
      <QuillEditor
        name='jobComments'
        onChange={(value) => handleChange('jobComments', value)}
        value={formik.values.jobComments}
        placeholder=''
        modules={{
          clipboard: {
            matchVisual: false,
          },
        }}
        sx={{ height: 200 }}
      />
      {!isEdit && (
        <Stack alignItems='center' direction='row' spacing={2}>
          <Button
            disabled={formik.values.jobTitle.length <= 6}
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            onClick={onNext}
            variant='contained'
          >
            Continue
          </Button>
          <Button color='inherit' onClick={onBack}>
            Back
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

JobDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}
