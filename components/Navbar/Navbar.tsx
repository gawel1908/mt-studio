"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import SocialIcons from "@/components/SocialIcons/SocialIcons";

const SECTIONS = ["o-nas", "zespol", "kontakt"];

interface NavDict {
  start: string;
  projekty: string;
  o_nas: string;
  zespol: string;
  kontakt: string;
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

  const otherLang = lang === "pl" ? "en" : "pl";
  // pl → add /en prefix; en → remove /en prefix
  const switchPath =
    lang === "en"
      ? pathname.replace(/^\/en/, "") || "/"
      : `/en${pathname}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const base = lang === "en" ? "/en" : "";
    const isHome = pathname === base || pathname === base + "/";
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname, lang]);

  const base = lang === "en" ? "/en" : "";
  const isHome = pathname === base || pathname === base + "/";
  const isProjects = pathname.startsWith(`${base}/projekty`);

  const cls = (active: boolean) => (active ? styles.active : "");

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link href={base || "/"} className={styles.logo}>
          <img src="/mtp-logo.png" alt="MT Projekt" height={36} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <Link href={`${base}/projekty`} className={cls(isProjects)}>
            {dict.projekty}
          </Link>
          <Link href={`${base}/#o-nas`} className={cls(activeSection === "o-nas")}>
            {dict.o_nas}
          </Link>
          <Link href={`${base}/#zespol`} className={cls(activeSection === "zespol")}>
            {dict.zespol}
          </Link>
          <Link
            href={`${base}/#kontakt`}
            className={`${styles.contactLink} ${cls(activeSection === "kontakt")}`}
          >
            {dict.kontakt}
          </Link>
        </nav>

        <div className={styles.right}>
          <SocialIcons className={styles.navSocials} />
          <Link href={switchPath} className={styles.langSwitch}>
            {otherLang.toUpperCase()}
          </Link>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
