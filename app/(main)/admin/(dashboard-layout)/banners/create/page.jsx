'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import { useCreateBannerMutation } from '@/store/services'
import { BannerForm, HandleResponse, PageContainer } from 'components'
import { useRouter } from 'next/navigation'

const CreateBannerPage = () => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle(dict.admin?.banner.title || '新增banner')

  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const categoryId = query?.category_id

  //? Queries
  //*     Create Banner
  const [createBanner, { data, isSuccess, isLoading, error, isError }] = useCreateBannerMutation()

  //? Handlers
  const createHandler = data => {
    const { image, isPublic, title, type, uri } = data
    createBanner({
      body: { category_id: categoryId, image, isPublic, title, type, uri },
    })
  }

  const onSuccess = () => back()

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}

      <main>
        <PageContainer title={dict.admin?.banner.title}>
          <BannerForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
        </PageContainer>
      </main>
    </>
  )
}

export default CreateBannerPage
