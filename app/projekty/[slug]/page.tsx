import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getAllSlugs, getAllProjects } from '@/lib/mockData'
import styles from './projekt.module.css'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export default function ProjektPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const all = getAllProjects()
  const currentIdx = all.findIndex(p => p.slug === project.slug)
  const next = all[(currentIdx + 1) % all.length]

  return (
    <article className={styles.page}>
      {/* HERO IMAGE */}
      <div className={styles.hero}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroBack}>
          <Link href="/projekty">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Projekty
          </Link>
        </div>
      </div>

      {/* PROJECT INFO */}
      <div className={styles.infoRow}>
        <div className={styles.infoLeft}>
          <span className={styles.category}>{project.category}</span>
          <h1 className={styles.title}>{project.title}</h1>
        </div>
        <div className={styles.infoRight}>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Rok</span>
              <span className={styles.metaVal}>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Lokalizacja</span>
              <span className={styles.metaVal}>{project.location}</span>
            </div>
            {project.area && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Powierzchnia</span>
                <span className={styles.metaVal}>{project.area}</span>
              </div>
            )}
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Typ</span>
              <span className={styles.metaVal}>{project.category}</span>
            </div>
          </div>
          <p className={styles.description}>{project.description}</p>
        </div>
      </div>

      {/* GALLERY */}
      <div className={styles.gallery}>
        {project.images.map((img, i) => (
          <div key={i} className={`${styles.galleryItem} ${i === 0 ? styles.galleryFull : ''}`}>
            <Image
              src={img}
              alt={`${project.title} — ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className={styles.galleryImg}
            />
          </div>
        ))}
      </div>

      {/* NEXT PROJECT */}
      <div className={styles.nextProject}>
        <span className={styles.nextLabel}>Następny projekt</span>
        <Link href={`/projekty/${next.slug}`} className={styles.nextLink}>
          <span className={styles.nextTitle}>{next.title}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  )
}
