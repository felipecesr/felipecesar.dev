import Link from 'next/link'

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
  <nav className='px-8 py-10 flex'>
    <Link href="/" className='text-xl'><h1>Felipe César</h1></Link>
    <div className='ml-auto'>
      <button className='w-14 h-14 flex items-center justify-center border-2 border-gray-600 rounded-full'>
        <span className='hidden'>Menu</span>
        <span className='btn-menu'></span>
      </button>
    </div>
    <ul className='hidden md:flex'>
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
