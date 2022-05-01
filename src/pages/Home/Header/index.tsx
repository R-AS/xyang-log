import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Box, Avatar, Text } from 'grommet/components'
import { UserFemale } from 'grommet-icons'
import { AVATAR_URL, SOCIALS } from '@/config/account'
import * as styles from './index.module.less'

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
      className={styles.headerBox}
      rows={['small']}
      columns={['small', 'auto']}
      gap='small'
      areas={[
        { name: 'avatar', start: [0, 0], end: [1, 0] },
        { name: 'info', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box
        className={styles.headerAvatarBox}
        gridArea='avatar'
        justify='center'
        align='center'
      >
        <Avatar src={AVATAR_URL} size='2xl' />
      </Box>
      <Box className={styles.headerDescBox} gridArea='info' justify='center'>
        <Text margin={{ bottom: 'small' }} color='light-1'>
          {data?.site?.siteMetadata?.author?.name}
        </Text>
        <Text margin={{ bottom: 'small' }} color='light-1'>
          {data?.site?.siteMetadata?.author?.desc}
        </Text>
        <Grid
          className={styles.headerSocialBox}
          rows={['xsmall']}
          columns={columns}
          areas={areas}
          align='center'
        >
          {SOCIALS.map(social => (
            <Avatar
              className={styles.headerSocial}
              gridArea={social.key}
              background='accent-2'
              key={social.key}
              src={social.icon}
              size='small'
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
