import Grid from 'antd/es/grid'
import { useMemo } from 'react'

const useViewport = () => {
  const screens = Grid.useBreakpoint()
  const viewport = useMemo(
    () => (screens.xs || (screens.sm && !screens.lg) ? 'mobile' : 'desktop'),
    [screens]
  )
  return viewport
}

export default useViewport
