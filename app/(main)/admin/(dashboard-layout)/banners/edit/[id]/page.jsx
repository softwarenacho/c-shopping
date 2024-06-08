'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { useTitle, useUrlQuery } from '@/hooks'
import {
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from '@/store/services'
import {
  BannerForm,
  BigLoading,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  HandleResponse,
  PageContainer,
} from 'components'
import { useDisclosure } from 'hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const EditBannerPage = ({ params: { id: bannerId } }) => {
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const bannerName = query?.banner_name

  const initialUpdataInfo = {}

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState(initialUpdataInfo)

  //? Queries
  //*   Get Banner
  const { data: selectedBanner, isLoading: isLoadingGetSelectedBanner } = useGetSingleBannerQuery({
    id: bannerId,
  })

  //*   Update Banner
  const [
    updateBanner,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateBannerMutation()

  //*   Delete Banner
  const [
    deleteBanner,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteBannerMutation()

  //? Handlers
  //*   Update
  const updateHandler = data => {
    setUpdateInfo(prev => ({ ...prev, ...selectedBanner.data, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateBanner({
      id: bannerId,
      body: updateInfo,
    })
  }

  const onCancelUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccessUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
    back()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  //*   Delete
  const deleteHandler = () => confirmDeleteModalHandlers.open()

  const onConfirmDelete = () => deleteBanner({ id: bannerId })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  // ? Dictionary
  const { dict } = useLanguageContext()

  useTitle((dict.admin?.banner.title || '编辑banner') + ' ' + bannerName)

  return (
    <>
      <ConfirmDeleteModal
        title="banner"
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete?.data?.message}
          message={dataDelete?.message}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <ConfirmUpdateModal
        title="banner"
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {(isSuccessUpdate || isErrorUpdate) && (
        <HandleResponse
          isError={isErrorUpdate}
          isSuccess={isSuccessUpdate}
          error={errorUpdate?.data?.message}
          message={dataUpdate?.message}
          onSuccess={onSuccessUpdate}
          onError={onErrorUpdate}
        />
      )}

      <main>
        <PageContainer title={dict.admin?.banner.title + ' ' + bannerName}>
          {isLoadingGetSelectedBanner ? (
            <div className="px-3 py-20">
              <BigLoading />
            </div>
          ) : selectedBanner.data ? (
            <BannerForm
              mode="edit"
              selectedBanner={selectedBanner.data}
              updateHandler={updateHandler}
              isLoadingDelete={isLoadingDelete}
              isLoadingUpdate={isLoadingUpdate}
              deleteHandler={deleteHandler}
            />
          ) : null}
        </PageContainer>
      </main>
    </>
  )
}

export default EditBannerPage
