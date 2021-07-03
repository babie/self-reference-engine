import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import npath from 'path'
import fg from 'fast-glob'
import { micromark } from 'micromark'
import gmatter from 'gray-matter'

const getMarkdown = async (fullpath: string): Promise<Props> => {
  const mdbuf = fs.readFileSync(fullpath, { encoding: 'utf-8' })
  const matter = gmatter(mdbuf)
  const meta = matter.data
  const content = micromark(matter.content)
  return { meta, content }
}

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
  content: string
}
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params && params.path && typeof params.path !== 'string') {
    const fullpath = npath.join(
      process.cwd(),
      'public',
      `${params.path.join('/')}.md`
    )
    const { meta, content } = await getMarkdown(fullpath)
    return {
      props: {
        meta,
        content,
      },
    }
  }
  return { notFound: true }
}

const Show: React.FC<Props> = ({ meta, content }) => {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <main>
        <article dangerouslySetInnerHTML={{ __html: content }} />
      </main>
    </>
  )
}

export default Show
