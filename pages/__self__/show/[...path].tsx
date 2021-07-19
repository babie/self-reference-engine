import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import npath from 'path'
import fg from 'fast-glob'
import { getFile } from '../../../lib/markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const cwd = npath.join(process.cwd(), 'public')
  const files = fg('**/*.md', {
    cwd,
    onlyFiles: true,
    followSymbolicLinks: false,
  })
  const paths = [...(await files)].map((file) => {
    const path = file.replace(/\.md$/, '.html').split(npath.sep)
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
    [key: string]: string
  }
  html: string
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params && params.path && typeof params.path !== 'string') {
    const path = npath.sep + params.path.join(npath.sep)
    const props: Props = await getFile(path.replace(/\.html$/, '.md'))
    return { props }
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
