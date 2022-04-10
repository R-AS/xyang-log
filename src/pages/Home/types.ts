// Menu
export type TTab = {
  name: string
  id: string
  dir: string
}
export type TBlog = {
  title: string
  date: string
  id: string
  fileAbsolutePath: string
}
export type TMenuData = {
  allDirectory: {
    nodes: TTab[]
  }
  allMdx: {
    nodes: Array<{
      frontmatter: {
        title: string
        date: string
      }
      id: string
      fileAbsolutePath: string
    }>
  }
}
