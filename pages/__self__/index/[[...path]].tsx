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
  base: string
  dirs: string[]
  files: string[]
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params && typeof params.path !== 'string') {
    let path: string
    if (params.path) {
      path = npath.sep + npath.join(...params.path)
    } else {
      // public root
      path = npath.sep
    }
    const props: Props = await getIndex(path)
    return { props }
  }
  return { notFound: true }
}

const Index: React.FC<Props> = ({ base, dirs, files }) => {
  const isRoot = base === '/' ? true : false

  return (
    <>
      <Head>
        <title>{base}</title>
      </Head>
      <main>
        <ul>
          {isRoot ? undefined : (
            <li>
              <Link href={[base, '..'].join('/')}>..</Link>
            </li>
          )}
          {isRoot
            ? dirs.map((dir) => (
                <li key={dir}>
                  <Link href={['', dir].join('/')}>{dir}</Link>
                </li>
              ))
            : dirs.map((dir) => (
                <li key={dir}>
                  <Link href={[base, dir].join('/')}>{dir}</Link>
                </li>
              ))}
          {isRoot
            ? files.map((file) => (
                <li key={file}>
                  <Link href={['', file].join('/')}>{file}</Link>
                </li>
              ))
            : files.map((file) => (
                <li key={file}>
                  <Link href={[base, file].join('/')}>{file}</Link>
                </li>
              ))}
        </ul>
      </main>
    </>
  )
}

export default Index
