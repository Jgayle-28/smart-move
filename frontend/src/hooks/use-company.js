import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useCompany = () => {
  const [checkingCompanyStatus, setCheckingStatus] = useState(true)

  const { company, team, isLoading } = useSelector((state) => state.company)

  useEffect(() => {
    if (!company) setCheckingStatus(false)
  }, [company])

  return { company, team, isLoading, checkingCompanyStatus }
}
