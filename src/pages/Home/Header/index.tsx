import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Box, Avatar, Text } from 'grommet/components'
import { UserFemale } from 'grommet-icons'
import * as styles from './index.module.less'

const AVATAR_URL = require('@/assets/image/common/avatar.png')?.default

const SOCIALS = [
  {
    key: 'xiaohongshu',
    icon: require('@/assets/image/common/icon-xiaohongshu.png')?.default ?? '',
  },
  {
    key: 'tt',
    icon: require('@/assets/image/common/icon-tt.png')?.default ?? '',
  },
  {
    key: 'toutiao',
    icon: require('@/assets/image/common/icon-toutiao.webp')?.default ?? '',
  },
]

const columns = Array.from(SOCIALS, () => 'xsmall')
const areas = SOCIALS.map((social, index) => ({
  name: social.key,
  start: [index, 0],
  end: [index === SOCIALS.length - 1 ? SOCIALS.length - 1 : index + 1, 0],
}))

function Header() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            desc
          }
        }
      }
    }
  `)
  return (
    <Grid
      rows={['small']}
      columns={['small', 'auto']}
      gap='small'
      areas={[
        { name: 'avatar', start: [0, 0], end: [1, 0] },
        { name: 'info', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box gridArea='avatar' justify='center' align='center'>
        <Avatar src={AVATAR_URL} size='2xl' />
      </Box>
      <Box gridArea='info'>
        <Text margin={{ bottom: 'small' }} color='dark-1'>
          {data?.site?.siteMetadata?.author?.name}
        </Text>
        <Text margin={{ bottom: 'small' }} color='dark-1'>
          {data?.site?.siteMetadata?.author?.desc}
        </Text>
        <Grid rows={['xsmall']} columns={columns} areas={areas}>
          {SOCIALS.map(social => (
            <Avatar
              className={styles.headerSocial}
              gridArea={social.key}
              background='accent-2'
              key={social.key}
              src={social.icon}
            >
              <UserFemale color='accent-1' />
            </Avatar>
          ))}
        </Grid>
      </Box>
    </Grid>
  )
}

export default React.memo(Header)
