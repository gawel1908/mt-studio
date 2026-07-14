import Image from 'next/image'
import Link from 'next/link'
import { studioInfo } from '@/lib/mockData'
import { getFeaturedProjects, getTeam } from '@/lib/sanity'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import ContactForm from '@/components/ContactForm/ContactForm'
import CooperationTabs from '@/components/CooperationTabs/CooperationTabs'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/home.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

const marqueeItems = [
  'Drogi i ulice', 'Obiekty inżynierskie', 'Odwodnienie i sieci',
  'Organizacja ruchu', 'Mosty i przepusty', 'BIM / CAD',
  'Geotechnika', 'Nadzory inwestorskie', 'Infrastruktura techniczna',
]

const timelineItems = [
  { year: '2009', title: 'Początki', text: 'Pierwsze opracowania projektowe dla lokalnych inwestycji drogowych i infrastrukturalnych.' },
  { year: '2012', title: 'Specjalizacja', text: 'Rozwój kompetencji w zakresie dróg, ulic, skrzyżowań, odwodnienia i infrastruktury towarzyszącej.' },
  { year: '2014', title: 'Rozwój zespołu', text: 'Zwiększenie liczby specjalistów branżowych i wdrożenie nowych standardów projektowania.' },
  { year: '2016', title: 'Projekty wielobranżowe', text: 'Realizacja dokumentacji wymagających koordynacji branżowej i współpracy z gestorami sieci.' },
  { year: '2018', title: 'Wdrożenie BIM', text: 'Rozpoczęcie prac w technologii BIM i zaawansowanych narzędziach CAD.' },
  { year: '2020', title: 'Kompleksowe dokumentacje', text: 'Obsługa inwestycji od koncepcji przez projekty budowlane po wsparcie etapu realizacji.' },
  { year: '2022', title: 'Współpraca zagraniczna', text: 'Rozpoczęcie współpracy z zagranicznymi biurami projektowymi i wykonawcami.' },
  { year: '2024', title: 'Nowy kierunek', text: 'Rozwój standardów pracy, narzędzi CAD/BIM oraz współpracy z partnerami krajowymi i zagranicznymi.' },
]

export default async function HomePage({ lang, dict }: Props) {
  const projects = await getFeaturedProjects(lang)
  const team = await getTeam(lang)
  const base = lang === 'en' ? '/en' : ''
  const d = dict as any

  const marqueeEn = [
    'Roads & streets', 'Engineering structures', 'Drainage & networks',
    'Traffic management', 'Bridges & culverts', 'BIM / CAD',
    'Geotechnics', 'Investment supervision', 'Technical infrastructure',
  ]
  const marqueeList = lang === 'en' ? marqueeEn : marqueeItems

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/heromain.png"
            alt="MT-Projekt infrastruktura drogowa"
            fill priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>{d.hero.label}</div>
          <h1 className={styles.heroTitle}>{d.hero.title}</h1>
          <p className={styles.heroSub}>{d.hero.sub}</p>
          <div className={styles.heroBtns}>
            <Link href={`${base}/projekty`} className={styles.heroBtn}>
              {d.hero.btn}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>{d.hero.scroll}</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...marqueeList, ...marqueeList].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* JAK PRACUJEMY (skrót) */}
      <section className={styles.processCompact}>
        <div className={styles.sectionCenter}>
          <span className={styles.eyebrow}>{d.process.eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.process.title}</h2>
        </div>
        <div className={styles.processCompactRow}>
          {[
            [d.process.step1_num, d.process.step1_title],
            [d.process.step2_num, d.process.step2_title],
            [d.process.step3_num, d.process.step3_title],
            [d.process.step4_num, d.process.step4_title],
          ].map(([num, title]) => (
            <div key={num} className={styles.processCompactStep}>
              <span className={styles.processNum}>{num}</span>
              <h3 className={styles.processCompactTitle}>{title}</h3>
            </div>
          ))}
        </div>
        <Link href={`${base}/o-nas`} className={styles.textLink}>
          {d.process.more ?? (lang === 'en' ? 'Learn more about how we work →' : 'Dowiedz się więcej o naszym procesie →')}
        </Link>
      </section>

      {/* PROJEKTY */}
      <section className={styles.projects} id="projekty">
        <div className={styles.projectsHeader}>
          <div>
            <span className={styles.eyebrowLeft}>{d.projects.eyebrow}</span>
            <h2 className={styles.projectsTitle}>{d.projects.section_title}</h2>
          </div>
          <Link href={`${base}/projekty`} className={styles.seeAll}>{d.projects.see_all}</Link>
        </div>
        <div className={styles.projectsGrid3}>
          {projects.slice(0, 9).map(p => (
            <ProjectCard key={p.id} project={p} size="medium" lang={lang} grayscale />
          ))}
        </div>
      </section>

      {/* ZESPÓŁ */}
      <section className={styles.team} id="zespol">
        <div className={styles.sectionCenter}>
          <span className={styles.eyebrow}>{d.team.eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.team.title}</h2>
        </div>
        <div className={styles.teamGrid4}>
          {team.map(member => (
            <div key={member.id} className={styles.teamCard}>
              <div className={styles.teamPhoto}>
                <Image src={member.photo} alt={member.name} fill className={styles.teamImg} />
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WSPÓŁPRACA */}
      <section className={styles.cooperation} id="wspolpraca">
        <div className={styles.sectionCenter}>
          <span className={styles.eyebrow}>{d.cooperation.eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.cooperation.title}</h2>
        </div>
        <CooperationTabs dict={d.cooperation} />
      </section>

      {/* KONTAKT */}
      <section className={styles.contact} id="kontakt">
        <div className={styles.contactInner}>
          <span className={styles.eyebrowDark}>{d.contact.eyebrow}</span>
          <h2 className={styles.contactTitle}>{d.contact.title}</h2>
          <div className={styles.contactBody}>
            <div className={styles.contactInfo}>
              <a href={`mailto:${studioInfo.email}`} className={styles.contactEmail}>
                {studioInfo.email}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <div className={styles.contactDetails}>
                <p>MT-Projekt Sp. z o.o.</p>
                <p>{studioInfo.address}</p>
                <p>{studioInfo.phone}</p>
              </div>
            </div>
            <div className={styles.contactFormWrap}>
              <ContactForm dict={d.contact} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
