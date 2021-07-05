import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import npath from 'path'
import fg from 'fast-glob'
import { getMarkdown } from '../lib/markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fg
    .sync('**/*.md', {
      cwd: npath.join(process.cwd(), 'public'),
      onlyFiles: true,
    })
    .map((file) => ({
      params: {
        path: file.replace(/\.md$/, '').split('/'),
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
    const fullpath = npath.join(
      process.cwd(),
      'public',
      `${npath.join(...params.path)}.md`
    )
    const props = await getMarkdown(fullpath)
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
