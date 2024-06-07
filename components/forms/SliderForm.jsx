'use client'

import { useLanguageContext } from '@/context/LanguageContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, ControlledCheckbox, TextField, UploadImage } from 'components'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { sliderSchema } from 'utils'

const SliderForm = props => {
  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Props
  const {
    mode,
    createHandler,
    updateHandler,
    deleteHandler,
    isLoadingCreate,
    isLoadingDelete,
    isLoadingUpdate,
    selectedSlider,
  } = props

  //? Assets
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    isPublic: true,
  }

  //? Hook Form
  const {
    control,
    getValues,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(sliderSchema),
  })

  //? Handlers
  const handleAddUploadedImageUrl = url => setValue('image.url', url)

  //? Re-Renders
  useEffect(() => {
    if (selectedSlider && mode === 'edit') {
      const { image, title, uri, isPublic } = selectedSlider
      reset({ image, title, uri, isPublic })
    }
  }, [selectedSlider])

  return (
    <section className="p-3 mx-auto mb-10 space-y-8">
      <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
        <form
          onSubmit={mode === 'create' ? handleSubmit(createHandler) : handleSubmit(updateHandler)}
        >
          <TextField
            label={`${dict.admin?.slider.name}${dict.admin?.lang === '中文' ? '' : ' '}${dict.admin
              ?.slider.titleTH}`}
            control={control}
            name="title"
            errors={formErrors?.title}
          />

          <TextField
            label={dict.admin?.slider.link}
            direction="ltr"
            control={control}
            name="uri"
            errors={formErrors?.uri}
          />

          <TextField
            label={dict.admin?.slider.url}
            direction="ltr"
            control={control}
            name="image.url"
            errors={formErrors?.image?.url}
          />

          <UploadImage folder="/sliders" handleAddUploadedImageUrl={handleAddUploadedImageUrl} />

          <div className="w-44 my-3">
            <ControlledCheckbox
              name="isPublic"
              control={control}
              label={dict.admin?.slider.status}
            />
          </div>

          {sliderSchema.isValidSync(watch()) && (
            <div className="mx-auto max-w-max">
              {getValues('image.url') && (
                <Image src={getValues('image.url')} width={1000} height={300} alt="banner image" />
              )}
            </div>
          )}

          <div className="flex justify-evenly gap-x-4 pt-10">
            {mode === 'edit' ? (
              <>
                <Button
                  className="bg-amber-500 "
                  isRounded={true}
                  type="submit"
                  isLoading={isLoadingUpdate}
                >
                  {dict.admin?.slider.update}
                </Button>

                <Button className="rounded-3xl" isLoading={isLoadingDelete} onClick={deleteHandler}>
                  {dict.admin?.slider.delete}
                </Button>
              </>
            ) : (
              <Button
                className="bg-green-500 "
                isRounded={true}
                type="submit"
                isLoading={isLoadingCreate}
              >
                {dict.admin?.slider.submit}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default SliderForm
