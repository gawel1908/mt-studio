import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" fill="var(--accent)"/>
              <path d="M6 22L14 6L22 22H17.5L14 15.2L10.5 22H6Z" fill="white"/>
            </svg>
            Studio Projektowe
          </div>
          <p className={styles.tagline}>Architektura oparta na kontekście</p>
        </div>
        <nav className={styles.links}>
          <Link href="/projekty">Projekty</Link>
          <Link href="/#o-nas">O nas</Link>
          <Link href="/#kontakt">Kontakt</Link>
        </nav>
        <div className={styles.right}>
          <p>studio@example.pl</p>
          <p>© {year} Studio Projektowe</p>
        </div>
      </div>
    </footer>
  )
}
