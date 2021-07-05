import Link from 'next/link'

type BreadcrumbsProps = {
  path: string[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  // TODO: Array.prototype.reduce()を使う
  // <Link>がhrefをencodeURIComponent()してくれている
  return (
    <>
      {path.map((v, i) => {
        const href = `/tree:/${[...path.slice(0, i), v].join('/')}`
        return [
          '/',
          <Link key={href} href={href}>
            {v}
          </Link>,
        ]
      })}
    </>
  )
}

export default Breadcrumbs
