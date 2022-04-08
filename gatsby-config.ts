import type { GatsbyConfig } from 'gatsby';
import { resolve } from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'xyang-log',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: resolve('src/blog/'),
      },
    },
    'gatsby-plugin-less',
    'gatsby-plugin-mdx',
    'gatsby-transformer-sharp',
    'gatsby-plugin-babel-optional-chaining', // 可选链
    'gatsby-plugin-nullish-coalescing-operator', // 双问号
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
};

export default config;
