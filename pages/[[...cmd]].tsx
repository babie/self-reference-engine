import { useRouter } from 'next/router'
import { Tree, Show, New, Edit } from '../components'

const selectComponent = (cmd: string | string[] | undefined): JSX.Element => {
  if (cmd && typeof cmd !== 'string') {
    switch (cmd[0]) {
      case 'tree:':
        return <Tree path={cmd.slice(1)} />
      case 'new:':
        return <New path={cmd.slice(1)} />
      case 'edit:':
        return <Edit path={cmd.slice(1)} />
      default:
        return <Show path={cmd} />
    }
  }
  return <Show path={[]} />
}

const SwitchComponent = () => {
  const router = useRouter()
  const { cmd } = router.query

  return selectComponent(cmd)
}

export default SwitchComponent
