type Props = {
  path: string[]
}
const Edit = ({ path }: Props) => {
  return <div>Edit - {path.join('/')}</div>
}

export { Edit }
