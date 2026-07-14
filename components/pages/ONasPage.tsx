import Image from 'next/image'
import Link from 'next/link'
import Timeline from '@/components/Timeline/Timeline'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/o-nas.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

const timelineItems = [
  { year: '2009', title: 'Początki', title_en: 'Beginnings', text: 'Pierwsze opracowania projektowe dla lokalnych inwestycji drogowych i infrastrukturalnych.', text_en: 'First design work for local road and infrastructure investments.' },
  { year: '2012', title: 'Specjalizacja', title_en: 'Specialisation', text: 'Rozwój kompetencji w zakresie dróg, ulic, skrzyżowań, odwodnienia i infrastruktury towarzyszącej.', text_en: 'Growing expertise in roads, streets, intersections, drainage and supporting infrastructure.' },
  { year: '2014', title: 'Rozwój zespołu', title_en: 'Team growth', text: 'Zwiększenie liczby specjalistów branżowych i wdrożenie nowych standardów projektowania.', text_en: 'Expanding the specialist team and implementing new design standards.' },
  { year: '2016', title: 'Projekty wielobranżowe', title_en: 'Multi-discipline projects', text: 'Realizacja dokumentacji wymagających koordynacji branżowej i współpracy z gestorami sieci.', text_en: 'Documentation requiring multi-discipline coordination and network operator collaboration.' },
  { year: '2018', title: 'Wdrożenie BIM', title_en: 'BIM adoption', text: 'Rozpoczęcie prac w technologii BIM i zaawansowanych narzędziach CAD.', text_en: 'Starting work with BIM technology and advanced CAD tools.' },
  { year: '2020', title: 'Kompleksowe dokumentacje', title_en: 'Full-scope documentation', text: 'Obsługa inwestycji od koncepcji przez projekty budowlane po wsparcie etapu realizacji.', text_en: 'Full investment support from concept through construction design to execution stage.' },
  { year: '2022', title: 'Współpraca zagraniczna', title_en: 'International cooperation', text: 'Rozpoczęcie współpracy z zagranicznymi biurami projektowymi i wykonawcami.', text_en: 'Beginning cooperation with international engineering offices and contractors.' },
  { year: '2024', title: 'Nowy kierunek', title_en: 'New direction', text: 'Rozwój standardów pracy, narzędzi CAD/BIM oraz współpracy z partnerami krajowymi i zagranicznymi.', text_en: 'Developing work standards, CAD/BIM tools and partnerships domestically and abroad.' },
]

const competences = [
  { title_pl: 'Drogi i ulice', title_en: 'Roads & streets', text_pl: 'drogi, skrzyżowania, zjazdy, chodniki i trasy rowerowe', text_en: 'roads, intersections, driveways, pavements and cycle paths' },
  { title_pl: 'Obiekty inżynierskie', title_en: 'Engineering structures', text_pl: 'projektowanie obiektów inżynierskich i konstrukcji drogowych', text_en: 'design of engineering structures and road elements' },
  { title_pl: 'Odwodnienie i sieci', title_en: 'Drainage & networks', text_pl: 'kanalizacja deszczowa, rowy, wyloty, retencja i sieci techniczne', text_en: 'stormwater drainage, ditches, outlets, retention and utility networks' },
  { title_pl: 'Organizacja ruchu', title_en: 'Traffic management', text_pl: 'stała i czasowa organizacja ruchu oraz oznakowanie', text_en: 'permanent and temporary traffic organisation and signage' },
  { title_pl: 'Mosty i przepusty', title_en: 'Bridges & culverts', text_pl: 'projektowanie mostów, wiaduktów i przepustów drogowych', text_en: 'design of bridges, viaducts and road culverts' },
  { title_pl: 'BIM / CAD', title_en: 'BIM / CAD', text_pl: 'dokumentacja projektowa w technologii BIM i CAD', text_en: 'design documentation in BIM and CAD technology' },
  { title_pl: 'Geotechnika', title_en: 'Geotechnics', text_pl: 'badania i opracowania geotechniczne dla inwestycji drogowych', text_en: 'geotechnical surveys and studies for road investments' },
  { title_pl: 'Nadzory inwestorskie', title_en: 'Investment supervision', text_pl: 'nadzór inwestorski i wsparcie na etapie realizacji', text_en: 'site supervision and support during execution' },
  { title_pl: 'Infrastruktura techniczna', title_en: 'Technical infrastructure', text_pl: 'koordynacja infrastruktury sanitarnej, elektroenergetycznej i teletechnicznej', text_en: 'coordination of sanitary, power and telecoms infrastructure' },
]

export default function ONasPage({ lang, dict }: Props) {
  const d = (dict as any).o_nas_page
  const base = lang === 'en' ? '/en' : ''
  const isEn = lang === 'en'

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/heromain.png"
            alt={d.hero_title}
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>{d.hero_eyebrow}</span>
          <h1 className={styles.heroTitle}>{d.hero_title}</h1>
          <p className={styles.heroSub}>{d.hero_sub}</p>
        </div>
      </section>

      {/* OŚ CZASU */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{d.timeline_eyebrow}</span>
        </div>
        <Timeline items={timelineItems} lang={lang} />
      </section>

      {/* KOMPETENCJE */}
      <section className={styles.competences}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{d.competences_eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.competences_title}</h2>
        </div>
        <div className={styles.competencesGrid}>
          {competences.map(c => (
            <div key={c.title_pl} className={styles.competenceCard}>
              <h3 className={styles.competenceTitle}>{isEn ? c.title_en : c.title_pl}</h3>
              <p className={styles.competenceText}>{isEn ? c.text_en : c.text_pl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JAK PRACUJEMY */}
      <section className={styles.process}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{d.process_eyebrow}</span>
          <h2 className={styles.sectionTitle}>{d.process_title}</h2>
        </div>
        <div className={styles.processGrid}>
          {[
            [(dict as any).process.step1_num, (dict as any).process.step1_title, (dict as any).process.step1_text],
            [(dict as any).process.step2_num, (dict as any).process.step2_title, (dict as any).process.step2_text],
            [(dict as any).process.step3_num, (dict as any).process.step3_title, (dict as any).process.step3_text],
            [(dict as any).process.step4_num, (dict as any).process.step4_title, (dict as any).process.step4_text],
          ].map(([num, title, text]) => (
            <div key={num} className={styles.processStep}>
              <span className={styles.processNum}>{num}</span>
              <h3 className={styles.processStepTitle}>{title}</h3>
              <p className={styles.processText}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>{d.cta_title}</h2>
        <p className={styles.ctaSub}>{d.cta_sub}</p>
        <Link href={`${base}/#kontakt`} className={styles.ctaBtn}>
          {d.cta_btn}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </section>
    </>
  )
}
