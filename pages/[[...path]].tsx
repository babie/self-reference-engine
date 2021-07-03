import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import npath from 'path'
import fg from 'fast-glob'

const getContent = async (fullpath: string): Promise<Props> => {
  const md = fs.readFileSync(fullpath, { encoding: 'utf-8' })
  // TODO: markdown to html
  const title = 'Pseudo Title'
  const html = md
  return { title, html }
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
  title: string
  html: string
}
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params && params.path && typeof params.path !== 'string') {
    const fullpath = npath.join(
      process.cwd(),
      'public',
      `${params.path.join('/')}.md`
    )
    const { title, html } = await getContent(fullpath)
    return {
      props: {
        title,
        html,
      },
    }
  }
  return { notFound: true }
}

const Show: React.FC<Props> = ({ title, html }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <article>
          <h1>{title}</h1>
          <div>{html}</div>
          {/*
            <div dangerouslySetInnerHTML={{ __html: html }} />
          */}
        </article>
      </main>
    </>
  )
}

export default Show
