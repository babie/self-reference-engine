import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import npath from 'path'
import fg from 'fast-glob'
import { getFullpath, getFile, getIndex, isFile, isDir } from '../lib/markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const cwd = npath.join(process.cwd(), 'public')
  const dirs = fg('**/*', { cwd, onlyDirectories: true })
  const files = fg('**/*.md', { cwd, onlyFiles: true })
  const paths = [...(await dirs), ...(await files)].map((fd) => {
    const path = fd.replace(/\.md$/, '').split(npath.sep)
    return {
      params: {
        path,
      },
    }
  })

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
    const path = '/' + params.path.join(npath.sep)
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
