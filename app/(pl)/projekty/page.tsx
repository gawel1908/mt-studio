import { getDictionary } from '@/lib/dictionaries'
import ProjektyPage from '@/components/pages/ProjektyPage'

export default async function Page() {
  const dict = await getDictionary('pl')
  return <ProjektyPage lang="pl" dict={dict} />
}
