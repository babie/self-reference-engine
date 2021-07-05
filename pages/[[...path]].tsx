import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import npath from 'path'
import fg from 'fast-glob'
import { getFullpath, getFile, getIndex, isFile, isDir } from '../lib/markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const cwd = npath.join(process.cwd(), 'public')
  const files = await fg('**/*.md', { cwd, onlyFiles: true })
  const paths = files
    .map((file) => {
      return file
        .replace(/\.md$/, '')
        .split(npath.sep)
        .reduce<string[][]>(
          (acc, p) => (acc[0] ? [[...acc[0], p], ...acc] : [[p]]),
          []
        )
    })
    .flat()
    .map((path) => ({
      params: {
        path,
      },
    }))

  return {
    paths,
    fallback: false,
  }
}

type Props = {
  meta: {
    [key: string]: any
  }
  html: string
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params && params.path && typeof params.path !== 'string') {
    const path = params.path.join(npath.sep)
    let props: Props
    if (isDir(path)) {
      // dir: show index
      props = await getIndex(path)
      return { props }
    } else if (isFile(path + '.md')) {
      // file: show markdown
      props = await getFile(path + '.md')
      return { props }
    }
  }
  return { notFound: true }
}

const Show: React.FC<Props> = ({ meta, html }) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <main>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    </>
  )
}

export default Show
