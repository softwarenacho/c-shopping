import { useLanguageContext } from '@/context/LanguageContext'
import { OrderEmpty } from 'components'

export default function EmptyOrdersList() {
  //? Dictionary
  const { dict } = useLanguageContext()

  return (
    <div className="py-20">
      <OrderEmpty className="mx-auto h-52 w-52" />
      <p className="text-center">{dict.profile?.order?.empty}</p>
    </div>
  )
}
