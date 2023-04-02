import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useCompany = () => {
  const [checkingCompanyStatus, setCheckingStatus] = useState(true)

  const { company, team, isLoading } = useSelector((state) => state.company)

  useEffect(
    () => {
      if (!company) setCheckingStatus(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [company]
  )

  return { company, team, isLoading, checkingCompanyStatus }
}
