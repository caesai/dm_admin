import { RefObject, useEffect } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement | null>, onclick: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onclick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onclick])
}

export default useClickOutside
