import PropTypes from 'prop-types'
import FormatIndentDecreaseOutlinedIcon from '@mui/icons-material/FormatIndentDecreaseOutlined'
import FormatIndentIncreaseOutlinedIcon from '@mui/icons-material/FormatIndentIncreaseOutlined'
import { Chip, Stack, SvgIcon, Typography } from '@mui/material'

const options = [
  {
    label: 'Left-to-right',
    value: 'ltr',
    icon: (
      <SvgIcon fontSize='small'>
        <FormatIndentDecreaseOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    label: 'Right-to-left',
    value: 'rtl',
    icon: (
      <SvgIcon fontSize='small'>
        <FormatIndentIncreaseOutlinedIcon />
      </SvgIcon>
    ),
  },
]

export const OptionsDirection = (props) => {
  const { onChange, value } = props

  return (
    <Stack spacing={1}>
      <Typography color='text.secondary' variant='overline'>
        Orientation
      </Typography>
      <Stack alignItems='center' direction='row' flexWrap='wrap' gap={2}>
        {options.map((option) => (
          <Chip
            icon={option.icon}
            key={option.label}
            label={option.label}
            onClick={() => onChange?.(option.value)}
            sx={{
              borderColor: 'transparent',
              borderRadius: 1.5,
              borderStyle: 'solid',
              borderWidth: 2,
              ...(option.value === value && {
                borderColor: 'primary.main',
              }),
            }}
          />
        ))}
      </Stack>
    </Stack>
  )
}

OptionsDirection.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOf(['ltr', 'rtl']),
}
