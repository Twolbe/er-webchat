import { useEffect, useRef } from 'react'

const useAutoScroll = (...triggers: any[]) => {
  const ref = useRef<any>()

  useEffect(() => {
    if (ref.current) {
      ;(ref.current as any).scrollTop = (ref.current as any).scrollHeight
    }
  }, [triggers])

  return ref
}

export default useAutoScroll
