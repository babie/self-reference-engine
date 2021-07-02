type Props = {
  path: string[]
}
const Tree = ({ path }: Props) => {
  return <div>Tree - {path.join('/')}</div>
}

export { Tree }
