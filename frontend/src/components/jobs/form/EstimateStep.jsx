import PropTypes from 'prop-types'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import { Button, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import { QuillEditor } from 'src/components/quill-editor'

export const EstimateStep = (props) => {
  const { formik, onBack, onNext, isEdit = false, ...other } = props

  const handleChange = (field, value) => {
    formik.setFieldValue(field, value)
  }

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant='h6'>Estimate Date and Time</Typography>
      </div>
      <Stack alignItems='center' direction='row' spacing={3}>
        <MobileDatePicker
          name='estimateDate'
          label='Estimate Date'
          inputFormat='MM/dd/yyyy'
          onChange={(date) => handleChange('estimateDate', date)}
          renderInput={(inputProps) => <TextField {...inputProps} />}
          value={
            formik.values.estimateDate !== null
              ? formik.values.estimateDate
              : new Date()
          }
        />
        <MobileTimePicker
          name='estimateTime'
          label='Estimate Time'
          inputFormat='hh:mm aa'
          renderInput={(inputProps) => <TextField {...inputProps} />}
          onChange={(time) => handleChange('estimateTime', time)}
          value={
            formik.values.estimateTime !== null
              ? formik.values.estimateTime
              : new Date()
          }
        />
      </Stack>

      {/* <div>
        <Typography variant='h6'>Estimate comments, details, etc.</Typography>
      </div>
      <QuillEditor
        name='estimateComments'
        onChange={(value) => handleChange('estimateComments', value)}
        value={formik.values.estimateComments}
        placeholder=''
        modules={{
          clipboard: {
            matchVisual: false,
          },
        }}
        sx={{ height: 200 }}
      /> */}
      {!isEdit && (
        <Stack alignItems='center' direction='row' spacing={2}>
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
          <Button color='inherit' onClick={onBack}>
            Back
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

EstimateStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}
