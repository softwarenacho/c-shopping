import { useLanguageContext } from '@/context/LanguageContext'
import { getDictionary } from '@/helpers/dictionaries'
import { Icons } from 'components'
import { useCallback, useEffect, useState } from 'react'

const LanguageSwitcher = () => {
  const translation = useLanguageContext()
  const [language, setLang] = useState('zh')

  const getDict = useCallback(
    async lng => {
      const lang = await getDictionary(lng || 'zh')
      translation?.setDict(lang)
      setLang(lng)
    },
    [translation]
  )

  const changeLanguage = () => {
    if (typeof window !== 'undefined') {
      const languageStorage = window.localStorage.getItem('lng')
      const lng = languageStorage === 'zh' ? 'en' : 'zh'
      setLang(lng)
      window.localStorage.setItem('lng', lng)
      getDict(lng)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const languageStorage = window.localStorage.getItem('lng')
      getDict(languageStorage)
    }
  }, [getDict])

  return (
    <div
      className="flex-center text-sm gap-x-2 cursor-pointer dropdown__button"
      onClick={() => changeLanguage()}
    >
      {language === 'en' && <button>En</button>}
      {language === 'zh' && <button>中文</button>}
      <Icons.Translate className="icon" />
    </div>
  )
}

export default LanguageSwitcher
