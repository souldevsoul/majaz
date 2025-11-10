import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function LocaleHomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // Redirect to home-1 page
  redirect(`/${locale}/home-1`)
}
