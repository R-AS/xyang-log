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
  ],
}

export default config
