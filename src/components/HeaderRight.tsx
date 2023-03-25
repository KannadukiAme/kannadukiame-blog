import Search from '@components/Search'
import DarkMode from '@components/DarkMode'
import siteConfig from '@utils/config'

type Props = {
  pathname: string
}

function getPrevUrl(url: string) {
  const regex = /[\w'-]*[\\/]$/g
  const parentPath = url.replace(regex, '')

  return parentPath
}

export default function HeaderRight({ pathname }: Props) {
  return (
    <div className="flex px-2 py-2 space-x-6 items-center">
      <div className="flex space-x-6 text-gray-300">
        {siteConfig.nav.map(({ name, href, active }, index) => (
          <a
            key={index}
            className={`font-bold hover:text-sora ${
              getPrevUrl(pathname) === active ? 'text-sora' : ''
            } `}
            href={href}
          >
            <span>{name}</span>
          </a>
        ))}
      </div>
      <div className="flex space-x-6 text-gray-900 dark:text-gray-50  before:border-l before:mr-6">
        <Search />
        <DarkMode />
        <a
          href="https://github.com/KannadukiAme/kannadukiame-blog"
          target="_blank"
        >
          <i className="w-4 h-4 fa-brands fa-github hover:text-gray-500"></i>
        </a>
      </div>
    </div>
  )
}
