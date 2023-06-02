import { applyPagination } from 'src/utils/apply-pagination'
import { deepCopy } from 'src/utils/deep-copy'
import { isSameDay, format, parseISO, startOfDay } from 'date-fns'

export function filterJobs(filterSate, jobs, searchQuery) {
  const { filters, page, rowsPerPage } = filterSate

  let data = deepCopy(jobs)
  let count = data.length

  if (typeof filters !== 'undefined') {
    data = data.filter((product) => {
      // Name
      if (typeof filters.name !== 'undefined' && filters.name !== '') {
        const nameMatched = product.customer.customerName
          .toLowerCase()
          .includes(filters.name.toLowerCase())

        if (!nameMatched) {
          return false
        }
      }

      // Category
      if (
        typeof filters.category !== 'undefined' &&
        filters.category.length > 0
      ) {
        const categoryMatched = filters.category.includes(product.jobType)

        if (!categoryMatched) {
          return false
        }
      }
      // Status
      if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
        const statusMatched =
          (filters.status.includes('paid') && product.isPaid) ||
          (filters.status.includes('unpaid') && !product.isPaid)

        if (!statusMatched) {
          return false
        }
      }

      return true
    })
    count = data.length
  }
  // Search by customer name
  if (searchQuery.length > 0) {
    data = data.filter(
      (job) => job.customer && job.customer.customerName !== searchQuery
    )
  }

  // Date
  if (filters.searchDate !== null && filters.searchDate !== undefined) {
    const formattedSearchDate = startOfDay(filters.searchDate)
    data = data.filter((job) => {
      const jobDate = startOfDay(parseISO(job.jobDate))
      return isSameDay(jobDate, formattedSearchDate)
    })
  }

  // Page
  if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
    data = applyPagination(data, page, rowsPerPage)
  }
  return data
}
