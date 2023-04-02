import { useMemo } from 'react'

export const useCustomersIds = (customers = []) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id)
  }, [customers])
}
