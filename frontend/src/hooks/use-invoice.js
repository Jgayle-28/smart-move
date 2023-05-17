import { useCallback, useEffect, useState } from 'react'
import { invoicesApi } from 'src/api/invoices'
import { useMounted } from 'src/hooks/use-mounted'

export const useInvoice = () => {
  const isMounted = useMounted()
  const [invoice, setInvoice] = useState(null)

  const handleInvoiceGet = useCallback(async () => {
    try {
      const response = await invoicesApi.getInvoice()

      if (isMounted()) {
        setInvoice(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      handleInvoiceGet()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return invoice
}
