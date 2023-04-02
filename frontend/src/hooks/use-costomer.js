import { useCallback, useEffect, useState } from 'react'
import { customersApi } from 'src/api/customers'
import { useMounted } from 'src/hooks/use-mounted'

export const useCustomer = () => {
  const isMounted = useMounted()
  const [customer, setCustomer] = useState(null)

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer()

      if (isMounted()) {
        setCustomer(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      handleCustomerGet()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return customer
}
