import React from 'react'
import { navigate } from 'gatsby'
import { Card, CardBody, CardFooter, Text, Image } from 'grommet/components'
import { TBlog } from '@/pages/Home/types'
import * as styles from './BlogItem.module.less'

type TProps = {
  item: TBlog
  activeTabName: string
}
function BlogItem(props: TProps) {
  const { item, activeTabName } = props

  const onClick = () => {
    const link = item.fileAbsolutePath.match(/src(.+).mdx/)?.[1] ?? ''
    navigate(link, { state: { type: activeTabName } })
  }

  return (
    <Card
      gridArea={item.id}
      height='auto'
      width='auto'
      background='light-1'
      onClick={onClick}
    >
      <CardBody justify='end' className={styles.cardBody}>
        <Image className={styles.cardImg} fit='cover' src={item.thumbnail} />
        <Text color='light-1' className={styles.cardTitle}>
          {item.title}
        </Text>
      </CardBody>
      <CardFooter
        className={styles.cardDate}
        pad={{ horizontal: 'small' }}
        background='light-2'
      >
        {item.date}
      </CardFooter>
    </Card>
  )
}

export default BlogItem
