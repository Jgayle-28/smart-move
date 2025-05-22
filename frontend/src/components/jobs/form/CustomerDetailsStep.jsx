import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import CustomerSelect from 'src/components/shared/CustomerSelect'

export const CustomerDetailsStep = ({
  formik,
  selectedCustomer = '',
  setSelectedCustomer,
  onBack = () => {},
  onNext = () => {},
  isEdit = false,
  ...other
}) => {
  const handleAddAddress = (type) => {
    if (formik.values[type].length < 5) {
      formik.setFieldValue(type, [
        ...formik.values[type],
        { address: '', details: '' },
      ])
    }
  }

  const handleRemoveAddress = (type, index) => {
    const updatedAddresses = formik.values[type].filter(
      (_, idx) => idx !== index
    )
    formik.setFieldValue(type, updatedAddresses)
  }

  const handleAddressChange = (type, index, field, value) => {
    const updatedAddresses = [...formik.values[type]]
    updatedAddresses[index][field] = value
    formik.setFieldValue(type, updatedAddresses)
  }

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant='h6'>Select Customer</Typography>
      </div>
      <CustomerSelect
        isEdit={true}
        value={formik.values.customer}
        onChange={formik.setFieldValue}
        error={!!(formik.touched.customer && formik.errors.customer)}
        helperText={formik.touched.customer && formik.errors.customer}
        onBlur={formik.handleBlur}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
      <Box sx={{ paddingTop: 2 }}>
        <Typography variant='h6'>Pickup & Drop Off Locations</Typography>
      </Box>

      {/* Pickup Addresses */}
      <Stack spacing={2}>
        <Typography variant='subtitle2'>Pickup Addresses</Typography>
        {formik.values.pickUpAddresses.map((address, index) => (
          <Stack key={index} spacing={1} direction='row'>
            <TextField
              fullWidth
              size='small'
              label={`Pickup Address ${index + 1}`}
              value={address.address}
              onChange={(e) =>
                handleAddressChange(
                  'pickUpAddresses',
                  index,
                  'address',
                  e.target.value
                )
              }
            />
            {/* <TextField
              fullWidth
              label='Details'
              value={address.details}
              onChange={(e) =>
                handleAddressChange(
                  'pickUpAddresses',
                  index,
                  'details',
                  e.target.value
                )
              }
            />*/}
            {index !== 0 && (
              <IconButton
                size='small'
                onClick={() => handleRemoveAddress('pickUpAddresses', index)}
              >
                <Remove />
              </IconButton>
            )}
          </Stack>
        ))}
        {formik.values.pickUpAddresses.length < 5 && (
          <Button
            onClick={() => handleAddAddress('pickUpAddresses')}
            startIcon={<Add />}
          >
            Add Pickup Address
          </Button>
        )}
      </Stack>

      {/* Drop Off Addresses */}
      <Stack spacing={2}>
        <Typography variant='subtitle2'>Drop Off Addresses</Typography>
        {formik.values.dropOffAddresses.map((address, index) => (
          <Stack key={index} spacing={1} direction='row'>
            <TextField
              fullWidth
              size='small'
              label={`Drop Off Address ${index + 1}`}
              value={address.address}
              onChange={(e) =>
                handleAddressChange(
                  'dropOffAddresses',
                  index,
                  'address',
                  e.target.value
                )
              }
            />
            {/* <Stack direction='row' spacing={2}>
            <TextField
              fullWidth
              size='small'
              label='Details'
              value={address.details}
              onChange={(e) =>
                handleAddressChange(
                  'dropOffAddresses',
                  index,
                  'details',
                  e.target.value
                )
              }
            />
            </Stack> */}
            {index !== 0 && (
              <IconButton
                size='small'
                onClick={() => handleRemoveAddress('dropOffAddresses', index)}
              >
                <Remove fontSize='small' />
              </IconButton>
            )}
          </Stack>
        ))}
        {formik.values.dropOffAddresses.length < 5 && (
          <Button
            size='small'
            onClick={() => handleAddAddress('dropOffAddresses')}
            startIcon={<Add />}
          >
            Add Drop Off Address
          </Button>
        )}
      </Stack>

      {!isEdit && (
        <Stack direction='row' spacing={2}>
          <Button onClick={onBack}>Back</Button>
          <Button
            onClick={onNext}
            variant='contained'
            disabled={formik?.values?.customer?.length === 0}
          >
            Continue
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

CustomerDetailsStep.propTypes = {
  formik: PropTypes.object.isRequired,
  selectedCustomer: PropTypes.string,
  setSelectedCustomer: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  isEdit: PropTypes.bool,
}

// import { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
// import {
//   Button,
//   IconButton,
//   Stack,
//   SvgIcon,
//   TextField,
//   Tooltip,
//   Typography,
// } from '@mui/material'
// import { Add, Remove } from '@mui/icons-material'
// import CustomerSelect from 'src/components/shared/CustomerSelect'
// import CustomerEditAddresses from './CustomerEditAddresses'
// // import AddressSelect from 'src/components/shared/AddressSelect'

// export const CustomerDetailsStep = (props) => {
//   const {
//     formik,
//     selectedCustomer = '',
//     setSelectedCustomer,
//     onBack = () => {},
//     onNext = () => {},
//     isEdit = false,
//     ...other
//   } = props

//   const [showSecondAddress, setShowSecondAddress] = useState(false)
//   const [showSecondDropOffAddress, setShowSecondDropOffAddress] =
//     useState(false)
//   const [showThirdAddress, setShowThirdAddress] = useState(false)
//   const [showThirdDropOffAddress, setShowThirdDropOffAddress] = useState(false)

//   useEffect(() => {
//     // Toggle visibility of pickup/drop-off addresses if values exist in formik
//     if (formik.values.pickUpAddress2) {
//       setShowSecondAddress(true)
//     }
//     if (formik.values.pickUpAddress3) {
//       setShowThirdAddress(true)
//     }
//     if (formik.values.dropOffAddress2) {
//       setShowSecondDropOffAddress(true)
//     }
//     if (formik.values.dropOffAddress3) {
//       setShowThirdDropOffAddress(true)
//     }
//   }, [
//     formik.values.pickUpAddress2,
//     formik.values.pickUpAddress3,
//     formik.values.dropOffAddress2,
//     formik.values.dropOffAddress3,
//   ])

//   const handleToggleSecondAddress = () => {
//     setShowSecondAddress((prevState) => {
//       if (prevState) {
//         // Clear the value in formik when toggling off
//         formik.setFieldValue('pickUpAddress2', '')
//       }
//       return !prevState
//     })
//   }

//   const handleToggleThirdAddress = () => {
//     setShowThirdAddress((prevState) => {
//       if (prevState) {
//         // Clear the value in formik when toggling off
//         formik.setFieldValue('pickUpAddress3', '')
//       }
//       return !prevState
//     })
//   }

//   const handleToggleSecondDropAddress = () => {
//     setShowSecondDropOffAddress((prevState) => {
//       if (prevState) {
//         // Clear the value in formik when toggling off
//         formik.setFieldValue('dropOffAddress2', '')
//       }
//       return !prevState
//     })
//   }

//   const handleToggleThirdDropAddress = () => {
//     setShowThirdDropOffAddress((prevState) => {
//       if (prevState) {
//         // Clear the value in formik when toggling off
//         formik.setFieldValue('dropOffAddress3', '')
//       }
//       return !prevState
//     })
//   }

//   const handleAddressChange = (name, newValue) => {
//     formik.setFieldValue(name, newValue)
//   }

//   return (
//     <Stack spacing={3} {...other}>
//       <div>
//         <Typography variant='h6'>Select Customer</Typography>
//       </div>
//       <CustomerSelect
//         isEdit={true}
//         value={formik.values.customer}
//         onChange={formik.setFieldValue}
//         error={!!(formik.touched.customer && formik.errors.customer)}
//         helperText={formik.touched.customer && formik.errors.customer}
//         onBlur={formik.handleBlur}
//         selectedCustomer={selectedCustomer}
//         setSelectedCustomer={setSelectedCustomer}
//       />
//       <div>
//         <Typography variant='h6'>Pickup & Drop Off Locations</Typography>
//       </div>

//       <>
//         <Stack spacing={2}>
//           {/*---------- PU Address ----------*/}
//           <Stack spacing={1} direction='row'>
//             <TextField
//               fullWidth
//               label='Pickup Address'
//               name='pickUpAddress'
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               value={formik.values.pickUpAddress}
//               error={
//                 !!(formik.touched.pickUpAddress && formik.errors.pickUpAddress)
//               }
//               helperText={
//                 formik.touched.pickUpAddress && formik.errors.pickUpAddress
//               }
//             />
//             {/* <AddressSelect
//             label='Pickup Address'
//             name='pickUpAddress'
//             onChange={handleAddressChange}
//             onBlur={formik.handleBlur}
//             error={
//               !!(formik.touched.pickUpAddress && formik.errors.pickUpAddress)
//             }
//             helperText={
//               formik.touched.pickUpAddress && formik.errors.pickUpAddress
//             }
//             savedValue={formik.values.pickUpAddress}
//           /> */}
//             {!showSecondAddress && (
//               <Tooltip title='Add second pickup address'>
//                 <IconButton
//                   size='small'
//                   color='primary'
//                   sx={{ display: 'block' }}
//                   onClick={handleToggleSecondAddress}
//                   disableRipple
//                 >
//                   <SvgIcon fontSize='small'>
//                     <Add />
//                   </SvgIcon>
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Stack>
//           {/*---------- PU Address 2 ----------*/}
//           {showSecondAddress && (
//             <Stack spacing={1} direction='row'>
//               <TextField
//                 fullWidth
//                 label='Second Pickup Address'
//                 name='pickUpAddress2'
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.pickUpAddress2}
//                 error={
//                   !!(
//                     formik.touched.pickUpAddress2 &&
//                     formik.errors.pickUpAddress2
//                   )
//                 }
//                 helperText={
//                   formik.touched.pickUpAddress2 && formik.errors.pickUpAddress2
//                 }
//               />
//               {/* <AddressSelect
//               label='Second Pickup Address'
//               name='pickUpAddress2'
//               onChange={handleAddressChange}
//               onBlur={formik.handleBlur}
//               savedValue={formik.values.pickUpAddress2}
//             /> */}
//               <Stack spacing={1} direction='row'>
//                 <Tooltip title='Remove second pickup address'>
//                   <IconButton
//                     size='small'
//                     color='primary'
//                     onClick={handleToggleSecondAddress}
//                     disableRipple
//                   >
//                     <SvgIcon fontSize='small'>
//                       <Remove />
//                     </SvgIcon>
//                   </IconButton>
//                 </Tooltip>
//               </Stack>
//               {!showThirdAddress && (
//                 <Tooltip title='Add third pickup address'>
//                   <IconButton
//                     size='small'
//                     color='primary'
//                     onClick={handleToggleThirdAddress}
//                     disableRipple
//                   >
//                     <SvgIcon fontSize='small'>
//                       <Add />
//                     </SvgIcon>
//                   </IconButton>
//                 </Tooltip>
//               )}
//             </Stack>
//           )}
//           {/*---------- PU Address 3 ----------*/}
//           {showThirdAddress && (
//             <Stack spacing={1} direction='row'>
//               <TextField
//                 fullWidth
//                 label='Third Pickup Address'
//                 name='pickUpAddress3'
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.pickUpAddress3}
//                 error={
//                   !!(
//                     formik.touched.pickUpAddress3 &&
//                     formik.errors.pickUpAddress3
//                   )
//                 }
//                 helperText={
//                   formik.touched.pickUpAddress3 && formik.errors.pickUpAddress3
//                 }
//               />
//               {/* <AddressSelect
//               label='Second Pickup Address'
//               name='pickUpAddress2'
//               onChange={handleAddressChange}
//               onBlur={formik.handleBlur}
//               savedValue={formik.values.pickUpAddress2}
//             /> */}
//               <Tooltip title='Remove second pickup address'>
//                 <IconButton
//                   size='small'
//                   color='primary'
//                   sx={{ display: 'block' }}
//                   onClick={handleToggleThirdAddress}
//                   disableRipple
//                 >
//                   <SvgIcon fontSize='small'>
//                     <Remove />
//                   </SvgIcon>
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           )}
//           {/*---------- DO Address ----------*/}
//           <Stack spacing={1} direction='row'>
//             <TextField
//               fullWidth
//               label='Drop Off Address'
//               name='dropOffAddress'
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               value={formik.values.dropOffAddress}
//             />
//             {/* <AddressSelect
//             label='Drop Off Address'
//             name='dropOffAddress'
//             onChange={handleAddressChange}
//             onBlur={formik.handleBlur}
//             savedValue={formik.values.dropOffAddress}
//           /> */}
//             {!showSecondDropOffAddress && (
//               <Tooltip title='Add second pickup address'>
//                 <IconButton
//                   size='small'
//                   color='primary'
//                   sx={{ display: 'block' }}
//                   onClick={handleToggleSecondDropAddress}
//                   disableRipple
//                 >
//                   <SvgIcon fontSize='small'>
//                     <Add />
//                   </SvgIcon>
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Stack>
//           {/*---------- DO Address 2 ----------*/}
//           {showSecondDropOffAddress && (
//             <Stack spacing={1} direction='row'>
//               <TextField
//                 fullWidth
//                 label='Second Drop Off Address'
//                 name='dropOffAddress2'
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.dropOffAddress2}
//               />
//               {/* <AddressSelect
//               label='Second Drop Off Address'
//               name='dropOffAddress2'
//               onChange={handleAddressChange}
//               onBlur={formik.handleBlur}
//               savedValue={formik.values.dropOffAddress2}
//             /> */}
//               <Stack spacing={1} direction='row'>
//                 <Tooltip title='Remove second drop off address'>
//                   <IconButton
//                     size='small'
//                     color='primary'
//                     sx={{ display: 'block' }}
//                     onClick={handleToggleSecondDropAddress}
//                     disableRipple
//                   >
//                     <SvgIcon fontSize='small'>
//                       <Remove />
//                     </SvgIcon>
//                   </IconButton>
//                 </Tooltip>
//                 {!showThirdDropOffAddress && (
//                   <Tooltip title='Add second pickup address'>
//                     <IconButton
//                       size='small'
//                       color='primary'
//                       onClick={handleToggleThirdDropAddress}
//                       disableRipple
//                     >
//                       <SvgIcon fontSize='small'>
//                         <Add />
//                       </SvgIcon>
//                     </IconButton>
//                   </Tooltip>
//                 )}
//               </Stack>
//             </Stack>
//           )}
//           {/*---------- DO Address 3 ----------*/}
//           {showThirdDropOffAddress && (
//             <Stack spacing={1} direction='row'>
//               <TextField
//                 fullWidth
//                 label='Third Drop Off Address'
//                 name='dropOffAddress3'
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.dropOffAddress3}
//               />
//               {/* <AddressSelect
//               label='Second Drop Off Address'
//               name='dropOffAddress2'
//               onChange={handleAddressChange}
//               onBlur={formik.handleBlur}
//               savedValue={formik.values.dropOffAddress2}
//             /> */}
//               <Tooltip title='Remove third drop off address'>
//                 <IconButton
//                   size='small'
//                   color='primary'
//                   onClick={handleToggleThirdDropAddress}
//                   disableRipple
//                 >
//                   <SvgIcon fontSize='small'>
//                     <Remove />
//                   </SvgIcon>
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           )}
//         </Stack>
//       </>

//       {!isEdit && (
//         <Stack alignItems='center' direction='row' spacing={2}>
//           <Button
//             disabled={formik.values.customer.length === 0}
//             endIcon={
//               <SvgIcon fontSize='small'>
//                 <ArrowRightAltOutlinedIcon />
//               </SvgIcon>
//             }
//             onClick={onNext}
//             variant='contained'
//           >
//             Continue
//           </Button>
//           <Button color='inherit' onClick={onBack}>
//             Back
//           </Button>
//         </Stack>
//       )}
//     </Stack>
//   )
// }

// CustomerDetailsStep.propTypes = {
//   onBack: PropTypes.func,
//   onNext: PropTypes.func,
// }
