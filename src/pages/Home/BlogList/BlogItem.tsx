import React from 'react'
import { navigate } from 'gatsby'
import { Card, CardBody, CardFooter, Text, Image } from 'grommet/components'
import { TBlog } from '@/pages/Home/types'
import * as styles from './BlogItem.module.less'

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
      height='auto'
      width='auto'
      background='light-1'
      onClick={onClick}
    >
      <CardBody justify='end' className={styles.cardBody}>
        <Image
          className={styles.cardImg}
          fit='cover'
          src='https://r-as.github.io/static/a5fca259737ffe29bc0d50ea941b53af/2a4de/avatar.png'
        />
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
