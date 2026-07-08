"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const SECTIONS = ["o-nas", "zespol", "wspolpraca", "kontakt"];

interface NavDict {
  strona_glowna: string;
  o_nas: string;
  projekty: string;
  wspolpraca: string;
  wspolpraca_krajowa: string;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const base = lang === "en" ? "/en" : "";
    const isHome = pathname === base || pathname === base + "/";
    if (!isHome) { setActiveSection(null); return; }

    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
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

          {/* Dropdown Współpraca */}
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={`${styles.dropdownToggle} ${cls(activeSection === "wspolpraca")}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {dict.wspolpraca}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <a href={`${base}/#wspolpraca`} className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                  {dict.wspolpraca_krajowa}
                </a>
                <a href={`${base}/#wspolpraca`} className={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                  {dict.wspolpraca_miedzynarodowa}
                </a>
              </div>
            )}
          </div>

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
