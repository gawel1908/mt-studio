import { getAllProjects } from '@/lib/mockData'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import styles from './projekty.module.css'

const categories = ['Wszystkie', 'Mieszkaniowe', 'Komercyjne', 'Wnętrza', 'Użyteczność publiczna']

export default function ProjektyPage() {
  const projects = getAllProjects()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projekty</h1>
        <p className={styles.count}>{projects.length} realizacji</p>
      </div>

      {/* Category filter — static for now, JS filtering can be added */}
      <div className={styles.filters}>
        {categories.map(cat => (
          <button key={cat} className={`${styles.filter} ${cat === 'Wszystkie' ? styles.filterActive : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {projects.map((project, i) => {
          // Asymmetric pattern: 0=large, 1=small, 2=small, 3=large, ...
          const pattern = i % 4
          const size = (pattern === 0 || pattern === 3) ? 'large' : 'medium'
          return (
            <div key={project.id} className={`${styles.gridItem} ${styles[`item${pattern}`]}`}>
              <ProjectCard project={project} size={size} />
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
