import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '@/components/Layout'

function IndexPage() {
  return (
    <Layout title="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://static.heytea.com/taro_trial/v1/img/home/swiper1.png"
      />
    </Layout>
  )
}

export default IndexPage
