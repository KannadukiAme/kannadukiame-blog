// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/main.css'

export default function (Vue, { router, head, isClient }) {
  head.script.push({
    src: "https://kit.fontawesome.com/0f5d15080e.js",
    crossorigin: "anonymous"
  })

  head.link.push({
    rel: "stylesheet",
    href: "/github-markdown.css"
  })
}
