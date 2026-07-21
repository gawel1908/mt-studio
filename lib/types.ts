export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface Project {
  id: string
  slug: string
  title: string
  year: number
  location: string
  coverImage: string
  images: string[]
  description: string
  area?: string
  featured: boolean
  pointCloudImage?: string
  terrainModelImage?: string
  existingStateImage?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  bio?: string
}

export interface StudioInfo {
  headline: string
  subheadline: string
  about: string
  email: string
  phone: string
  address: string
}
