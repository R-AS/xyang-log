import { NAMES } from '@/config/blog'

// 获取文件名中文名
const getDirName = (key: string) => {
  if (!key) return ''

  // 从外层搜索
  if (NAMES[key]) return NAMES[key].name
  // 逐层搜索
  const tabs = Object.keys(NAMES)
  for (let i = 0; i < tabs.length; i += 1) {
    const child = NAMES[tabs[i]].children
    const dirName = child[key]
    if (dirName) return dirName
  }
  return key
}

export default getDirName
