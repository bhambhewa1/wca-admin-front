import { Box, Pagination, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import { getStaffList, deleteStaff } from "../../redux/action/staff";
import DeleteIcon from "@mui/icons-material/Delete";
const StaffList = ({ getStaffList, deleteStaff }) => {
  const [loading, setLoading] = useState(true);
  const [deleteData, setDeleteData] = useState();
  const [order, setOrder] = React.useState("asc");
  const [model, setModal] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = React.useState(1);
  const [start, setStart] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [perv_search_val, setPerv_Search_val] = React.useState("");
  const [search_val, setSearch_val] = React.useState("");
  const [Empty, setEmpty] = useState(false);
  const navigate = useNavigate();
  let length = 3;
  let data = {
    page: page,
    limit: length,
    sort: "",
    search: "",
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getList();
  }, []);

  const getList = () => {
    console.log(data);
    getStaffList(data).then((res) => {
      if (res.data) {
        setRows(res?.data?.staff_list);
        setPages(res?.data?.pages)
      }else{
        setRows(res?.data?.staff_list);
        setPages(res?.data?.pages)

      }
    });
  };
  const handleRequestSort = (event, property) => {
    setLoading(true);
    let isAsc = orderBy === property && order === "asc";
    if (orderBy !== property) {
      setOrder("desc");
      data.sort =  "asc" ;
      data.sortColumn = property ;
      setOrderBy(property);
    } else {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      // sort_column = { sort_column: property };
      // sort = { sort_by: order };
      data.sort =  order ;
      data.sortColumn = property ;
    }
    // Object.assign(data, sort_column, sort);
    if (search_val) {
      data.search = search_val
    }
    getList();
  };
  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
    data = {
      page: value,
      limit: length,
      sort: "",
      sortColumn:"",
      search: "",
    };
    if (order && orderBy) {
      data.sort = order
      data.sortColumn = orderBy
    }
    if (search_val) {
      data.search = search_val
    }
    getList();
  };
  const handleDelete = (id) => {
    let data = { staff_id: id };
    deleteStaff(data).then((res) => {
      if (res.data.status) {
        getList();
      }
    });
  };

  const onSubmit = (value) => {
    if ((value !== "" && value.trim().length !== 0) || perv_search_val !== "") {
      setPerv_Search_val(value);
      setLoading(true);
      setSearch_val(value);
      setPage(1);
      data.search = value
      // if (order && orderBy) {
      //   let sort_column = { sort_column: orderBy };
      //   let sort = { sort_by: order };
      //   Object.assign(data, sort_column, sort);
      // }
      getList();
    }
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
        onSubmit = {onSubmit}
        search_val ={search_val}
        setSearch_val = {setSearch_val}
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
          totalColumn={["firstName","LastName", "Type", "Contact No", "Email", "Created on", "Action"]}
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={rows.length}
        />
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell sx={{width:"130px"}} >{row.firstName}</TableCell>
              <TableCell sx={{width:"130px"}}>{row.lastName}</TableCell>
              <TableCell sx={{width:"120px"}}>{row.type}</TableCell>
              <TableCell sx={{width:"120px"}}>{row.phone}</TableCell>
              <TableCell sx={{width:"120px"}}>{row.email}</TableCell>
              <TableCell sx={{width:"120px"}}>{row.createdOn}</TableCell>
              <TableCell sx={{width:"120px"}}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          p: 1,
        }}
      >
        {pages > 1 && (
          <Pagination
            count={pages}
            page={page}
            boundaryCount={1}
            sx={{ button: { fontSize: '16px' } }}

            onChange={handlePageChange}
            siblingCount={0}
          />
        )}
      </Box>
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
