export interface Project {
  id: number
  slug: string
  title: string
  category: string
  year: number
  location: string
  coverImage: string
  images: string[]
  description: string
  area?: string
  featured: boolean
}

export interface TeamMember {
  id: number
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
