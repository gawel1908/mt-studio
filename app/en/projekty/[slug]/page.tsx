import { getDictionary } from '@/lib/dictionaries'
import ProjektPage from '@/components/pages/ProjektPage'
import { getAllSlugs } from '@/lib/mockData'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dict = await getDictionary('en')
  return <ProjektPage lang="en" dict={dict} slug={slug} />
}
