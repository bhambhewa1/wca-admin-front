import { Box, Table } from "@mui/material";
import React from "react";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";

const VehicleList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <TopBox
        headerText={"Vehicles"}
        button_one={"+ Add Vehicle"}
        button_two={"Negotiating vehicles"}
        button_three={"Purchased vehicles"}
        searchText={"Search vehicle"}
        sortingText={"Customer"}
        value={""}
        onClick={onclick}
      />

      <Table
        sx={{
          width: { lg: "100%", xs: "1000px" },
        }}
        aria-labelledby="tableTitle"
      >
        <EnhancedTableHead
          totalColumn={[
            "VIN",
            "Make",
            "Year",
            "Model",
            "Price",
            "Created On",
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

export default VehicleList;
