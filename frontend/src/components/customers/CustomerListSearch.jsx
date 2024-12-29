import { useRef } from 'react'
import PropTypes from 'prop-types'
import YoutubeSearchedForOutlinedIcon from '@mui/icons-material/YoutubeSearchedForOutlined'
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  Button,
  TextField,
} from '@mui/material'

const sortOptions = [
  {
    label: 'Newest',
    value: 'Newest',
  },
  {
    label: 'Oldest',
    value: 'Oldest',
  },
]

export const CustomerListSearch = (props) => {
  const {
    setSortBy,
    sortBy,
    setSearchQuery,
    searchQuery,
    handleCustomerSearch,
    handleResetFilters,
  } = props

  const queryRef = useRef(null)

  const handleQueryChange = () => {
    handleCustomerSearch()
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  return (
    <>
      <Divider />
      <Stack
        alignItems='center'
        direction='row'
        flexWrap='wrap'
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box component='form' onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=''
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder='Search customers'
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            size='medium'
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon fontSize='small'>
                  <YoutubeSearchedForOutlinedIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField
          label='Sort By'
          name='sort'
          onChange={handleSortChange}
          value={sortBy}
          select
          SelectProps={{ native: true }}
          size='small'
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button
          variant='outlined'
          sx={{ marginLeft: 'auto' }}
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </Stack>
    </>
  )
}

CustomerListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string,
}
