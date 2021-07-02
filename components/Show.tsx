import { GetStaticProps } from 'next'

const Show = () => {
  return <div>Show</div>
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  }
}

export { Show }
