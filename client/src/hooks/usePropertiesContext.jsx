import { PropertiesContext } from '../context/PropertyContext'
import { useContext } from 'react'

export const usePropertiesContext = () => {
  const context = useContext(PropertiesContext)

  if (!context) {
    throw Error('usePropertiesContext must be used inside an PropertiesContextProvider')
  }

  return context
}