import { useRouter } from 'next/router'
import Breadcrumbs from '../../components/Breadcrumbs'

const New = () => {
  const router = useRouter()
  const { path } = router.query

  if (path && typeof path !== 'string') {
    return (
      <>
        <main>
          <Breadcrumbs path={path.slice(0, path.length - 1)} />
        </main>
      </>
    )
  }
  return <div>Error</div>
}

export default New
