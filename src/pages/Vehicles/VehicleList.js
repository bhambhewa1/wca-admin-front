import React from 'react'
import TopBox from '../../components/TableHeader/TopBox'

const VehicleList = () => {
  return (
    <TopBox 
    headerText={"Vehicles"}
    button_one={"+ Add Vehicle"}
    button_two={"Negotiating vehicles"}
    button_three={"Purchased vehicles"}
    searchText={"Search vehicle"}
    sortingText={"Customer"}
    />
  )
}

export default VehicleList