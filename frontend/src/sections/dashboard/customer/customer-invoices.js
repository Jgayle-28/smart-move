import PropTypes from 'prop-types'
import { format } from 'date-fns'

import {
  Card,
  CardHeader,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { MoreMenu } from 'src/components/more-menu'
import { RouterLink } from 'src/components/router-link'
import { Scrollbar } from 'src/components/scrollbar'
import { SeverityPill } from 'src/components/severity-pill'
import { paths } from 'src/paths'

export const CustomerInvoices = (props) => {
  const { invoices = [], ...other } = props

  return (
    <Card {...other}>
      <CardHeader action={<MoreMenu />} title='Recent Invoices' />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => {
              const issueDate = format(invoice.issueDate, 'MMM dd,yyyy')
              const statusColor =
                invoice.status === 'paid' ? 'success' : 'error'

              return (
                <TableRow key={invoice.id}>
                  <TableCell>#{invoice.id}</TableCell>
                  <TableCell>{issueDate}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <SeverityPill color={statusColor}>
                      {invoice.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      component={RouterLink}
                      href={paths.dashboard.invoices.details}
                    >
                      <SvgIcon>{/* <ArrowRightIcon /> */}</SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component='div'
        count={invoices.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  )
}

CustomerInvoices.propTypes = {
  invoices: PropTypes.array,
}
