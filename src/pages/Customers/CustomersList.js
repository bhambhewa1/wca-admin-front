import React from 'react'
import TopBox from '../../components/TableHeader/TopBox'

const CustomersList = () => {
  return (
    <TopBox 
    headerText={"Customer"}
    button_one={"+ Add Customer"}
    searchText={"Search customer"}
    />
  )
}

export default CustomersList