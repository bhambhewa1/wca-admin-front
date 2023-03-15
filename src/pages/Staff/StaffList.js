import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import { getStaffList, deleteStaff } from "../../redux/action/staff";
import DeleteIcon from "@mui/icons-material/Delete";
const StaffList = ({ getStaffList, deleteStaff }) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  let data = {
    page: 1,
    limit: 3,
    sort: "",
    search: "",
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("first");
    getList();
  }, []);

  const getList = () => {
    console.log("ji");
    getStaffList(data).then((res) => {
      if (res.data.status) {
        console.log(res?.data?.staff_list);
        setRows(res?.data?.staff_list);
      }
    });
  };
  const handleDelete = (id) => {
    let data = { id: id };
    deleteStaff(data).then((res) => {
      if (res.data.status) {
        getList();
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}>
      <TopBox
        headerText={"Staff"}
        button_one={"+ Add Staff"}
        searchText={"Search"}
        sortingText={"Customer"}
        value={""}
        onClick={onclick}
        button_one_onClick={() => {
          navigate("/staff/update");
        }}
      />

      <Table
        sx={{
          width: { lg: "100%", xs: "1000px" },
          border: "1px solid #dddddd",
          borderRadius: "25px",
        }}
        aria-labelledby="tableTitle">
        <EnhancedTableHead
          totalColumn={["Name", "Type", "Contact No", "Email", "Created on", "Action"]}
          // numSelected={selected.length}
          // order={order}
          // orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={rows.length}
        />
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>{row.firstName + " " + row.lastName}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.createdOn}</TableCell>
              <TableCell>
                <img
                  alt="edit_png"
                  style={{
                    width: "19px",
                    height: "19px",
                    marginRight: "40px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/staff/update", { state: row.staff_id });
                  }}
                  src={require("../../assests/edit.png")}
                />
                <DeleteIcon
                  color="error"
                  sx={{
                    fontSize: "24px",
                  }}
                  onClick={() => {
                    handleDelete(row.staff_id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStaffList: (data) => dispatch(getStaffList(data)),
    deleteStaff: (data) => dispatch(deleteStaff(data)),
  };
};

export default connect(null, mapDispatchToProps)(StaffList);
