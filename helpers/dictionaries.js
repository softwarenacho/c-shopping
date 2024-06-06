'server-only'

const dictionaries = {
  zh: () => import('../public/locales/zh/common.json').then(module => module.default),
  en: () => import('../public/locales/en/common.json').then(module => module.default),
}

export const getDictionary = async locale => dictionaries[locale]()
