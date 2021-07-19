import type { NextRouter } from 'next/router'
import { withRouter } from 'next/router'

type Props = {
  router: NextRouter
}
const Tree: React.FC<Props> = ({ router }) => {
  const path = router.query && router.query.path
  let pathname = '/'
  if (path && typeof path !== 'string') {
    pathname = path.reduce<string[]>((acc, p) => [...acc, `/${p}`], []).join('')
  }
  return <div>Tree {pathname}</div>
}

export default withRouter(Tree)
