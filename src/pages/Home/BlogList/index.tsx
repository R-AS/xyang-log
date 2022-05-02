import React, { useState, useMemo, useEffect, useContext } from 'react'
import { Grommet } from 'grommet'
import { Grid, Pagination } from 'grommet/components'
import LayoutContext from '@/utils/layoutContext'
import { TBlog } from '@/pages/Home/types'
import BlogItem from './BlogItem'
import * as styles from './index.module.less'

type TProps = {
  list: TBlog[]
}

const step = 8 // 每页 item 个数

function BlogList(props: TProps) {
  const { list } = props
  const [blogs, setBlogs] = useState<TBlog[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(1)

  const useLayoutContext = useContext(LayoutContext)

  const isSmallScreen = useMemo(
    () => useLayoutContext.size === 'small',
    [useLayoutContext.size]
  )

  useEffect(() => {
    // 小屏不分页
    if (isSmallScreen) {
      setBlogs(list)
    } else {
      const start = (activeIndex - 1) * step
      const end = activeIndex * step
      setBlogs(list.slice(start, end))
    }
  }, [list, activeIndex, isSmallScreen])

  const gridConf = useMemo(() => {
    const rows = isSmallScreen
      ? Array.from(new Array(blogs.length), () => 'medium')
      : ['small', 'small', 'small']
    const columns = isSmallScreen
      ? ['medium']
      : ['small', 'small', 'small', 'small']

    const areas = blogs.map((item: TBlog, index) => {
      // 小屏网格计算
      const smallColStart = 0
      const smallColEnd = 0
      const smallRowStart = index
      const smallRowEnd = index
      // 中大屏网格计算
      const rowColCount = step / 2 // 一行 col 个数
      const colStart = Math.floor(index / rowColCount)
        ? index - rowColCount
        : index
      let colEnd =
        (Math.floor(index / rowColCount) ? index - rowColCount : index) + 1
      colEnd = colEnd >= rowColCount ? 3 : colEnd
      const rowStart = index < rowColCount ? 0 : 1
      const rowEnd = 1
      return {
        name: item.id,
        start: isSmallScreen
          ? [smallColStart, smallRowStart]
          : [colStart, rowStart],
        end: isSmallScreen ? [smallColEnd, smallRowEnd] : [colEnd, rowEnd],
      }
    })
    if (!isSmallScreen) {
      // 分页器
      areas.push({
        name: 'pagination',
        start: [0, 2],
        end: [3, 2],
      })
    }
    return {
      rows,
      columns,
      gap: 'medium',
      areas,
    }
  }, [blogs.length, isSmallScreen])

  const onPageChange = ({ page }) => {
    const start = (page - 1) * step
    const end = page * step
    setBlogs(list.slice(start, end))
    setActiveIndex(page)
  }

  return (
    <Grommet
      theme={{
        pagination: {
          button: {
            color: 'light-1',
            active: {
              color: 'status-ok',
            },
          },
        },
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Grid className={styles.blogList} {...gridConf} justifyContent='center'>
        {blogs.map((blog: TBlog) => (
          <BlogItem key={blog.id} item={blog} />
        ))}
        {!isSmallScreen && (
          <Pagination
            gridArea='pagination'
            margin={{
              left: 'auto',
              right: 'auto',
            }}
            numberItems={list.length}
            step={step}
            page={activeIndex}
            onChange={onPageChange}
          />
        )}
      </Grid>
    </Grommet>
  )
}

export default BlogList
