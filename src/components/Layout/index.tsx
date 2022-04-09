import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Header, Box, Button, Menu, Heading } from 'grommet/components'
import { Home as IconHome } from 'grommet-icons'
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
  return (
    <>
      <Header background='brand' className={styles?.layoutHeader}>
        <Button icon={<IconHome />} hoverIndicator />
        <Heading>{title || data?.site?.siteMetadata?.title}</Heading>
        <Menu label='account' items={[{ label: 'logout' }]} />
      </Header>
      {children}
    </>
  )
}

export default Layout
