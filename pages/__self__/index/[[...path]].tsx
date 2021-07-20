import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import npath from 'path'
import fg from 'fast-glob'
import { getIndex } from '../../../lib/markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const cwd = npath.join(process.cwd(), 'public')
  const dirs = fg('**/*', {
    cwd,
    onlyDirectories: true,
    followSymbolicLinks: false,
  })
  const paths = [...(await dirs)].map((dir) => {
    const path = dir.split(npath.sep)
    return {
      params: {
        path,
      },
    }
  })

  return {
    // add public root
    paths: [{ params: { path: undefined } }, ...paths],
    fallback: false,
  }
}

type Props = {
  path: string[]
  dirs: string[]
  files: string[]
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params) {
    let path: string[] = []
    if (params.path && typeof params.path !== 'string') {
      path = params.path
    }
    const props: Props = await getIndex(path)
    return { props }
  }
  return { notFound: true }
}

const Index: React.FC<Props> = ({ path, dirs, files }) => {
  const pathname = path
    .reduce<string[]>((acc, p) => [...acc, `/${p}`], [])
    .join('')
  const isRoot = pathname === ''

  return (
    <>
      <Head>
        <title>{pathname}</title>
      </Head>
      <main>
        <ul>
          {isRoot ? undefined : (
            <li>
              <Link href={[pathname, '..'].join('/')}>..</Link>
            </li>
          )}
          {dirs.map((dir) => (
            <li key={dir}>
              <Link href={[pathname, dir].join('/')}>{dir}</Link>
            </li>
          ))}
          {files.map((file) => (
            <li key={file}>
              <Link href={[pathname, file.replace(/\.md$/, '.html')].join('/')}>
                {file.replace(/\.md$/, '.html')}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Index
