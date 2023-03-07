import { Box, Table } from "@mui/material";
import React from "react";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";

const CustomersList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <TopBox
        headerText={"Customer"}
        button_one={"+ Add Customer"}
        searchText={"Search customer"}
      />

      <Table
        sx={{
          width: { lg: "100%", xs: "1000px" },
        }}
        aria-labelledby="tableTitle"
      >
        <EnhancedTableHead
          totalColumn={[
            "Customer Name",
            "Email",
            "Phone",
            "Created On",
            "Vehicles",
            "Action",
          ]}
          // numSelected={selected.length}
          // order={order}
          // orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={rows.length}
        />


      </Table>
    </Box>
  );
};

export default CustomersList;
