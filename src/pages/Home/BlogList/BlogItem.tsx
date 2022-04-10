import React from 'react'
import { Link } from 'gatsby'
import { Card, CardHeader, CardBody, CardFooter } from 'grommet/components'
import { TBlog } from '@/pages/Home/types'

type TProps = {
  item: TBlog
}
function BlogItem(props: TProps) {
  const { item } = props
  const link = item.fileAbsolutePath.match(/src(.+).mdx/)?.[1] ?? ''
  return (
    <Link to={link}>
      <Card gridArea={item.id} height='small' width='auto' background='light-1'>
        <CardHeader pad='medium'>Header</CardHeader>
        <CardBody pad='medium'>{item.title}</CardBody>
        <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
          {item.date}
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BlogItem
