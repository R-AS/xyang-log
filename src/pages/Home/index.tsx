import React, { useContext } from 'react'
import { ResponsiveContext } from 'grommet/contexts'
import { Box } from 'grommet/components'
import Layout from '@/components/Layout'
import Header from './Header'
import Menu from './Menu'

function Home() {
  const c = useContext(ResponsiveContext)
  console.log('🚀 ~ file: index.tsx ~ line 9 ~ Home ~ c', c)
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
