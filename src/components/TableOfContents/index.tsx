import React, { useState } from 'react'
import * as styles from './index.module.less'

type TItem = {
  items: Array<TItem>
  title: string
  url: string
}

type TProps = {
  floorProps?: number
  order?: string
  tableOfContents: Array<TItem>
}

function TableOfContents(props: TProps) {
  const { order, floorProps, tableOfContents = [] } = props
  let floor = 0

  return (
    <div
      className={styles.tableOfContents}
      style={{ paddingLeft: `${(floorProps || 0) * 5}px` }}
    >
      {Array.isArray(tableOfContents) &&
        tableOfContents?.map((item: TItem, i: number) => {
          const orderNo = order ? `${order}.${i + 1}` : `${i + 1}`
          if (i === 0) {
            floor += 1
          }
          return (
            <div className={styles.tableOfContentsLi} key={`${item.url}`}>
              {item.title && (
                <a className={styles.tableOfContentsLink} href={item.url}>
                  {`${orderNo}. `} {item.title}
                </a>
              )}
              <TableOfContents
                tableOfContents={item.items}
                order={orderNo}
                floorProps={floor}
              />
            </div>
          )
        })}
    </div>
  )
}

export default function TableOfContentsBox(props: TProps) {
  const { tableOfContents = [] } = props
  const [isExpand, setIsExpand] = useState<boolean>(false)

  const onClick = () => {
    setIsExpand(!isExpand)
  }

  return (
    <>
      {!isExpand && (
        <div
          className={styles.tableOfContentsPoint}
          style={{
            transform: 'translate(0px, 280px)',
            position: 'fixed',
            left: '0px',
          }}
          onClick={onClick}
        >
          <div className={styles.tableOfContentsPointText}>ᐅ</div>
        </div>
      )}
      <div
        className={`${styles.tableOfContentsBox}  ${
          isExpand ? styles.tableOfContentsBoxExpand : ''
        }`}
      >
        <div className={styles.tableOfContentsPoint} onClick={onClick}>
          <div className={styles.tableOfContentsPointText}>ᐅ</div>
        </div>
        <TableOfContents tableOfContents={tableOfContents} />
      </div>
    </>
  )
}
