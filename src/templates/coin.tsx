import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import { Container, Grid, Typography } from "@mui/material"

const getData = async (path: string | string[] | undefined) => {
  if (!path) {
    return null
  }

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${path}`)
    return await res.json()
  } catch (e) {
    return null
  }
}

type Props = {
  coin: any
}

const BlogPostTemplate = ({ location, pageContext }) => {
  const { slug } = pageContext

  const [coin, setCoin] = useState<any>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    ;(async function anyNameFunction() {
      const data = await getData(slug)
      if (data) {
        setCoin(data)
      }
    })()
  }, [slug])

  const { last_updated } = coin || {}
  const date = last_updated ? new Date(last_updated) : null

  return (
    <div>
      <Header onChange={setSearch} />
      <Seo title={`${slug} details !`} />
      <Container sx={{ padding: "12px 0" }}>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-end"
          sx={{ padding: "6px 0" }}
        >
          {last_updated &&
            date &&
            `Update date - ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          sx={{ padding: "6px 0" }}
        >
          <Typography variant="h1">{coin && coin.name}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-start"
          sx={{ padding: "6px 0" }}
        >
          <Typography variant="h3">
            {coin && coin.market_data.current_price.usd}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="flex-end"
          sx={{ padding: "6px 0" }}
        >
          <Typography variant="body1">
            <span
              dangerouslySetInnerHTML={{
                __html: coin && coin?.description?.en,
              }}
            ></span>
          </Typography>
        </Grid>
      </Container>
    </div>
  )
}

export default BlogPostTemplate
