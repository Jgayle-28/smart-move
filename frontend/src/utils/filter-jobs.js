import { applyPagination } from 'src/utils/apply-pagination'
import { deepCopy } from 'src/utils/deep-copy'
// import { products } from './data'

export function filterJobs(filterSate, jobs) {
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

      // Stock
      // if (typeof filters.inStock !== 'undefined') {
      //   const stockMatched = product.inStock === filters.inStock

      //   if (!stockMatched) {
      //     return false
      //   }
      // }

      return true
    })
    count = data.length
  }
  // Page
  if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
    data = applyPagination(data, page, rowsPerPage)
  }
  return data

  // return Promise.resolve({
  //   data,
  //   count,
  // })
}
