'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useGetSingleOrderQuery } from '@/store/services'
import { BigLoading, OrderCard, PageContainer } from 'components'

const SingleOrder = ({ params }) => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.admin ? dict.admin.order.title : '订单详情')
  //? Assets
  const query = useUrlQuery()

  //? Get Order Data
  const { data, isLoading } = useGetSingleOrderQuery({
    id: params.id,
  })

  //? Render(s)
  return (
    <main>
      <PageContainer title={dict.admin?.order.title}>
        {isLoading ? (
          <div className="px-3 py-20">
            <BigLoading />
          </div>
        ) : data ? (
          <section className="max-w-5xl px-3 py-3 mx-auto lg:px-8">
            <OrderCard singleOrder order={data?.data} />
          </section>
        ) : null}
      </PageContainer>
    </main>
  )
}

export default SingleOrder
