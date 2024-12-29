import { useCallback, useEffect, useState } from 'react'
import { useMounted } from 'src/hooks/use-mounted'
import { customersApi } from 'src/api/customers'

export const useCustomersStore = (searchState) => {
  const isMounted = useMounted()
  const [state, setState] = useState({
    customers: [],
    customersCount: 0,
  })

  const handleCustomersGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers(searchState)

      if (isMounted()) {
        setState({
          customers: response.data,
          customersCount: response.count,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(() => {
    handleCustomersGet()
  }, [searchState])

  return {
    ...state,
  }
}
