import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import type { Project, TeamMember } from './types'

export const client = createClient({
  projectId: 'b1bu8x3a',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ---- GROQ queries ----

const projectFields = (lang: string) => {
  const l = lang === 'en' ? 'en' : 'pl'
  return `
    "id": _id,
    "slug": slug.current,
    "title": coalesce(title_${l}, title_pl),
    "category": coalesce(category_${l}, category_pl),
    year,
    location,
    area,
    featured,
    "coverImage": coverImage.asset->url + "?w=1200&q=85",
    "images": images[].asset->url,
    "description": coalesce(description_${l}, description_pl)
  `
}

const teamFields = (lang: string) => {
  const l = lang === 'en' ? 'en' : 'pl'
  return `
    "id": _id,
    name,
    "role": coalesce(role_${l}, role_pl),
    "photo": photo.asset->url + "?w=600&q=80",
    "bio": coalesce(bio_${l}, bio_pl)
  `
}

import {
  projects as mockProjects,
  team as mockTeam,
  getAllSlugs as mockGetAllSlugs,
} from './mockData'

export async function getAllProjects(lang = 'pl'): Promise<Project[]> {
  const results = await client.fetch<Project[]>(
    `*[_type == "project"] | order(year desc) { ${projectFields(lang)} }`
  )
  return results.length > 0 ? results : mockProjects as Project[]
}

export async function getFeaturedProjects(lang = 'pl'): Promise<Project[]> {
  const results = await client.fetch<Project[]>(
    `*[_type == "project" && featured == true] | order(year desc) { ${projectFields(lang)} }`
  )
  return results.length > 0 ? results : mockProjects.filter(p => p.featured) as Project[]
}

export async function getProjectBySlug(slug: string, lang = 'pl'): Promise<Project | null> {
  const result = await client.fetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${projectFields(lang)} }`,
    { slug }
  )
  if (result) return result
  return (mockProjects.find(p => p.slug === slug) as Project) ?? null
}

export async function getAllSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "project"] { "slug": slug.current }`
  )
  return results.length > 0 ? results.map(r => r.slug) : mockGetAllSlugs()
}

export async function getTeam(lang = 'pl'): Promise<TeamMember[]> {
  const results = await client.fetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) { ${teamFields(lang)} }`
  )
  return results.length > 0 ? results : mockTeam as TeamMember[]
}
