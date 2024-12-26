import Link from 'next/link'
import styles from './nav.module.css'

const navItems = {
  '/blog': {
    name: 'blog',
  },
  '/eventos': {
    name: 'eventos',
  },
  '/cursos': {
    name: 'cursos',
  },
  '/sobre-mim': {
    name: 'sobre-mim',
  },
}

const Nav = () => (
  <nav className={styles.nav}>
    <h1><a href="/">Felipe César</a></h1>
    <ul>
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <li key={path}>
            <Link href={path}>{name}</Link>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default Nav
