import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header"
import { useEffect, useState } from "react"
import { CircularProgress, Container, Grid } from "@mui/material"
import Table from "../components/Table/Table"

const CryptoList = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarketsJson.edges

  const serverCoins = posts.map(p => p.node)

  const [coins, setCoins] = useState(serverCoins)
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState("")
  const [date, setDate] = useState(coins[0].last_updated)

  const regex = new RegExp(search, "i")

  useEffect(() => {
    const timer = setTimeout(
      () =>
        fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
        )
          .then(res => res.json())
          .then(function (result) {
            setDate(new Date())
            setLoading(false)
            setCoins(result.map(r => ({ ...r, slug: r.id })))
          }),
      10000
    )

    return () => clearTimeout(timer)
  }, [])

  const filteredCoins = search
    ? coins.filter((c: any) => regex.test(c.name))
    : coins

  return (
    <div>
      <Seo title="Voici la liste !" />
      <div className="main-container">
        <Header onChange={setSearch} />
        {loading && (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", flex: 1 }}
          >
            <CircularProgress size={100} />
          </Grid>
        )}
        <Container sx={{ padding: "12px 0" }}>
          {!loading && (
            <>
              <Grid
                item
                container
                xs={12}
                justifyContent="flex-end"
                sx={{ padding: "6px 0" }}
              >
                {date &&
                  `Update date - ${new Date(
                    date
                  ).toLocaleDateString()} ${new Date(
                    date
                  ).toLocaleTimeString()}`}
              </Grid>
              <Grid>{filteredCoins && <Table rows={filteredCoins} />}</Grid>
            </>
          )}
        </Container>
      </div>
    </div>
  )
}

export default CryptoList

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarketsJson {
      edges {
        node {
          id
          slug
          symbol
          image
          name
          market_cap_rank
          current_price
          price_change_24h
          market_cap
          ath
          last_updated
        }
      }
    }
  }
`
