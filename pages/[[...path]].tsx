import type { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next'
import npath from 'path'

/*
export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: traverse `/public` directory
  const publicDir = npath.join(process.cwd(), 'public')
  return {
    paths: [{ params: { path: ['path', 'to', 'file'] } }],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO: read markdown file
  return {
    props: {
      path: [],
    },
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // TODO: read markdown file
  return {
    props: {
      path: [],
    },
  }
}
*/

const Show = () => {
  return <div>Show Show</div>
}

export default Show
