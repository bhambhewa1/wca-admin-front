import { Box, Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
const CustomersList = () => {
  const rows = [
    { id: 1, Name: "Jon", email: "abc@gmail.com", Phone: "+35", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 2, Name: "Cersei", email: "abc@gmail.com", Phone: "+42", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 3, Name: "Jaime", email: "abc@gmail.com", Phone: "+45", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 4, Name: "Arya", email: "abc@gmail.com", Phone: "+16", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 5, Name: "Daenerys", email: "abc@gmail.com", Phone: "+90", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 6, Name: "John", email: "abc@gmail.com", Phone: "+150", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 7, Name: "Ferrara", email: "abc@gmail.com", Phone: "+44", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 8, Name: "Rossini", email: "abc@gmail.com", Phone: "+36", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
    { id: 9, Name: "Harvey", email: "abc@gmail.com", Phone: "+65", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}>
      <TopBox headerText={"Customer"} button_one={"+ Add Customer"} searchText={"Search customer"} />

      <Table
        sx={{
          width: { lg: "100%", xs: "1000px" },
        }}
        aria-labelledby="tableTitle">
        <EnhancedTableHead
          totalColumn={["Customer Name", "Email", "Phone", "Created On", "Vehicles", "Action"]}
          // numSelected={selected.length}
          // order={order}
          // orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={rows.length}
        />
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="left">{row.Name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.Phone}</TableCell>
              <TableCell align="left">{row.createdOn}</TableCell>

              <TableCell align="left" sx={{ display: "flex" }}>
                <Button sx={{ display: "flex", justifyContent: "space-between" }}>
                  {row.vehicles}
                  <RemoveRedEyeIcon sx={{ color: "#4969B2", fontSize: "20px" }} />
                </Button>
                <Button sx={{ color: "#F15F23" }}>
                  <AddIcon />
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CustomersList;
