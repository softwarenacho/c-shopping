import { useLanguageContext } from '@/context/LanguageContext'
import { getDictionary } from '@/helpers/dictionaries'
import { Icons } from 'components'
import { useCallback, useState } from 'react'

const LanguageSwitcher = () => {
  const { setDict } = useLanguageContext()

  const getDict = useCallback(
    async lng => {
      const lang = await getDictionary(lng || 'zh')
      setDict(lang)
    },
    [setDict]
  )

  const [language, setLanguage] = useState(localStorage.getItem('lng') || 'zh')
  const changeLanguage = () => {
    const lng = language === 'zh' ? 'en' : 'zh'
    setLanguage(lng)
    localStorage.setItem('lng', lng)
    getDict(lng)
  }

  return (
    <div
      className="flex-center text-sm gap-x-2 cursor-pointer dropdown__button"
      onClick={() => changeLanguage()}
    >
      {language === 'zh' && <button>En</button>}
      {language === 'en' && <button>中文</button>}
      <Icons.Translate className="icon" />
    </div>
  )
}

export default LanguageSwitcher
