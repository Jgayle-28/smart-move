import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { debounce } from '@mui/material/utils'

const GOOGLE_MAPS_API_KEY = 'AIzaSyAJ-C4qRG1CBYj_DgZc89jWgZRchJX6Hq8'

function loadScript(src, position, id) {
  if (!position) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('async', '')
  script.setAttribute('id', id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

export default function AddressSelect({
  label = '',
  name = '',
  savedValue = null,
  onChange = () => {},
  onBlur = () => {},
  error = null,
  helperText = null,
  ...rest
}) {
  const [value, setValue] = React.useState(null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState([])
  const loaded = React.useRef(false)

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 400),
    []
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  const handleChange = (newValue) => {
    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue)
    // passed in function to update formik values -> need to pass in name
    onChange(name, newValue)
  }

  return (
    <Autocomplete
      value={value || savedValue}
      name={name}
      fullWidth
      id='google-map-demo'
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      disableAutoComplete
      autoComplete='new-address-off'
      includeInputInList
      filterSelectedOptions
      noOptionsText='No locations'
      onChange={(_, newValue) => {
        handleChange(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          autoComplete='new-address-off'
          disableAutoComplete
          label={label}
          name={name}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems='center'>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component='span'
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}

                <Typography variant='body2' color='text.secondary'>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
      {...rest}
    />
  )
}
