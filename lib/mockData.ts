import { Project, StudioInfo, TeamMember } from './types'

// STRAPI INTEGRATION NOTE:
// Replace these functions with Strapi API calls:
// const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*`)
// const data = await res.json()
// return data.data.map((item: any) => ({ id: item.id, ...item.attributes }))

export const studioInfo: StudioInfo = {
  headline: 'Projektujemy przestrzenie, które trwają',
  subheadline: 'Architektura oparta na kontekście, materiale i czasie.',
  about: 'Jesteśmy pracownią architektoniczną z Warszawy, specjalizującą się w projektowaniu obiektów mieszkaniowych, biurowych i przestrzeni publicznych. Nasze projekty łączą funkcjonalność z estetyką — zawsze w dialogu z otoczeniem.',
  email: 'studio@example.pl',
  phone: '+48 500 000 000',
  address: 'ul. Przykładowa 1, 00-001 Warszawa',
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'dom-w-lesie',
    title: 'Dom w Lesie',
    category: 'Mieszkaniowe',
    year: 2024,
    location: 'Konstancin-Jeziorna',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=85',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=85',
    ],
    description: 'Projekt domu jednorodzinnego wpisanego w naturalny krajobraz lasu. Głównym założeniem było minimalne ingerowanie w istniejącą roślinność — budynek prowadzi dialog z drzewami poprzez przeszklenia i drewniane elewacje.',
    area: '320 m²',
    featured: true,
  },
  {
    id: 2,
    slug: 'biuro-centrum',
    title: 'Biuro — Centrum',
    category: 'Komercyjne',
    year: 2023,
    location: 'Warszawa',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=85',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=85',
    ],
    description: 'Rewitalizacja przestrzeni biurowej w historycznej kamienicy. Projekt zakładał zachowanie oryginalnych elementów — kasetonowych sufitów i drewnianej podłogi — przy wprowadzeniu nowoczesnego układu open space.',
    area: '850 m²',
    featured: true,
  },
  {
    id: 3,
    slug: 'apartamenty-wisla',
    title: 'Apartamenty Wisła',
    category: 'Mieszkaniowe',
    year: 2024,
    location: 'Warszawa',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85',
    ],
    description: 'Kompleks mieszkaniowy z widokiem na Wisłę. Zróżnicowana bryła budynku odpowiada na skalę sąsiedniej zabudowy, tworząc miękkie przejście między miejską tkanką a nadrzecznym bulwarem.',
    area: '4200 m²',
    featured: true,
  },
  {
    id: 4,
    slug: 'wnetrze-mokotow',
    title: 'Wnętrze — Mokotów',
    category: 'Wnętrza',
    year: 2023,
    location: 'Warszawa',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=85',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=85',
    ],
    description: 'Projekt wnętrz mieszkania na Mokotowie. Punkt wyjścia stanowiły oryginalne betonowe stropy i ceglane ściany — całość utrzymana w ciepłej, neutralnej palecie z akcentami zieleni.',
    area: '120 m²',
    featured: false,
  },
  {
    id: 5,
    slug: 'szkola-nowe-miasto',
    title: 'Szkoła — Nowe Miasto',
    category: 'Użyteczność publiczna',
    year: 2022,
    location: 'Płock',
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=85',
      'https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=85',
    ],
    description: 'Projekt nowej szkoły podstawowej dla dzielnicy Nowe Miasto. Budynek organizuje się wokół wewnętrznego dziedzińca będącego sercem szkoły — przestrzenią spotkań i zabaw dla uczniów.',
    area: '3600 m²',
    featured: false,
  },
  {
    id: 6,
    slug: 'restauracja-stare-miasto',
    title: 'Restauracja — Stare Miasto',
    category: 'Wnętrza',
    year: 2023,
    location: 'Kraków',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85',
    ],
    description: 'Wnętrza restauracji w zabytkowej kamienicy na Starym Mieście. Projekt respektuje historyczną tkaninę budynku — gotyckie sklepienia i oryginalne posadzki tworzą unikalny klimat.',
    area: '280 m²',
    featured: false,
  },
]

export const team: TeamMember[] = [
  {
    id: 1,
    name: 'Anna Kowalska',
    role: 'Architektka, współzałożycielka',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    bio: 'Absolwentka Wydziału Architektury PW. Specjalizuje się w projektowaniu obiektów mieszkaniowych i przestrzeni publicznych.',
  },
  {
    id: 2,
    name: 'Marek Nowak',
    role: 'Architekt, współzałożyciel',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    bio: 'Doświadczenie zdobywał w pracowniach w Warszawie i Berlinie. Odpowiada za projekty komercyjne i użyteczności publicznej.',
  },
  {
    id: 3,
    name: 'Zofia Wiśniewska',
    role: 'Architektka wnętrz',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    bio: 'Projektuje wnętrza z dbałością o materiał i detal. Absolwentka ASP w Krakowie.',
  },
  {
    id: 4,
    name: 'Piotr Dąbrowski',
    role: 'Architekt',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    bio: 'Zajmuje się projektami wielorodzinnymi i rewitalizacjami. Doktorant na Wydziale Architektury PW.',
  },
]

export function getTeam(): TeamMember[] {
  return team
}

export function getAllProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug)
}
