import { getAllProjects } from '@/lib/sanity'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { Dictionary } from '@/lib/dictionaries'
import styles from '@/styles/projekty.module.css'

interface Props {
  lang: string
  dict: Dictionary
}

export default async function ProjektyPage({ lang, dict }: Props) {
  const projects = await getAllProjects(lang)
  const d = dict.projects_page

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{d.title}</h1>
        <p className={styles.count}>{projects.length} {d.count_suffix}</p>
      </div>
      <div className={styles.filters}>
        {d.categories.map((cat: string, i: number) => (
          <button key={cat} className={`${styles.filter} ${i === 0 ? styles.filterActive : ''}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {projects.map((project, i) => {
          const pattern = i % 4
          const size = (pattern === 0 || pattern === 3) ? 'large' : 'medium'
          return (
            <div key={project.id} className={`${styles.gridItem} ${styles[`item${pattern}`]}`}>
              <ProjectCard project={project} size={size} lang={lang} />
              <div className={styles.cardMeta}>
                <span className={styles.cardCategory}>{project.category}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <span className={styles.cardLocation}>{project.location}, {project.year}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
