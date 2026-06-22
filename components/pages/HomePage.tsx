import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedProjects, studioInfo, getTeam } from '@/lib/mockData'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import ContactForm from '@/components/ContactForm/ContactForm'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/home.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

export default function HomePage({ lang, dict }: Props) {
  const featured = getFeaturedProjects()
  const team = getTeam()
  const base = lang === 'en' ? '/en' : ''

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=2000&q=90"
            alt="MT-Projekt infrastruktura drogowa"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLabel}>{dict.hero.label}</div>
          <h1 className={styles.heroTitle}>{dict.hero.title}</h1>
          <p className={styles.heroSub}>{dict.hero.sub}</p>
          <Link href={`${base}/projekty`} className={styles.heroBtn}>
            {dict.hero.btn}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className={styles.heroScroll}>
          <span>{dict.hero.scroll}</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      <section className={styles.projects}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{dict.projects.section_title}</h2>
          <Link href={`${base}/projekty`} className={styles.seeAll}>{dict.projects.see_all}</Link>
        </div>
        <div className={styles.projectsGrid}>
          <div className={styles.gridLarge}>
            <ProjectCard project={featured[0]} size="large" lang={lang} />
          </div>
          <div className={styles.gridSmall}>
            {featured.slice(1, 3).map(p => (
              <ProjectCard key={p.id} project={p} size="medium" lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.about} id="o-nas">
        <div className={styles.aboutInner}>
          <div className={styles.aboutLeft}>
            <div className={styles.aboutTag}>{dict.about.tag}</div>
            <h2 className={styles.aboutTitle}>
              {dict.about.title}<br /><em>{dict.about.title_em}</em>
            </h2>
            <div className={styles.accentLine} />
          </div>
          <div className={styles.aboutRight}>
            <p className={styles.aboutText}>{dict.about.text}</p>
            <div className={styles.stats}>
              {[
                [dict.about.stat1_num, dict.about.stat1_label],
                [dict.about.stat2_num, dict.about.stat2_label],
                [dict.about.stat3_num, dict.about.stat3_label],
              ].map(([num, label]) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statNum}>{num}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team} id="zespol">
        <div className={styles.teamHeader}>
          <span className={styles.teamLabel}>{dict.team.label}</span>
          <h2 className={styles.teamTitle}>{dict.team.title}</h2>
        </div>
        <div className={styles.teamGrid}>
          {team.map(member => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.teamPhoto}>
                <Image src={member.photo} alt={member.name} fill className={styles.teamImg} />
              </div>
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>{member.name}</p>
                <p className={styles.teamRole}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="kontakt">
        <div className={styles.contactInner}>
          <div className={styles.contactLeft}>
            <h2 className={styles.contactTitle}>
              {dict.contact.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <div className={styles.contactDetails}>
              <a href={`mailto:${studioInfo.email}`} className={styles.contactEmail}>{studioInfo.email}</a>
              <p className={styles.contactPhone}>{studioInfo.phone}</p>
              <p className={styles.contactAddress}>{studioInfo.address}</p>
            </div>
          </div>
          <div className={styles.contactRight}>
            <ContactForm dict={dict.contact} />
          </div>
        </div>
      </section>
    </>
  )
}
