import React, { useState } from 'react'
import {
  TextField,
  FormControl,
  Checkbox,
  Typography,
  Grid,
  Select,
  MenuItem,
  ListItemText,
  Chip,
} from '@mui/material'
import { daysOfWeek, statusOptions } from 'src/constants/employees'

const EmployeeForm = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          type='email'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Address'
          name='address'
          value={formData.address}
          onChange={handleChange}
          type='tel'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Phone Number'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          type='tel'
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          fullWidth
          label='Status'
          name='status'
          value={formData.status}
          onChange={handleChange}
          required
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Comments'
          name='comments'
          value={formData.comments}
          onChange={handleChange}
          multiline
          rows={3}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' gutterBottom sx={{ marginBottom: 2 }}>
          Days Available
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId='days-available-label'
            name='daysAvailable'
            multiple
            value={formData.daysAvailable}
            onChange={handleChange}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} color='primary' />
                ))}
              </div>
            )}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={formData.daysAvailable.includes(day)} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default EmployeeForm
