import React from 'react'
import { Box } from 'grommet/components'
import Layout from '@/components/Layout'
import Header from './Header'
import Menu from './Menu'

function Home() {
  return (
    <Layout>
      <Box pad='medium'>
        <Header />
        <Menu />
      </Box>
    </Layout>
  )
}

export default Home
