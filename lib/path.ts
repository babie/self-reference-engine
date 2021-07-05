export type Sanitize = (path: string[]) => string[]
export const sanitize: Sanitize = (path) => {
  // TODO: 他に危ない文字列がないか調べる
  // pathはNext.jsがdecodeURIComponent()してくれている
  return path
    .map((val) => val.replace('..', '').normalize())
    .filter((val) => val !== '')
}
