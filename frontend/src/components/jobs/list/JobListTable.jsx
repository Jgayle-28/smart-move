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

export const JobListTable = (props) => {
  const {
    jobs,
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
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

  const handleProductClose = useCallback(() => {
    setCurrentProduct(null)
  }, [])

  const handleProductUpdate = useCallback(() => {
    setCurrentProduct(null)
    toast.success('Product updated')
  }, [])

  const handleProductDelete = useCallback(() => {
    toast.error('Product cannot be deleted')
  }, [])

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width='25%'>Name</TableCell>
              <TableCell width='25%'>Phone</TableCell>
              <TableCell>Estimate </TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs &&
              jobs.map((job) => {
                return (
                  <JobListTableItem
                    key={job._id}
                    job={job}
                    currentProduct={currentProduct}
                    handleProductToggle={handleProductToggle}
                    handleProductClose={handleProductClose}
                    handleProductUpdate={handleProductUpdate}
                    handleProductDelete={handleProductDelete}
                  />
                )
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component='div'
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
