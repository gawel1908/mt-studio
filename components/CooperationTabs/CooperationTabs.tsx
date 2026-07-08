'use client'

import { useState } from 'react'
import styles from './CooperationTabs.module.css'

interface Props {
  dict: {
    tab_pl: string
    tab_en: string
    pl_col1_title: string
    pl_col1_items: string[]
    pl_col2_title: string
    pl_col2_items: string[]
    pl_cta: string
    en_col1_title: string
    en_col1_items: string[]
    en_col2_title: string
    en_col2_items: string[]
    en_cta: string
  }
}

export default function CooperationTabs({ dict }: Props) {
  const [active, setActive] = useState<'pl' | 'en'>('pl')

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${active === 'pl' ? styles.tabActive : ''}`}
          onClick={() => setActive('pl')}
        >
          {dict.tab_pl}
        </button>
        <button
          className={`${styles.tab} ${active === 'en' ? styles.tabActive : ''}`}
          onClick={() => setActive('en')}
        >
          {dict.tab_en}
        </button>
      </div>

      {active === 'pl' && (
        <div className={styles.content}>
          <div className={styles.cols}>
            <div>
              <h3 className={styles.colTitle}>{dict.pl_col1_title}</h3>
              <ul className={styles.list}>
                {dict.pl_col1_items.map(item => (
                  <li key={item}><span>›</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.colTitle}>{dict.pl_col2_title}</h3>
              <ul className={styles.list}>
                {dict.pl_col2_items.map(item => (
                  <li key={item}><span>›</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.ctaRow}>
            <button className={styles.cta}>
              {dict.pl_cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}

      {active === 'en' && (
        <div className={styles.content}>
          <div className={styles.cols}>
            <div>
              <h3 className={styles.colTitle}>{dict.en_col1_title}</h3>
              <ul className={styles.list}>
                {dict.en_col1_items.map(item => (
                  <li key={item}><span>›</span>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.colTitle}>{dict.en_col2_title}</h3>
              <ul className={styles.list}>
                {dict.en_col2_items.map(item => (
                  <li key={item}><span>›</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.ctaRow}>
            <button className={styles.cta}>
              {dict.en_cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
