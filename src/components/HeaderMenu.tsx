import Search from '@components/Search'
import DarkMode from '@components/DarkMode'
import siteConfig from '@utils/config'

type Props = {
  pathname: string
}

const menu = [
  {
    href: 'https://github.com/KannadukiAme/kannadukiame-blog',
    name: 'GITHUB',
  },
]

export default function HeaderMenu({ pathname }: Props) {
  return (
    <nav
      id="menu"
      className="hidden sm:hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-400 "
    >
      {siteConfig.nav.map((item) => (
        <a
          className={`block p-2 dark:hover:text-white ${
            pathname === item.href ? 'text-sora font-bold' : ''
          }`}
          href={item.href}
        >
          <span>{item.name}</span>
        </a>
      ))}
    </nav>
  )
}
