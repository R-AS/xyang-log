import React from 'react'
import { navigate } from 'gatsby'
import { Card, CardHeader, CardBody, CardFooter } from 'grommet/components'
import { TBlog } from '@/pages/Home/types'

type TProps = {
  item: TBlog
}
function BlogItem(props: TProps) {
  const { item } = props

  const onClick = () => {
    const link = item.fileAbsolutePath.match(/src(.+).mdx/)?.[1] ?? ''
    navigate(link)
  }

  return (
    <Card
      gridArea={item.id}
      height='small'
      width='auto'
      background='light-1'
      onClick={onClick}
    >
      <CardHeader pad='medium'>Header</CardHeader>
      <CardBody pad='medium'>{item.title}</CardBody>
      <CardFooter pad={{ horizontal: 'small' }} background='light-2'>
        {item.date}
      </CardFooter>
    </Card>
  )
}

export default BlogItem
