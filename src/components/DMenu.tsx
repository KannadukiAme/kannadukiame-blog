import type { CollectionEntry } from 'astro:content'
import { useEffect, useRef, useState } from 'react'

type Props = {
  posts: CollectionEntry<'blog'>[]
}

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function DMenu({ posts }: Props) {
  const dMenuBox = useRef<HTMLDivElement>(null)
  const dMenuPanel = useRef<HTMLDivElement>(null)
  const dMenuInput = useRef<HTMLInputElement>(null)

  const [searchResult, setSearchResult] = useState<CollectionEntry<'blog'>[]>(
    []
  )
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 500)
  useEffect(() => {
    if (debouncedSearchText !== '') {
      const resultsByTitle = posts.filter((post) =>
        post.data.title.includes(debouncedSearchText)
      )
      setSearchResult(resultsByTitle)
    } else {
      setSearchResult([])
    }
  }, [debouncedSearchText])

  const [isEnabled, setIsEnabled] = useState(() => {
    window.addEventListener('keyup', (ev) => {
      if (ev.altKey && ev.shiftKey && ev.key === 'P') {
        document.documentElement.classList.add('overflow-hidden')
        setSearchResult([])
        setIsEnabled(true)
      } else if (ev.key === 'Escape') {
        setIsEnabled(false)
      }
    })

    return false
  })

  useEffect(() => {
    if (dMenuBox.current) {
      dMenuBox.current.addEventListener('click', () => {
        setIsEnabled(false)
      })
    }

    if (isEnabled === false) {
      document.documentElement.classList.remove('overflow-hidden')
    }

    if (dMenuInput.current) {
      dMenuInput.current.focus()
    }
  }, [isEnabled])

  return (
    isEnabled && (
      <div
        className="absolute w-screen h-screen top-0 left-0 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)]"
        ref={dMenuBox}
      >
        <div
          ref={dMenuPanel}
          className="w-[800px] m-auto mt-[100px] bg-gray-100 dark:bg-gray-800 dark:text-gray-50"
        >
          <input
            ref={dMenuInput}
            placeholder="Search"
            className="w-full border dark:bg-gray-800 border-sora focus:outline-none px-2 py-1 dark:text-gray-50 placeholder:italic dark:placeholder:text-gray-200"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <div>
            {searchResult.map((item, index) => (
              <a
                key={index}
                href={`/posts/${item.slug}`}
                className=" hover:bg-sora block"
              >
                <div className="px-2 py-1">{item.data.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  )
}
