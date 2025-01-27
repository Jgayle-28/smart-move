import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-hot-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { Scrollbar } from 'src/components/scrollbar'
import JobListTableItem from './JobListTableItem'
import EmptyState from 'src/components/shared/EmptyState'

export const JobListTable = (props) => {
  const {
    jobs,
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isSearching = false,
  } = props

  const [currentProduct, setCurrentProduct] = useState(null)

  const handleProductToggle = useCallback((productId) => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null
      }

      return productId
    })
  }, [])

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Details</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Estimate </TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.length ? (
              jobs.map((job) => {
                return (
                  <JobListTableItem
                    key={job._id}
                    job={job}
                    currentProduct={currentProduct}
                    handleProductToggle={handleProductToggle}
                  />
                )
              })
            ) : (
              <TableRow>
                <TableCell align='center' colSpan={7} sx={{ py: 3, px: 2 }}>
                  <EmptyState
                    title={
                      isSearching
                        ? 'No jobs match your search'
                        : 'You Have not added any jobs yet'
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      {jobs && jobs.length > 0 && (
        <TablePagination
          component='div'
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </div>
  )
}

JobListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
}
