import Link from 'next/link'
import styles from './Footer.module.css'
import SocialIcons from '@/components/SocialIcons/SocialIcons'

interface Props {
  lang: string
  tagline: string
}

export default function Footer({ lang, tagline }: Props) {
  const year = new Date().getFullYear()
  const base = lang === 'en' ? '/en' : ''
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <img src="/mtp-logo.png" alt="MT Projekt" className={styles.logo} />
          <p className={styles.tagline}>{tagline}</p>
          <SocialIcons />
        </div>
        <nav className={styles.links}>
          <Link href={`${base}/projekty`}>Projekty</Link>
          <Link href={`${base}/#o-nas`}>O nas</Link>
          <Link href={`${base}/#zespol`}>Zespół</Link>
          <Link href={`${base}/#kontakt`}>Kontakt</Link>
        </nav>
        <div className={styles.right}>
          <p>studio@example.pl</p>
          <p>© {year} MT Projekt</p>
        </div>
      </div>
    </footer>
  )
}
