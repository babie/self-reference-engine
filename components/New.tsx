type Props = {
  path: string[]
}
const New = ({ path }: Props) => {
  return <div>New - {path.join('/')}</div>
}

export { New }
