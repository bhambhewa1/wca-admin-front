import { Box } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
const Index = () => {
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: 'white', }}>
        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path="/greeting/cardview" element={<CardView />} /> */}
        </Routes>
      </Box>
    </>
  );
};

export default Index;
