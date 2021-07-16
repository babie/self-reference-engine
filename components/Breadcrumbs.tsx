import Link from 'next/link'
import React from 'react'

type BreadcrumbsProps = {
  path: string[]
}

type Acc = {
  href: string
  links: (string | JSX.Element)[]
}
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  // <Link>がhrefをencodeURIComponent()してくれている
  const { links } = path.reduce<Acc>(
    (acc, val) => {
      const href = `${acc.href}/${val}`
      const link = (
        <Link key={`${href}`} href={href}>
          {val}
        </Link>
      )
      return {
        href,
        links: [...acc.links, ' / ', link],
      }
    },
    { href: '/__self__/tree', links: [] }
  )
  return <>{links}</>
}

export default Breadcrumbs
