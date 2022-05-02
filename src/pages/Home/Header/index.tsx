import React, { useContext, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Box, Avatar, Text } from 'grommet/components'
import { UserFemale } from 'grommet-icons'
import { AVATAR_URL, SOCIALS } from '@/config/account'
import LayoutContext from '@/utils/layoutContext'
import * as styles from './index.module.less'

const columns = Array.from(SOCIALS, () => 'xsmall')
const areas = SOCIALS.map((social, index) => ({
  name: social.key,
  start: [index, 0],
  end: [index === SOCIALS.length - 1 ? SOCIALS.length - 1 : index + 1, 0],
}))

function Header() {
  const useLayoutContext = useContext(LayoutContext)
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
  const gridConf = useMemo(() => {
    const isSmallScreen = useLayoutContext.size === 'small'
    return {
      rows: ['small'],
      columns: isSmallScreen ? ['xsmall', 'auto'] : ['small', 'auto'],
      areas: [
        { name: 'avatar', start: [0, 0], end: [1, 0] },
        { name: 'info', start: [1, 0], end: [1, 0] },
      ],
      gap: 'small',
    }
  }, [useLayoutContext.size])

  const avatarSize = useMemo(() => {
    const isSmallScreen = useLayoutContext.size === 'small'
    return isSmallScreen ? 'xlarge' : '2xl'
  }, [useLayoutContext.size])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid className={styles.headerBox} {...gridConf}>
      <Box
        className={styles.headerAvatarBox}
        gridArea='avatar'
        justify='center'
        align='center'
      >
        <Avatar src={AVATAR_URL} size={avatarSize} />
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
