import { useCallback, useState } from 'react'

export function useToggle() {
  const [isToggled, setIsToggled] = useState(false)

  const toggle = useCallback(
    () => setIsToggled(!isToggled),
    [isToggled, setIsToggled]
  )
  return { isToggled, toggle }
}
