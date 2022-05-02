import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Heading, Text, Box } from 'grommet'
import Layout from '@/components/Layout'
import getDirName from '@/utils/dirNameGetter'

function BlogPost(props) {
  const { data, params, location } = props
  const type = location?.state?.type

  return (
    <Layout title={data.mdx.frontmatter.title}>
      <Box pad='medium'>
        <Heading margin={{ top: '0', bottom: '0.53rem' }}>
          {data.mdx.frontmatter.title}
        </Heading>
        <Text size='small' margin={{ bottom: '0.2rem' }}>
          发布时间：{data.mdx.frontmatter.date}
        </Text>
        <Text size='small' margin={{ bottom: '0.2rem' }}>
          阅读时间：{data?.mdx?.timeToRead} 分钟
        </Text>
        <Text size='small' margin={{ bottom: '0.5rem' }}>
          分类：{getDirName(params?.slug)}
          {type ? ` - ${getDirName(type)}` : ''}
        </Text>
        <Box style={{ borderBottom: '1px solid' }} />
        <Box style={{ fontSize: '20px' }}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Box>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
      }
      body
      timeToRead
      id
    }
  }
`

export default BlogPost
