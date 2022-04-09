import React, { useReducer, useEffect, Reducer } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Tabs, Tab, Box, Tag } from 'grommet/components'
import Layout from '@/components/Layout'
import Header from './Header'

type TTab = {
  name: string
  id: string
}
type TState = {
  tabs: TTab[]
  activeIndex: number // 当前所在 tab index
}

function Home() {
  const [state, setState] = useReducer<Reducer<TState, Partial<TState>>>(
    (_state, newState) => ({ ..._state, ...newState }),
    {
      tabs: [],
      activeIndex: 0,
    }
  )

  const data = useStaticQuery(graphql`
    query {
      allDirectory(filter: { dir: { regex: "/src/blog$/" } }) {
        nodes {
          name
          id
        }
      }
    }
  `)

  useEffect(() => {
    setState({ tabs: data?.allDirectory?.nodes })
  }, [data?.allDirectory?.nodes])

  // useEffect(() => {
  //   const data = useStaticQuery(graphql`
  //     query {
  //       allDirectory(filter: { dir: { regex: "/src/blog$/" } }) {
  //         nodes {
  //           name
  //           id
  //         }
  //       }
  //     }
  //   `)
  //   console.log('🚀 ~ file: index.tsx ~ line 51 ~ useEffect ~ data', data)
  // }, [state.activeIndex])

  const onActive = (index: number) => {
    setState({ activeIndex: index })
  }

  return (
    <Layout>
      <Box pad='medium'>
        <Header />
        <Tabs onActive={onActive}>
          {state.tabs?.map((tab: TTab) => (
            <Tab title={tab.name} key={tab.id}>
              <Box pad='medium'>{tab.name}</Box>
            </Tab>
          ))}
        </Tabs>
      </Box>
    </Layout>
  )
}

export default Home
