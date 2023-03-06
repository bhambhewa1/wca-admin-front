import { Box } from '@mui/material'
import React from 'react'
import TopBox from '../../components/TableHeader/TopBox'

const VehicleList = () => {
  return (
    <Box 
    sx={{
      display: "flex",
      p: 3
    }}>
    <TopBox 
    headerText={"Vehicles"}
    button_one={"+ Add Vehicle"}
    button_two={"Negotiating vehicles"}
    button_three={"Purchased vehicles"}
    searchText={"Search vehicle"}
    sortingText={"Customer"}
    />
    </Box>
  )
}

export default VehicleList