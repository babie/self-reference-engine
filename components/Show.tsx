import { GetStaticProps } from 'next'

type Props = {
  path: string[]
}
const Show = ({ path }: Props) => {
  return <div>Show - {path.join('/')}</div>
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  }
}

export { Show }
