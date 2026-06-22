import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProjects, studioInfo } from '@/lib/mockData'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import styles from './page.module.css'

export default function HomePage() {
  const featured = getFeaturedProjects()

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=90"
            alt="Studio"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>Pracownia architektoniczna</div>
          <h1 className={styles.heroTitle}>
            {studioInfo.headline.split(',').map((part, i) => (
              <span key={i}>{part}{i === 0 ? ',' : ''}<br /></span>
            ))}
          </h1>
          <p className={styles.heroSub}>{studioInfo.subheadline}</p>
          <Link href="/projekty" className={styles.heroBtn}>
            Zobacz projekty
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className={styles.heroScroll}>
          <span>Przewiń</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      <section className={styles.projects}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Wybrane projekty</h2>
          <Link href="/projekty" className={styles.seeAll}>Wszystkie projekty →</Link>
        </div>

        <div className={styles.projectsGrid}>
          {/* Large featured card */}
          <div className={styles.gridLarge}>
            <ProjectCard project={featured[0]} size="large" />
          </div>
          {/* Two smaller cards */}
          <div className={styles.gridSmall}>
            {featured.slice(1, 3).map(p => (
              <ProjectCard key={p.id} project={p} size="medium" />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.about} id="o-nas">
        <div className={styles.aboutInner}>
          <div className={styles.aboutLeft}>
            <div className={styles.aboutTag}>O pracowni</div>
            <h2 className={styles.aboutTitle}>
              Projektujemy z uwagą<br />
              <em>do kontekstu</em>
            </h2>
            <div className={styles.accentLine} />
          </div>
          <div className={styles.aboutRight}>
            <p className={styles.aboutText}>{studioInfo.about}</p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>12+</span>
                <span className={styles.statLabel}>lat doświadczenia</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>80+</span>
                <span className={styles.statLabel}>zrealizowanych projektów</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>6</span>
                <span className={styles.statLabel}>nagród branżowych</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.contact} id="kontakt">
        <div className={styles.contactInner}>
          <h2 className={styles.contactTitle}>Porozmawiajmy<br />o projekcie</h2>
          <div className={styles.contactDetails}>
            <a href={`mailto:${studioInfo.email}`} className={styles.contactEmail}>
              {studioInfo.email}
            </a>
            <p className={styles.contactPhone}>{studioInfo.phone}</p>
            <p className={styles.contactAddress}>{studioInfo.address}</p>
          </div>
        </div>
      </section>
    </>
  )
}
