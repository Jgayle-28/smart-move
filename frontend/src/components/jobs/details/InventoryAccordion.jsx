import { useState } from 'react'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import { Collapse, Stack, SvgIcon, Typography, Divider } from '@mui/material'

export default function InventoryAccordion({ room }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Stack
      onClick={() => setIsExpanded((prevState) => !prevState)}
      spacing={2}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        spacing={2}
        sx={{
          backgroundColor: (theme) =>
            isExpanded
              ? theme.palette.mode === 'dark'
                ? theme.palette.neutral[800]
                : theme.palette.neutral[50]
              : '',
          color: (theme) =>
            isExpanded
              ? theme.palette.mode === 'dark'
                ? theme.palette.neutral[400]
                : theme.palette.neutral[700]
              : '',
          borderRadius: '2px',
          px: isExpanded ? 2 : '',
          py: isExpanded ? 1.5 : '',
        }}
      >
        <Typography variant='body2'>{room?.roomName}</Typography>
        <SvgIcon>
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </SvgIcon>
      </Stack>
      <Collapse in={isExpanded}>
        <Stack
          divider={<Divider />}
          spacing={1}
          direction='column'
          sx={{ px: 2 }}
        >
          {room?.items?.map((item, index) => (
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='space-between'
              spacing={2}
              sx={{ '&:last-child': { mb: 2 } }}
            >
              <Typography variant='body2'>{item?.name}</Typography>
              <Typography variant='body2'>{item?.itemAmt}</Typography>
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}
