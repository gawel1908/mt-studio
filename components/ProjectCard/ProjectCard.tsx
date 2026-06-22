'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/types'
import styles from './ProjectCard.module.css'

interface Props {
  project: Project
  size?: 'large' | 'medium' | 'small'
  lang?: string
}

export default function ProjectCard({ project, size = 'medium', lang = 'pl' }: Props) {
  const base = lang === 'en' ? '/en' : ''
  return (
    <Link href={`${base}/projekty/${project.slug}`} className={`${styles.card} ${styles[size]}`}>
      <div className={styles.imageWrap}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <span className={styles.category}>{project.category}</span>
            <h3 className={styles.title}>{project.title}</h3>
            <span className={styles.year}>{project.year}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
