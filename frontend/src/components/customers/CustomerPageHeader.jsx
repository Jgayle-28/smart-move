import { Button, Stack, SvgIcon, Typography } from '@mui/material'
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01'
import { RouterLink } from 'src/components/router-link'
import { exportToExcel } from 'src/utils/export-to-excel'
import { useSelector } from 'react-redux'

function CustomerPageHeader() {
  const { company } = useSelector((state) => state.company)
  const { customers } = useSelector((state) => state.customers)
  return (
    <Stack direction='row' justifyContent='space-between' spacing={4}>
      <Stack spacing={1}>
        <Typography variant='h4'>Customers</Typography>
        <Stack alignItems='center' direction='row' spacing={1}>
          {/* <Button
            color='inherit'
            size='small'
            startIcon={
              <SvgIcon>
                <Upload01Icon />
              </SvgIcon>
            }
          >
            Import
          </Button> */}
          <Button
            color='inherit'
            size='small'
            onClick={() =>
              exportToExcel(
                customers,
                `${
                  company.companyName
                }-Customers(${new Date().toLocaleDateString()})`
              )
            }
            startIcon={
              <SvgIcon>
                <Download01Icon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems='center' direction='row' spacing={3}>
        <Button
          component={RouterLink}
          href='/dashboard/customers/add'
          startIcon={
            <SvgIcon>
              <PersonAddAlt1RoundedIcon />
            </SvgIcon>
          }
          variant='contained'
        >
          Add Customer
        </Button>
      </Stack>
    </Stack>
  )
}

export default CustomerPageHeader
