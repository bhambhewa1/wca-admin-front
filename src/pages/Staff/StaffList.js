import { Box, MenuItem, Pagination, Select, Skeleton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import { getStaffList, deleteStaff } from "../../redux/action/staff";
import DeleteIcon from "@mui/icons-material/Delete";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import AlertDialog from "../../components/Dialog/Dialog";
import { Style } from "../../const/Style";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
import { storage } from "../../config/storage";
const StaffList = ({ getStaffList, deleteStaff }) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = React.useState("asc");
  const [model, setModal] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [pages, setPages] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [total, setTotal] = useState(0)
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [perv_search_val, setPerv_Search_val] = React.useState("");
  const [search_val, setSearch_val] = React.useState("");
  const [length, setLength] = useState(5);
  const [Id, setId] = useState("");
  const navigate = useNavigate();
  const staff = storage.fetch.staffId();
  let data = {
    page: page,
    limit: length,
    sort: "desc",
    search: "",
    staff_id: staff,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getList();
  }, [length]);

  const getList = () => {
    setLoading(true);
    getStaffList(data).then((res) => {
      setLoading(false);
      if (res?.data?.total_records === 0) {
        setTotal(res?.data?.total_records)
        setPages(res?.data?.pages);
        setRows(res?.data?.staff_list);
      } else if (res?.data?.status) {
          setRows(res?.data?.staff_list);
          setPages(res?.data?.pages);
          setTotal(res?.data?.total_records)
        } else {
          setRows(res?.data?.staff_list);
          setPages(res?.data?.pages);
          res?.data?.errors.map((error) => {
            toast.error(error);
          })
        }
    });
  };
  const handleRequestSort = (event, property) => {
    setLoading(true);
    let isAsc = orderBy === property && order === "asc";
    if (orderBy !== property) {
      setOrder("desc");
      data.sort = "asc";
      data.sortColumn = property;
      setOrderBy(property);
    } else {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
      // sort_column = { sort_column: property };
      // sort = { sort_by: order };
      data.sort = order;
      data.sortColumn = property;
    }
    // Object.assign(data, sort_column, sort);
    if (search_val) {
      data.search = search_val;
    }
    getList();
  };
  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
    data.page = value
    data.staff_id = staff
    if (order && orderBy) {
      data.sort = order === "asc" ? "desc" : "asc";
      data.sortColumn = orderBy;
    }
    if (search_val) {
      data.search = search_val;
    }
    getList();
  };
  const handleDelete = (id) => {
    let data = { staff_id: id };
    // setDialog(true);
    // if (dialog === "Yes") {
    deleteStaff(data).then((res) => {
      if (res.data.status) {
        setDialog(false);
        toast.success(res?.data?.message);
        getList();
      } else {
        res?.data?.errors.map((error) => {
          toast.error(error);
        })
      }
    });
    // }
  };

  const onSubmit = (value) => {
    if ((value !== "" && value.trim().length !== 0) || perv_search_val !== "") {
      setPerv_Search_val(value);
      setLoading(true);
      setSearch_val(value);
      setPage(1);
      data.search = value;
      Object.assign(data, { staff_id: staff })

      // if (order && orderBy) {
      //   let sort_column = { sort_column: orderBy };
      //   let sort = { sort_by: order };
      //   Object.assign(data, sort_column, sort);
      // }
      getList();
    }
  };
  const handleChange = (e) => {
    setLength(e.target.value)
    getList()
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <Toastify />
      <TopBox
        headerText={"Staff"}
        button_one={"+ Add Staff"}
        searchText={"Search"}
        sortingText={"Customer"}
        value={""}
        onClick={onclick}
        onSubmit={onSubmit}
        search_val={search_val}
        setSearch_val={setSearch_val}
        button_one_onClick={() => {
          navigate("/staff/update");
        }}
      />
      <AlertDialog
        title={"Are you sure you want to delete this item?"}
        open={dialog}
        onClickButton={() => handleDelete(Id)}
        onClickButtonCancel={() => setDialog(false)}
      />
      <LoaderComponent open={loading} />
      <Box sx={Style.table.tableWrapBox}>
        {rows.length == 0 && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 20,
              pb: 20,
              fontSize: "35px",
              color: "#A8A8A8",
              fontWeight: "700",
            }}>
            No Staff Member Found
          </Typography>
        )}
        {!rows.length == 0 && (
          <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
            <EnhancedTableHead
              totalColumn={["Firstname", "Lastname", "Type", "Contact No", "Email", "CreatedOn", "Action"]}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.staff_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.firstName}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.lastName}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.type}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.phone}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.email}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.created_on}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && (
                      <>
                        <img
                          alt="edit_png"
                          style={{
                            width: "19px",
                            height: "19px",
                            marginRight: "40px",
                            cursor: "pointer",
                            marginBottom: "3px",
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
                            setDialog(true);
                            setId(row.staff_id);
                          }}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
      {total!==0&&<Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          p: 1,
        }}>
        <Typography sx={{ pl: 3, fontWeight: 400, fontSize: { xs: '14px', sm: '16px' } }}>Number of Rows per Page
          <Select
            value={length}
            onChange={handleChange}
            sx={{
              ml: { xs: 1, sm: 2 },
              mr: { xs: 1, sm: 2 },
              fontSize: "16px"
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          out of {total} </Typography>
        {pages > 1 && (
          <Pagination
            count={pages}
            page={page}
            boundaryCount={1}
            sx={{ button: { fontSize: "16px", mt: 2, mr: 2 } }}
            onChange={handlePageChange}
            siblingCount={0}
          />
        )}
      </Box>
     }
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
