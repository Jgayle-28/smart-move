import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  Box,
  Chip,
  Divider,
  Input,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import { MultiSelect } from 'src/components/multi-select'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { categoryOptions, statusOptions } from 'src/constants/job-constants'

export const JobListSearch = (props) => {
  const {
    handleFilterJobs,
    onFiltersChange,
    setSearchQuery,
    handleResetFilters,
    searchDate,
    ...other
  } = props
  const queryRef = useRef(null)
  const [query, setQuery] = useState('')
  const [chips, setChips] = useState([])

  const handleChipsUpdate = useCallback(() => {
    const filters = {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
      searchDate: searchDate ? searchDate : null,
    }

    chips.forEach((chip) => {
      switch (chip.field) {
        case 'name':
          // There will (or should) be only one chips with field "name"
          // so we can set up it directly
          filters.name = chip.value
          break
        case 'category':
          filters.category.push(chip.value)
          break
        case 'status':
          filters.status.push(chip.value)
          break
        case 'inStock':
          // The value can be "available" or "outOfStock" and we transform it to a boolean
          filters.inStock = chip.value === 'available'
          break
        default:
          break
      }
    })

    onFiltersChange?.(filters)
    handleFilterJobs()
  }, [chips, onFiltersChange])

  useEffect(() => {
    handleChipsUpdate()
  }, [chips, handleChipsUpdate])

  const handleChipDelete = useCallback((deletedChip) => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => {
        // There can exist multiple chips for the same field.
        // Filter them by value.

        return !(
          deletedChip.field === chip.field && deletedChip.value === chip.value
        )
      })
    })
  }, [])

  const handleQueryChange = useCallback((event) => {
    // Set Local state
    event.preventDefault()
    setQuery(queryRef.current?.value || '')
    // Update filters
    const filters = {
      name: queryRef.current?.value || '',
      category: [],
      status: [],
      inStock: undefined,
      searchDate: searchDate ? searchDate : null,
    }
    onFiltersChange?.(filters)
    // Update search query
    setSearchQuery(queryRef.current?.value || '')
  }, [])

  const handleDateChange = useCallback((date) => {
    const filters = {
      name: queryRef.current?.value || '',
      category: [],
      status: [],
      inStock: undefined,
      searchDate: date,
    }
    onFiltersChange?.(filters)
  }, [])

  const handleCategoryChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = []

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'category') {
          return true
        }

        const found = values.includes(chip.value)

        if (found) {
          valuesFound.push(chip.value)
        }

        return found
      })

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = categoryOptions.find(
            (option) => option.value === value
          )

          newChips.push({
            label: 'Category',
            field: 'category',
            value,
            displayValue: option.label,
          })
        }
      })

      return newChips
    })
  }, [])

  const handleStatusChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = []

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== 'status') {
          return true
        }

        const found = values.includes(chip.value)

        if (found) {
          valuesFound.push(chip.value)
        }

        return found
      })

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = statusOptions.find((option) => option.value === value)

          newChips.push({
            label: 'Status',
            field: 'status',
            value,
            displayValue: option.label,
          })
        }
      })

      return newChips
    })
  }, [])

  const handleFiltersReset = useCallback(() => {
    setChips([])
    handleResetFilters()
  }, [])

  // We memoize this part to prevent re-render issues
  const categoryValues = useMemo(
    () =>
      chips
        .filter((chip) => chip.field === 'category')
        .map((chip) => chip.value),
    [chips]
  )

  const statusValues = useMemo(
    () =>
      chips.filter((chip) => chip.field === 'status').map((chip) => chip.value),
    [chips]
  )

  const showChips = chips.length > 0

  return (
    <div {...other}>
      <Stack
        alignItems='center'
        component='form'
        direction='row'
        onSubmit={handleQueryChange}
        spacing={2}
        sx={{ p: 2 }}
      >
        <SvgIcon fontSize='small'>
          <SearchOutlinedIcon />
        </SvgIcon>
        <Input
          disableUnderline
          fullWidth
          inputProps={{ ref: queryRef }}
          placeholder='Search by customer name'
          sx={{ flexGrow: 1 }}
          value={query}
          onChange={handleQueryChange}
        />
      </Stack>
      <Divider />
      {showChips ? (
        <Stack
          alignItems='center'
          direction='row'
          flexWrap='wrap'
          gap={1}
          sx={{ p: 2 }}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    '& span': {
                      fontWeight: 600,
                    },
                  }}
                >
                  <>
                    <span>{chip.label}</span>: {chip.displayValue || chip.value}
                  </>
                </Box>
              }
              onDelete={() => handleChipDelete(chip)}
              variant='outlined'
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2.5 }}>
          <Typography color='text.secondary' variant='subtitle2'>
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        alignItems='center'
        justifyContent='space-between'
        direction='row'
        flexWrap='wrap'
        spacing={1}
        sx={{ p: 1 }}
      >
        <Stack alignItems='center' direction='row' flexWrap='wrap' spacing={1}>
          <MultiSelect
            label='Category'
            onChange={handleCategoryChange}
            options={categoryOptions}
            value={categoryValues}
          />
          <MultiSelect
            label='Status'
            onChange={handleStatusChange}
            options={statusOptions}
            value={statusValues}
          />
          <MobileDatePicker
            name='packDate'
            label='Filter By Date'
            inputFormat='MM/dd/yyyy'
            onChange={handleDateChange}
            renderInput={(inputProps) => (
              <TextField {...inputProps} size='small' />
            )}
            value={searchDate}
          />
        </Stack>
        <Button
          variant='outlined'
          sx={{ marginLeft: 'auto' }}
          onClick={handleFiltersReset}
        >
          Reset Filters
        </Button>
      </Stack>
    </div>
  )
}

JobListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
}
