import { Box, Grid, Typography, Paper, Button, Table, TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import PrintIcon from '@mui/icons-material/Print';
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
  boxShadow: 'none'
}));
const rows = [
  {
    name: 'Customer',
    template: 'Customer check 1',
    amount: '$25000.00',
    createdOn: '14/12/2022 10:44 AM',
  },
  {
    name: 'Customer',
    template: 'Customer check 1',
    amount: '$25000.00',
    createdOn: '14/12/2022 10:44 AM',
  },
  {
    name: 'Customer',
    template: 'Customer check 1',
    amount: '$25000.00',
    createdOn: '14/12/2022 10:44 AM',
  },
]
const Checks = () => {
  return (
    <>
      <Grid container sx={{ m: { xs: 1, sm: 0 }, boxShadow: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
        <Grid xs={6}>
          <Typography sx={style.headingText}>Checks</Typography>
        </Grid>
        <Grid item xs={6} sx={{
          display: 'flex',
          justifyContent: "flex-end",
        }}>
          <Item sx={{
            fontWeight: 500,
            // bgcolor: "",
            // width: '150px',
            height: '50px',
            display: 'flex',
          }}><Link style={{
            display: 'flex',
            textDecoration: "none",
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: "#F15F23",
            padding: 4,
            borderRadius: '5px',
            marginRight: 3,
            // width: '150px',
          }}>
              <Typography sx={{ color: 'white', fontSize: "14px" }}>Add Notes</Typography>

            </Link>
            <Link style={{
              display: 'flex',
              textDecoration: "none",
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: "#F15F23",
              padding: 4,
              borderRadius: '5px',
              // width: '150px',
            }}>
              <Typography sx={{ color: 'white', fontSize: "14px" }}>Generate Check</Typography>
            </Link></Item>
        </Grid>

      </Grid>
      <Grid container sx={Style.table.tableWrapBox}>
        <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
          <EnhancedTableHead
            totalColumn={["Check Type", "Template format name", "Amount", "Generated on", "Action"]}
          // numSelected={selected.length}
          // order={order}
          // orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={rows.length}
          />
          <TableBody sx={{ border: "1px solid #ECECEC" }}>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.name}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.template}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.amount}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.createdOn}
                </TableCell>

                <TableCell sx={Style.table.tableCell} >
                  <>
                    <Box sx={{
                      display: 'flex',
                    }}>
                      <PrintIcon sx={{
                        fontSize: "24px",
                        color: '#4BB543'
                      }}
                      />
                      <Typography sx={{ fontSize: '18px' }}>Print</Typography>
                      <DeleteIcon
                        color="error"
                        sx={{
                          fontSize: "24px",
                          ml: 3
                        }}
                      // onClick={() => {
                      //   setDialog(true);
                      //   setId(row.staff_id);
                      // }}
                      />
                    </Box>

                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  )
}

export default Checks
const style = {
  headingText: {
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "38px",
    color: "#000000",
    pl: 3,
    pt: 1
  },
};