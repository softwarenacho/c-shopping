import { useLanguageContext } from '@/context/LanguageContext'
import { getDictionary } from '@/helpers/dictionaries'
import { Icons } from 'components'
import { useCallback, useState } from 'react'

const LanguageSwitcher = () => {
  const translation = useLanguageContext()
  const [lang, setLang] = useState('zh')

  const getDict = useCallback(
    async lng => {
      const lang = await getDictionary(lng || 'zh')
      translation?.setDict(lang)
    },
    [translation]
  )

  const changeLanguage = () => {
    if (typeof window !== 'undefined') {
      const language = window.localStorage.getItem('lng')
      const lng = language === 'zh' ? 'en' : 'zh'
      setLang(lng)
      window.localStorage.setItem('lng', lng)
      getDict(lng)
    }
  }

  return (
    <div
      className="flex-center text-sm gap-x-2 cursor-pointer dropdown__button"
      onClick={() => changeLanguage()}
    >
      {lang === 'en' && <button>En</button>}
      {lang === 'zh' && <button>中文</button>}
      <Icons.Translate className="icon" />
    </div>
  )
}

export default LanguageSwitcher
