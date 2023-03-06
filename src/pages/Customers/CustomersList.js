import { Box } from "@mui/material";
import React from "react";
import TopBox from "../../components/TableHeader/TopBox";

const CustomersList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        p: 3,
      }}
    >
      <TopBox
        headerText={"Customer"}
        button_one={"+ Add Customer"}
        searchText={"Search customer"}
      />
    </Box>
  );
};

export default CustomersList;
