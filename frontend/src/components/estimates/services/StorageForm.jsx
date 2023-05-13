import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Box,
  Typography,
} from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import { Scrollbar } from 'src/components/scrollbar'
import { Tip } from 'src/components/tip'

function StorageForm() {
  return (
    <>
      <Box>
        <Scrollbar
          sx={{
            height: 400,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Tip message='Use this section to calculate storage costs' />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Item Name'
                name='storageItemName'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Item Quantity'
                name='storageItemGty'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Item Rate'
                name='storageItemRate'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Days In Storage'
                name='storageItemTime'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Item Amount'
                name='storageItemAmt'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={2}>
              <Button variant='contained'>Add</Button>
            </Grid>
            <Grid xs={12} md={12}>
              <Typography variant='h6'>Storage List</Typography>
            </Grid>
          </Grid>
        </Scrollbar>
      </Box>
    </>
  )
}

export default StorageForm
