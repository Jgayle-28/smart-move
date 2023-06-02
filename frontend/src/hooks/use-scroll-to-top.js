import { useEffect } from 'react'

const useScrollToTop = () => {
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Add event listeners for page or tab changes
    document.addEventListener('visibilitychange', handleScrollToTop)
    window.addEventListener('pageshow', handleScrollToTop)

    // Clean up the event listeners
    return () => {
      document.removeEventListener('visibilitychange', handleScrollToTop)
      window.removeEventListener('pageshow', handleScrollToTop)
    }
  }, [])
}

export default useScrollToTop
