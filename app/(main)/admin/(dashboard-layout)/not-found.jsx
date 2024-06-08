'use client'

import { ArrowLink, DashboardLayout, ResponsiveImage } from '@/components'
import { useLanguageContext } from '@/context/LanguageContext'

export default function NotFound() {
  // ? Dictionary
  const { dict } = useLanguageContext()

  //? Render(s)
  return (
    <DashboardLayout>
      <main className="flex flex-col items-center justify-center py-8 gap-y-6 xl:mt-28">
        <p className="text-base font-semibold text-black">404 Not Found!</p>
        <ArrowLink path="/admin">{dict.admin?.notFound}</ArrowLink>
        <ResponsiveImage
          dimensions="w-full max-w-lg h-72"
          src="/icons/page-not-found.png"
          layout="fill"
          alt="404"
        />
      </main>
    </DashboardLayout>
  )
}
