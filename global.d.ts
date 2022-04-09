declare module '*.less'
declare module '*.module.less' {
  const classes: { readonly [k: string]: string }
  export default classes
}
