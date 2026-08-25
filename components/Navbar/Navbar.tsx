"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const SECTIONS = ["zespol", "wspolpraca"];

interface NavDict {
  strona_glowna: string;
  o_nas: string;
  projekty: string;
  wspolpraca: string;
  wspolpraca_miedzynarodowa: string;
  zespol: string;
  kontakt: string;
  kariera: string;
  zapytanie: string;
}

interface Props {
  lang: string;
  dict: NavDict;
}

export default function Navbar({ lang, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();

  const switchPath =
    lang === "en"
      ? pathname.replace(/^\/en/, "") || "/"
      : `/en${pathname}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const base = lang === "en" ? "/en" : "";
    const isHome = pathname === base || pathname === base + "/";
    if (!isHome) { setActiveSection(null); return; }

    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setActiveSection((prev) => {
            if (entry.isIntersecting) return id;
            return prev === id ? null : prev;
          });
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname, lang]);

  const base = lang === "en" ? "/en" : "";
  const isProjects = pathname.startsWith(`${base}/projekty`);
  const isAbout = pathname === `${base}/o-nas`;
  const isKariera = pathname === `${base}/kariera`;
  const cls = (active: boolean) => (active ? styles.active : "");

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href={base || "/"} className={styles.logo}>
          <img src="/mtp-logo.png" alt="MT Projekt" height={36} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <Link href={base || "/"} className={cls(!isProjects && !isAbout && !isKariera && activeSection === null)} onClick={() => setMenuOpen(false)}>
            {dict.strona_glowna}
          </Link>
          <Link href={`${base}/o-nas`} className={cls(isAbout)} onClick={() => setMenuOpen(false)}>
            {dict.o_nas}
          </Link>
          <Link href={`${base}/projekty`} className={cls(isProjects)} onClick={() => setMenuOpen(false)}>
            {dict.projekty}
          </Link>

          <Link href={`${base}/#zespol`} className={cls(activeSection === "zespol")} onClick={() => setMenuOpen(false)}>
            {dict.zespol}
          </Link>

          <a href={`${base}/#wspolpraca`} className={cls(activeSection === "wspolpraca")} onClick={() => setMenuOpen(false)}>
            {dict.wspolpraca}
          </a>
          <Link href={`${base}/kariera`} className={cls(isKariera)} onClick={() => setMenuOpen(false)}>
            {dict.kariera}
          </Link>
        </nav>

        <div className={styles.right}>
          <Link href={switchPath} className={styles.langSwitch}>
            {lang === "pl" ? "EN" : "PL"}
          </Link>
          <a href={`${base}/#kontakt`} className={styles.cta} onClick={() => setMenuOpen(false)}>
            {dict.kontakt}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
