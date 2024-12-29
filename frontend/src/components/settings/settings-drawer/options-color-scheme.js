import PropTypes from 'prop-types'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { Chip, Stack, SvgIcon, Typography } from '@mui/material'

const options = [
  {
    label: 'Light',
    value: 'light',
    icon: (
      <SvgIcon fontSize='small'>
        <LightModeOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: (
      <SvgIcon fontSize='small'>
        <DarkModeOutlinedIcon />
      </SvgIcon>
    ),
  },
]

export const OptionsColorScheme = (props) => {
  const { onChange, value } = props

  return (
    <Stack spacing={1}>
      <Typography color='text.secondary' variant='overline'>
        Color Scheme
      </Typography>
      <Stack alignItems='center' direction='row' flexWrap='wrap' gap={2}>
        {options.map((option) => (
          <Chip
            icon={option.icon}
            key={option.value}
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

OptionsColorScheme.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOf(['light', 'dark']),
}
