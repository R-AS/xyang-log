import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Header, Box, Button, Menu, Heading } from 'grommet/components'
import { Home as IconHome } from 'grommet-icons'

type TProps = {
  title?: string
  children: React.ReactDOM
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
    <Box>
      <Header background="brand">
        <Button icon={<IconHome />} hoverIndicator />
        <Heading>{title || data?.site?.siteMetadata?.title}</Heading>
        <Menu label="account" items={[{ label: 'logout' }]} />
      </Header>
      {children}
    </Box>
  )
}

export default Layout

// import * as React from 'react';
// import { Link, useStaticQuery, graphql } from 'gatsby';
// import {
//   container,
//   heading,
//   navLinks,
//   navLinkItem,
//   navLinkText,
//   siteTitle,
// } from './layout.module.css';

// function Layout({ pageTitle, children }) {
//   const data = useStaticQuery(graphql`
//     query {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `);

//   return (
//     <div className={container}>
//       <title>
//         {pageTitle} | {data.site.siteMetadata.title}
//       </title>
//       <header className={siteTitle}>{data.site.siteMetadata.title}</header>
//       <nav>
//         <ul className={navLinks}>
//           <li className={navLinkItem}>
//             <Link to="/" className={navLinkText}>
//               Home
//             </Link>
//           </li>
//           <li className={navLinkItem}>
//             <Link to="/about" className={navLinkText}>
//               About
//             </Link>
//           </li>
//           <li className={navLinkItem}>
//             <Link to="/blog" className={navLinkText}>
//               Blog
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <main>
//         <h1 className={heading}>{pageTitle}</h1>
//         {children}
//       </main>
//     </div>
//   );
// }

// export default Layout;
