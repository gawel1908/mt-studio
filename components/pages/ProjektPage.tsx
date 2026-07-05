import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getAllProjects } from '@/lib/sanity'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/projekt.module.css'

interface Props {
  lang: string
  dict: Dictionary
  slug: string
}

export default async function ProjektPage({ lang, dict, slug }: Props) {
  const [project, all] = await Promise.all([
    getProjectBySlug(slug, lang),
    getAllProjects(lang),
  ])
  if (!project) notFound()

  const base = lang === 'en' ? '/en' : ''
  const currentIdx = all.findIndex(p => p.slug === project.slug)
  const next = all[(currentIdx + 1) % all.length]
  const d = dict.project_page

  return (
    <article className={styles.page}>
      <div className={styles.hero}>
        <Image src={project.coverImage} alt={project.title} fill priority className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroBack}>
          <Link href={`${base}/projekty`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {d.back}
          </Link>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoLeft}>
          <span className={styles.category}>{project.category}</span>
          <h1 className={styles.title}>{project.title}</h1>
        </div>
        <div className={styles.infoRight}>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>{d.year}</span>
              <span className={styles.metaVal}>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>{d.location}</span>
              <span className={styles.metaVal}>{project.location}</span>
            </div>
            {project.area && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{d.area}</span>
                <span className={styles.metaVal}>{project.area}</span>
              </div>
            )}
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>{d.type}</span>
              <span className={styles.metaVal}>{project.category}</span>
            </div>
          </div>
          <p className={styles.description}>{project.description}</p>
        </div>
      </div>

      <div className={styles.gallery}>
        {project.images?.map((img, i) => (
          <div key={i} className={`${styles.galleryItem} ${i === 0 ? styles.galleryFull : ''}`}>
            <Image src={img} alt={`${project.title} — ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 90vw" className={styles.galleryImg} />
          </div>
        ))}
      </div>

      {next && (
        <div className={styles.nextProject}>
          <span className={styles.nextLabel}>{d.next}</span>
          <Link href={`${base}/projekty/${next.slug}`} className={styles.nextLink}>
            <span className={styles.nextTitle}>{next.title}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      )}
    </article>
  )
}
