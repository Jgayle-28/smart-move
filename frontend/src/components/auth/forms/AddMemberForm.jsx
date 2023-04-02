import { useSelector, useDispatch } from 'react-redux'
import { createUser } from 'src/store/auth/authSlice'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Stack, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { toast } from 'react-hot-toast'
import {
  clearEditMember,
  updateMember,
  updateTeam,
} from 'src/store/company/companySlice'
import { useEffect } from 'react'

const tempValues = {
  email: '',
  name: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup.string().max(255).required('Name is required'),
})

const AddMemberForm = ({ creationCallback, editMember }) => {
  const { isLoading } = useSelector((state) => state.auth)
  const { company } = useSelector((state) => state.company)

  // If you are editing a team member the values will be set by editMember
  const initialValues = editMember
    ? { name: editMember.name, email: editMember.email, password: '' }
    : tempValues

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => handleSubmit(),
  })

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (editMember) dispatch(clearEditMember())
    }
  }, [])

  const handleSubmit = () => {
    try {
      const newUser = {
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
        company: company._id,
        isAdmin: false,
        role: 'user',
      }
      if (editMember) newUser._id = editMember._id
      // If the editMember value is not empty in redux we are updating a member
      if (editMember) {
        dispatch(updateMember(newUser))
          .unwrap()
          .then(() => {
            toast.success('Member successfully updated')
            creationCallback()
          })
      } else {
        dispatch(createUser(newUser))
          .unwrap()
          .then((createdUser) => {
            toast.success('Member successfully added to the team')
            dispatch(updateTeam(createdUser))
            creationCallback()
          })
      }
    } catch (error) {
      console.error('Error Registering user')
    }
  }

  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            error={!!(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label='Name'
            name='name'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <TextField
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label='Email Address'
            name='email'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type='email'
            value={formik.values.email}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label='Password'
            name='password'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type='password'
            value={formik.values.password}
          />
          <TextField
            error={
              !!(
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              )
            }
            fullWidth
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
            label='Confirm Password'
            name='passwordConfirmation'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type='password'
            value={formik.values.passwordConfirmation}
          />
        </Stack>

        <LoadingButton
          loading={isLoading}
          loadingPosition='start'
          fullWidth
          size='large'
          sx={{ mt: 3 }}
          type='submit'
          variant='contained'
        >
          {editMember ? 'Update Member' : 'Add Member'}
        </LoadingButton>
      </form>
    </>
  )
}

export default AddMemberForm
