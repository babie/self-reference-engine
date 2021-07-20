import fs from 'fs'
import npath from 'path'
import { micromark } from 'micromark'
import matter from 'gray-matter'
import fg from 'fast-glob'

export const getFullpath = (path: string[]): string => {
  return npath.join(process.cwd(), 'public', ...path)
}

export type GetFile = (
  path: string[]
) => Promise<{ meta: { [key: string]: string }; html: string }>

export const getFile: GetFile = async (path) => {
  const fullpath = getFullpath(path)
  const mdbuf = fs.readFileSync(fullpath, { encoding: 'utf-8' })
  const mdobj = matter(mdbuf)

  const meta = mdobj.data
  const html = micromark(mdobj.content)

  return { meta, html }
}

export type GetIndex = (
  path: string[]
) => Promise<{ path: string[]; dirs: string[]; files: string[] }>

export const getIndex: GetIndex = async (path) => {
  const fullpath = getFullpath(path)
  const dirs = await fg('*', { cwd: fullpath, onlyDirectories: true })
  const files = await fg('*.md', { cwd: fullpath, onlyFiles: true })

  return { path, dirs, files }
}
