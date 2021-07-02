import { useRouter } from 'next/router'
import { Tree, Show, New, Edit } from '../components'

type Route = {
  action: 'tree' | 'show' | 'new' | 'edit'
  path: string[]
}

const getRoute = (path: string | string[] | undefined): Route => {
  if (path && typeof path !== 'string') {
    switch (path[0]) {
      case 'tree:':
        return { action: 'tree', path: path.slice(1) }
      case 'new:':
        return { action: 'new', path: path.slice(1) }
      case 'edit:':
        return { action: 'edit', path: path.slice(1) }
      default:
        return { action: 'show', path: path }
    }
  }
  return { action: 'show', path: [] }
}

const RouteSwitch = () => {
  const router = useRouter()
  const { path } = router.query

  const route = getRoute(path)
  switch (route.action) {
    case 'tree':
      return <Tree />
    case 'new':
      return <New />
    case 'edit':
      return <Edit />
  }
  return <Show />
}

export default RouteSwitch
