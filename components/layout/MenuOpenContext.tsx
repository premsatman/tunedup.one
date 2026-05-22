'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type MenuOpenContextValue = {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const MenuOpenContext = createContext<MenuOpenContextValue | null>(null)

export const MenuOpenProvider = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpenState] = useState(false)

  const setMenuOpen = useCallback((open: boolean) => {
    setMenuOpenState(open)
  }, [])

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen }),
    [menuOpen, setMenuOpen],
  )

  return (
    <MenuOpenContext.Provider value={value}>{children}</MenuOpenContext.Provider>
  )
}

export const useMenuOpen = () => {
  const context = useContext(MenuOpenContext)
  if (!context) {
    throw new Error('useMenuOpen must be used within MenuOpenProvider')
  }
  return context
}

export const useMenuOpenOptional = () => useContext(MenuOpenContext)
