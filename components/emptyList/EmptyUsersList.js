import { useLanguageContext } from '@/context/LanguageContext'
import { Icons } from 'components'

export default function EmptyUsersList() {
  // ? Dictionary
  const { dict } = useLanguageContext()

  return (
    <div className="py-20">
      <Icons.Users className="w-10 h-10 text-red-400" />
      <p className="text-center">{dict.admin?.user.empty}</p>
    </div>
  )
}
