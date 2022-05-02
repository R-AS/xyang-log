import React, { useContext, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ResponsiveContext } from 'grommet'
import { Header, Box, Button, Menu, Heading, Text } from 'grommet/components'
import { Home as IconHome } from 'grommet-icons'
import LayoutContext from '@/utils/layoutContext'
import * as styles from './index.module.less'

type TProps = {
  title?: string
  children: Array<JSX.Element> | JSX.Element
}

function Layout(props: TProps) {
  const { title = '', children } = props
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const size = useContext(ResponsiveContext)
  const contextValue = useMemo(() => ({ size }), [size])

  return (
    <ResponsiveContext.Consumer>
      {() => (
        <LayoutContext.Provider value={contextValue}>
          <Box background='dark-1' style={{ minHeight: '100vh' }}>
            <Header background='header' className={styles?.layoutHeader}>
              <Button icon={<IconHome />} hoverIndicator />
              <Heading>{title || data?.site?.siteMetadata?.title}</Heading>
              <Menu label='account' items={[{ label: 'logout' }]} />
            </Header>
            {children}
            <Text
              alignSelf='center'
              margin={{ top: '0.53rem', bottom: '0.53rem' }}
            >
              © 2022, Built with {data?.site?.siteMetadata?.title}
            </Text>
          </Box>
        </LayoutContext.Provider>
      )}
    </ResponsiveContext.Consumer>
  )
}

export default Layout
