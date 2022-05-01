import React from 'react'
import { grommet, Grommet } from 'grommet'
import { Box } from 'grommet/components'
import Layout from '@/components/Layout'
import Header from './Header'
import Menu from './Menu'

function Home() {
  return (
    <Grommet theme={grommet}>
      <Layout>
        <Box pad='medium'>
          <Header />
          <Menu />
        </Box>
      </Layout>
    </Grommet>
  )
}

export default Home
