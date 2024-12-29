import { useRef } from 'react'
import PropTypes from 'prop-types'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  Box,
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

export const EstimateListSearch = (props) => {
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
    <div>
      <Stack
        alignItems='center'
        direction='row'
        flexWrap='wrap'
        gap={3}
        sx={{ p: 3 }}
      >
        <Box component='form' onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=''
            fullWidth
            inputProps={{ ref: queryRef }}
            name='orderNumber'
            placeholder='Search by customer name'
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            startAdornment={
              <InputAdornment position='start'>
                <SvgIcon fontSize='small'>
                  <SearchOutlinedIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField
          label='Sort By'
          name='sort'
          select
          SelectProps={{ native: true }}
          onChange={handleSortChange}
          value={sortBy}
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
    </div>
  )
}

EstimateListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string,
}
