import { useLanguageContext } from '@/context/LanguageContext'
import { useDisclosure } from '@/hooks'
import { Icons, SearchModal } from 'components'

export default function Search() {
  //? Assets
  const [isShowSearchModal, searchModalHandlers] = useDisclosure()

  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <div className="flex flex-row flex-grow max-w-3xl">
      <div
        onClick={searchModalHandlers.open}
        className="flex flex-row flex-grow rounded-md bg-zinc-200/80"
      >
        <button className="flex-grow py-1 px-3 text-left bg-transparent outline-none cursor-pointer text-gray-400 focus:border-none">
          {dict.header?.search?.placeholder}
        </button>
        <button className="p-2">
          <Icons.Search className="icon text-gray-400" />
        </button>
      </div>
      <SearchModal isShow={isShowSearchModal} onClose={searchModalHandlers.close} />
    </div>
  )
}
