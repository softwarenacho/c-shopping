import { useLanguageContext } from '@/context/LanguageContext'
import { BigLoading, Button, EmptyCustomList } from 'components'

export default function ShowWrapper(props) {
  //? Props
  const {
    isError,
    error,
    refetch,
    isFetching,
    dataLength,
    isSuccess,
    emptyComponent,
    loadingComponent,
    children,
  } = props

  // ? Dictionary
  const translation = useLanguageContext()

  //? Render(s)
  return (
    <section>
      {isError ? (
        <div className="py-20 mx-auto space-y-3 text-center w-fit">
          <h5 className="text-xl">{translation?.dict.wrapper.title}</h5>
          <p className="text-lg text-red-500">{error?.data?.err}</p>
          <Button className="mx-auto" onClick={refetch}>
            {translation?.dict.wrapper.retry}
          </Button>
        </div>
      ) : isFetching ? (
        <div className="px-3">{loadingComponent || <BigLoading />}</div>
      ) : isSuccess && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && dataLength === 0 ? (
        <>{emptyComponent || <EmptyCustomList />}</>
      ) : null}
    </section>
  )
}
