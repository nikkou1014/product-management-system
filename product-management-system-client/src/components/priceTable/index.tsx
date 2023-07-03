import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";


const PriceTable = (props: any) => {
  const { prices } = props;

  const tableContent = [
    { title: "Subtotal", price: `$${prices.subtotal.toFixed(2)}` },
    { title: "Tax", price: `$${prices.tax.toFixed(2)}` },
    { title: "Discount", price: `-$${prices.discount.toFixed(2)}` },
    { title: "Estimated total", price: `$${prices.estimatedTotal.toFixed(2)}` },
  ];

  const tableRows = tableContent.map((item: { title: string, price: string }) => {
    return (
      <TableRow key={item.title}>
        <TableCell sx={{
          width: "80%", padding: "0.35rem", borderBottom: "none", fontWeight: "600", fontSize: "0.9rem", color: "#111827"
        }}>
          {item.title}
        </TableCell>
        <TableCell sx={{
          borderBottom: "none", padding: "0.35rem", fontWeight: "600", fontSize: "0.9rem", color: "#111827"
        }}>
          {item.price}
        </TableCell>
      </TableRow>
    )
  });

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default PriceTable;