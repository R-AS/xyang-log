import React, { useEffect, useReducer, Reducer } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Tabs, Tab, Tag, Box } from 'grommet/components'
import { TTab, TBlog, TMenuData } from '@/pages/Home/types'
import BlogList from '../BlogList'

type TState = {
  tabs: TTab[] // 文章大类型
  nextTabs: TTab[] // 文章小类型
  blogs: TBlog[] // 博客列表
  activeIndex: number // 当前所在 tab index
}

function Menu() {
  const [state, setState] = useReducer<Reducer<TState, Partial<TState>>>(
    (_state, newState) => ({ ..._state, ...newState }),
    {
      tabs: [],
      nextTabs: [],
      blogs: [],
      activeIndex: 0,
    }
  )
  const { tabs, nextTabs, blogs } = state

  const data: TMenuData = useStaticQuery(graphql`
    query {
      allDirectory {
        nodes {
          name
          id
          dir
        }
      }
      allMdx {
        nodes {
          frontmatter {
            title
            date
          }
          id
          fileAbsolutePath
        }
      }
    }
  `)

  useEffect(() => {
    // 获取文章大类
    const tabsTemp = data?.allDirectory?.nodes?.filter(tab =>
      /blog$/.test(tab?.dir)
    )
    const preDirName = tabsTemp?.[0]?.name
    // 获取文章小类
    const nextTabsTemp = data?.allDirectory?.nodes?.filter(tab =>
      new RegExp(`blog/${preDirName}$`).test(tab?.dir)
    )
    const activeNextTabName = nextTabsTemp?.[0]?.name
    // 获取文章列表
    const blogsTemp = data?.allMdx?.nodes
      ?.map(blog => {
        if (
          new RegExp(`blog/${preDirName}/${activeNextTabName}/(.+).mdx$`).test(
            blog.fileAbsolutePath
          )
        ) {
          return {
            ...blog.frontmatter,
            id: blog.id,
            fileAbsolutePath: blog.fileAbsolutePath,
          }
        }
        return undefined
      })
      .filter(blog => blog)
    setState({
      tabs: tabsTemp,
      nextTabs: nextTabsTemp,
      blogs: blogsTemp as TBlog[],
    })
  }, [data?.allDirectory?.nodes])

  const onActive = (index: number) => {
    setState({ activeIndex: index })
    const preDirName = tabs?.[index]?.name
    // 获取文章小类
    const nextTabsTemp = data?.allDirectory?.nodes?.filter(tab =>
      new RegExp(`blog/${preDirName}$`).test(tab?.dir)
    )
    const activeNextTabName = nextTabsTemp?.[0]?.name
    // 获取文章列表
    const blogsTemp = data?.allMdx?.nodes
      ?.map(blog => {
        if (
          new RegExp(`blog/${preDirName}/${activeNextTabName}/(.+).mdx$`).test(
            blog.fileAbsolutePath
          )
        ) {
          return {
            ...blog.frontmatter,
            id: blog.id,
            fileAbsolutePath: blog.fileAbsolutePath,
          }
        }
        return undefined
      })
      .filter(blog => blog)
    setState({ nextTabs: nextTabsTemp, blogs: blogsTemp as TBlog[] })
  }

  return (
    <Tabs onActive={onActive}>
      {tabs?.map((tab: TTab) => (
        <Tab title={tab.name} key={tab.id}>
          <Box pad='auto'>
            {nextTabs?.map((nextTab: TTab) => (
              <Tag key={nextTab.id} name={nextTab.name} value='' />
            ))}
            {tab.name}
            <BlogList list={blogs} />
          </Box>
        </Tab>
      ))}
    </Tabs>
  )
}

export default Menu
