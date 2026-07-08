'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/types'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  size?: 'large' | 'medium' | 'small'
  lang?: string
  grayscale?: boolean
}

export default function ProjectCard({ project, size = 'medium', lang = 'pl', grayscale = false }: Props) {
  const base = lang === 'en' ? '/en' : ''
  return (
    <Link href={`${base}/projekty/${project.slug}`} className={`${styles.card} ${grayscale ? styles.grayscale : ''}`}>
      <div className={styles.imageWrap}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.category}>{project.category}</span>
          <span className={styles.year}>{project.year}</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.location}>{project.location}</span>
      </div>
    </Link>
  )
}
