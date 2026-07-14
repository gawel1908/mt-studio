"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const SECTIONS = ["zespol", "wspolpraca", "kontakt"];

interface NavDict {
  strona_glowna: string;
  o_nas: string;
  projekty: string;
  wspolpraca: string;
  wspolpraca_miedzynarodowa: string;
  zespol: string;
  kontakt: string;
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
  const cls = (active: boolean) => (active ? styles.active : "");

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href={base || "/"} className={styles.logo}>
          <img src="/mtp-logo.png" alt="MT Projekt" height={36} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <Link href={base || "/"} className={cls(!isProjects && !isAbout && activeSection === null)}>
            {dict.strona_glowna}
          </Link>
          <Link href={`${base}/o-nas`} className={cls(isAbout)}>
            {dict.o_nas}
          </Link>
          <Link href={`${base}/projekty`} className={cls(isProjects)}>
            {dict.projekty}
          </Link>

          <a href={`${base}/#wspolpraca`} className={cls(activeSection === "wspolpraca")}>
            {dict.wspolpraca}
          </a>

          <Link href={`${base}/#zespol`} className={cls(activeSection === "zespol")}>
            {dict.zespol}
          </Link>
          <Link href={`${base}/#kontakt`} className={cls(activeSection === "kontakt")}>
            {dict.kontakt}
          </Link>
        </nav>

        <div className={styles.right}>
          <Link href={switchPath} className={styles.langSwitch}>
            {lang === "pl" ? "EN" : "PL"}
          </Link>
          <a href={`${base}/#kontakt`} className={styles.cta}>
            {dict.zapytanie}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
