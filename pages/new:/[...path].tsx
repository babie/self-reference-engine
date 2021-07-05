import { useRouter } from 'next/router'
import Breadcrumbs from '../../components/Breadcrumbs'
import { sanitize } from '../../lib/path'

const New = () => {
  const router = useRouter()
  const { path } = router.query

  if (path && typeof path !== 'string') {
    const spath = sanitize(path)

    return (
      <main>
        <Breadcrumbs path={spath.slice(0, path.length - 1)} />
      </main>
    )
  }
  return <div>Error</div>
}

export default New
