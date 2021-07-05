import fs from 'fs'
import { micromark } from 'micromark'
import matter from 'gray-matter'

export type GetMarkdown = (
  fullpath: string
) => Promise<{ meta: { [key: string]: any }; html: string }>

export const getMarkdown: GetMarkdown = async (fullpath) => {
  const mdbuf = fs.readFileSync(fullpath, { encoding: 'utf-8' })
  const mdobj = matter(mdbuf)
  const meta = mdobj.data
  const html = micromark(mdobj.content)

  return { meta, html }
}
