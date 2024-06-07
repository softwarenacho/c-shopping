import { useLanguageContext } from '@/context/LanguageContext'
import { CashOnDelivery, Daysreturn, ExpressDelivery, OriginalProducts, Support } from 'components'

export default function Services() {
  // ? Dictionary
  const { dict } = useLanguageContext()

  const services = [
    {
      name: dict.footer?.delivery,
      icon: <ExpressDelivery className="w-10 h-10" />,
    },
    { name: dict.footer?.availability, icon: <Support className="w-10 h-10" /> },
    {
      name: dict.footer?.pay,
      icon: <CashOnDelivery className="w-10 h-10" />,
    },
    {
      name: dict.footer?.sevenDay,
      icon: <Daysreturn className="w-10 h-10" />,
    },
    {
      name: dict.footer?.original,
      icon: <OriginalProducts className="w-10 h-10" />,
    },
  ]

  //? Render(s)
  return (
    <section className="hidden py-5 border-t border-b-2 border-gray-200 lg:flex justify-evenly">
      {services.map((item, i) => (
        <div key={i} className="flex items-center gap-x-1">
          {item.icon}
          <span className="text-xs">{item.name}</span>
        </div>
      ))}
    </section>
  )
}
