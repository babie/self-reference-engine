import { useRouter } from 'next/router'

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
      return <p>tree</p>
    case 'new':
      return <p>new</p>
    case 'edit':
      return <p>edit</p>
  }
  return <p>show</p>
}

export default RouteSwitch
