import { getDictionary } from '@/lib/dictionaries'
import ONasPage from '@/components/pages/ONasPage'

export default async function Page() {
  const dict = await getDictionary('en')
  return <ONasPage lang="en" dict={dict} />
}
