import fs from 'fs'
import npath from 'path'
import { micromark } from 'micromark'
import matter from 'gray-matter'
import fg from 'fast-glob'

export const getFullpath = (path: string): string => {
  return npath.join(process.cwd(), 'public', path)
}

export const isFile = (filepath: string): boolean => {
  const fullpath = getFullpath(filepath)
  return fs.existsSync(fullpath) && fs.statSync(fullpath).isFile()
}

export const isDir = (dirpath: string): boolean => {
  const fullpath = getFullpath(dirpath)
  return fs.existsSync(fullpath) && fs.statSync(fullpath).isDirectory()
}

export type GetFile = (
  filepath: string
) => Promise<{ meta: { [key: string]: any }; html: string }>

export const getFile: GetFile = async (filepath) => {
  const fullpath = getFullpath(filepath)
  const mdbuf = fs.readFileSync(fullpath, { encoding: 'utf-8' })
  const mdobj = matter(mdbuf)

  const meta = mdobj.data
  const html = micromark(mdobj.content)

  return { meta, html }
}

export type GetIndex = (
  dirpath: string
) => Promise<{ meta: { [key: string]: any }; html: string }>

export const getIndex: GetIndex = async (dirpath) => {
  const fullpath = getFullpath(dirpath)
  const dirs = fg('*', { cwd: fullpath, onlyDirectories: true })
  const files = fg('*', { cwd: fullpath, onlyFiles: true })
  // TODO: アイコンフォント埋め込み
  const dirlist = (await dirs).map((dir) => `- [${dir}](${dirpath}/${dir})`)
  // TODO: meta.title,datetime 読み込み
  const filelist = (await files).map(
    (file) => `- [${file}](${dirpath}/${file.replace(/\.md$/, '')})`
  )

  const parentdir = `- [..](${dirpath}/..)`
  const list = [parentdir, ...dirlist, ...filelist].join(`\n`)

  // TODO: markdownやめてjsxで描く
  const mdbuf = `---
title: Index of ${dirpath}
---
# Index of ${dirpath}

${list}
  `
  const mdobj = matter(mdbuf)

  const meta = mdobj.data
  const html = micromark(mdobj.content)

  return { meta, html }
}
