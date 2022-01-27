import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import "./Table.module.css"
import { Link } from "gatsby"

interface Props {
  rows: Array<any>
}

const BasicTable: React.FC<Props> = ({ rows }) => {
  // const navigate = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Market Cap Rank</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Price change 24h</TableCell>
            <TableCell align="right">Market cap</TableCell>
            <TableCell align="right">ATH</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.market_cap_rank}
              </TableCell>
              <TableCell align="right" sx={{ alignItems: "center" }}>
                <Link
                  className="t-table-row"
                  to={`/coin/${row.slug}`}
                  itemProp="url"
                  key={row.name}
                >
                  <div className="t-cell">
                    <img
                      src={row.image}
                      style={{ width: "20px", paddingRight: "6px" }}
                    />
                    <span className="t-bold">{row.name}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.current_price)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.price_change_24h)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.market_cap)}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "code",
                }).format(row.ath)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
