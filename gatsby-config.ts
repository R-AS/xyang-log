import type { GatsbyConfig } from "gatsby"
import { resolve } from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `xyang-log`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: resolve('src/blog/'),
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    'gatsby-plugin-babel-optional-chaining', // 可选链
    'gatsby-plugin-nullish-coalescing-operator', // 双问号
  ],
}

export default config
