import { useEffect } from 'react'

// Sets the tab title for a page and starts it at the top.
export function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [title])
}
