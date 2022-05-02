import React, {
  useEffect,
  useContext,
  useReducer,
  useMemo,
  Reducer,
} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grommet } from 'grommet'
import { Tabs, Tab, Tag, Box, Grid } from 'grommet/components'
import { TTab, TBlog, TMenuData } from '@/pages/Home/types'
import getDirName from '@/utils/dirNameGetter'
import LayoutContext from '@/utils/layoutContext'
import BlogList from '../BlogList'
import * as styles from './index.module.less'

type TState = {
  tabs: TTab[] // 文章大类型
  nextTabs: TTab[] // 文章小类型
  blogs: TBlog[] // 博客列表
  activeIndex: number // 当前所在 tab index
  nextTabActiveIndex: number // 当前子品类 tab index
  nextTabActiveName: string // 子品类名称
  isExpand: boolean // 面板是否展开
}

function Menu() {
  const [state, setState] = useReducer<Reducer<TState, Partial<TState>>>(
    (_state, newState) => ({ ..._state, ...newState }),
    {
      tabs: [],
      nextTabs: [],
      blogs: [],
      activeIndex: 0,
      nextTabActiveIndex: 0,
      nextTabActiveName: '',
      isExpand: false,
    }
  )
  const { tabs, nextTabs, blogs, isExpand, nextTabActiveName } = state

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
            thumbnail
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
      nextTabActiveName: activeNextTabName,
      blogs: blogsTemp as TBlog[],
    })
  }, [data?.allDirectory?.nodes])

  const onActive = (index: number, nextIndex?: number) => {
    setState({
      activeIndex: index,
      nextTabActiveIndex: nextIndex || 0,
      nextTabActiveName: '',
    })
    const preDirName = tabs?.[index]?.name
    // 获取文章小类
    const nextTabsTemp = data?.allDirectory?.nodes?.filter(tab =>
      new RegExp(`blog/${preDirName}$`).test(tab?.dir)
    )
    const activeNextTabName = nextTabsTemp?.[nextIndex || 0]?.name
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
      nextTabs: nextTabsTemp,
      blogs: blogsTemp as TBlog[],
      nextTabActiveName: activeNextTabName,
    })
  }

  const onNextTabActive = (index: number) => {
    if (index === state.nextTabActiveIndex) return
    onActive(state.activeIndex, index)
  }

  const useLayoutContext = useContext(LayoutContext)

  const nextTabsList = useMemo(() => {
    const isSmallScreen = useLayoutContext.size === 'small'
    const colsCount = isSmallScreen ? 4 : 7
    return isExpand ? nextTabs : nextTabs.slice(0, colsCount)
  }, [isExpand, useLayoutContext.size, nextTabs.length])

  // 根据视窗宽度分配 tabs 网格布局
  const nextTabGridConf = useMemo(() => {
    const isSmallScreen = useLayoutContext.size === 'small'
    const colsCount = isSmallScreen ? 4 : 7
    const rowsCount =
      nextTabsList.length > colsCount
        ? Math.floor(nextTabsList.length / colsCount) + 1
        : 1

    return {
      rows: Array.from(new Array(rowsCount), () => 'xsmall'),
      columns: Array.from(new Array(colsCount), () => 'xsmall'),
      areas: nextTabsList.map((nextTab, index) => {
        const rows = Math.floor(index / colsCount) // 当前处于第几行
        const colStart = rows ? index - rows * colsCount : index
        let colEnd = colStart + 1
        colEnd = colEnd >= colsCount ? colsCount - 1 : colEnd
        const rowStart = rows
        const rowEnd = rowStart >= rowsCount ? rowsCount : rowStart

        return {
          name: nextTab.id,
          start: [colStart, rowStart],
          end: [colEnd, rowEnd],
        }
      }),
      gap: 'small',
      gridTemplateRows: `repeat(${rowsCount}, 24px)`,
      showExpandBtn: nextTabs.length > colsCount, // 展示扩展按钮
    }
  }, [useLayoutContext.size, nextTabsList.length])

  useEffect(() => {
    setState({ isExpand: false })
  }, [nextTabGridConf.showExpandBtn, state.activeIndex])

  return (
    <Grommet
      theme={{
        tabs: {
          header: {
            border: {
              side: 'bottom',
              size: 'xsmall',
              style: 'solid',
              color: 'light-1',
            },
          },
        },
      }}
    >
      <Tabs onActive={onActive}>
        {tabs?.map((tab: TTab, index: number) => (
          <Tab
            className={`${styles.menuBtn} ${
              index === state.activeIndex ? styles.menuBtnActive : ''
            }`}
            title={getDirName(tab.name)}
            key={tab.id}
          >
            <Box pad='auto' style={{ position: 'relative' }}>
              {nextTabGridConf.showExpandBtn && (
                <Box
                  className={`${styles.menuExpandBtn} ${
                    isExpand ? styles.menuExpandBtnRotate : ''
                  }`}
                  onClick={() => {
                    setState({ isExpand: !state.isExpand })
                  }}
                />
              )}
              <Grid
                className={styles.nextTabsGrid}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...nextTabGridConf}
                align='center'
                style={{ gridTemplateRows: nextTabGridConf.gridTemplateRows }}
              >
                {nextTabsList?.map((nextTab: TTab, i: number) => (
                  <Box
                    key={nextTab.id}
                    gridArea={nextTab.id}
                    className={styles.menuTagBox}
                    onClick={() => onNextTabActive(i)}
                  >
                    <Tag
                      className={`${styles.menuTag} ${
                        i === state.nextTabActiveIndex
                          ? styles.menuTagActive
                          : ''
                      }`}
                      name={getDirName(nextTab.name)}
                      value=''
                    />
                  </Box>
                ))}
              </Grid>
              <BlogList
                className={styles.blogList}
                list={blogs}
                activeTabName={nextTabActiveName}
              />
            </Box>
          </Tab>
        ))}
      </Tabs>
    </Grommet>
  )
}

export default Menu
