import { getDictionary } from '@/helpers/dictionaries'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
const LanguageContext = createContext()

export const LanguageContextProvider = ({ children }) => {
  //? Dictionary
  const [dict, setDict] = useState({})
  const currentLng = localStorage.getItem('lng')

  const getDict = useCallback(async () => {
    const lang = await getDictionary(currentLng || 'zh')
    setDict(lang)
  }, [currentLng])

  useEffect(() => {
    if (dict) {
      getDict()
    }
  }, [dict, getDict])

  useEffect(() => {
    getDict()
  }, [getDict])

  return <LanguageContext.Provider value={{ dict, setDict }}>{children}</LanguageContext.Provider>
}

export const useLanguageContext = () => {
  return useContext(LanguageContext)
}
