import React, { useState, useMemo, useEffect } from 'react'
import { Grid, Pagination } from 'grommet/components'
import { TBlog } from '@/pages/Home/types'
import BlogItem from './BlogItem'

type TProps = {
  list: TBlog[]
}

const step = 8 // 每页 item 个数

function BlogList(props: TProps) {
  const { list } = props
  const [blogs, setBlogs] = useState<TBlog[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(1)

  useEffect(() => {
    const start = (activeIndex - 1) * step
    const end = activeIndex * step
    setBlogs(list.slice(start, end))
  }, [list, activeIndex])

  const gridConf = useMemo(() => {
    const rows = ['small', 'small', 'small']
    const columns = ['auto', 'auto', 'auto', 'auto']

    const areas = blogs.map((item: TBlog, index) => {
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
        start: [colStart, rowStart],
        end: [colEnd, rowEnd],
      }
    })
    // 分页器
    areas.push({
      name: 'pagination',
      start: [0, 2],
      end: [3, 2],
    })
    return {
      rows,
      columns,
      gap: 'medium',
      areas,
    }
  }, [blogs])

  const onPageChange = ({ page }) => {
    const start = (page - 1) * step
    const end = page * step
    setBlogs(list.slice(start, end))
    setActiveIndex(page)
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid {...gridConf}>
      {blogs.map((blog: TBlog) => (
        <BlogItem key={blog.id} item={blog} />
      ))}
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
    </Grid>
  )
}

export default BlogList
