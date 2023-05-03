import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { getCustomerList, deleteCustomer } from "../../redux/action/customers";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import DeleteIcon from "@mui/icons-material/Delete";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import AlertDialog from "../../components/Dialog/Dialog";
import { Style } from "../../const/Style";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
import { storage } from "../../config/storage";
const CustomersList = ({ getCustomerList, deleteCustomer }) => {
  // const rows = [
  //   { id: 1, Name: "Jon", email: "abc@gmail.com", Phone: "+35", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 2, Name: "Cersei", email: "abc@gmail.com", Phone: "+42", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 3, Name: "Jaime", email: "abc@gmail.com", Phone: "+45", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 4, Name: "Arya", email: "abc@gmail.com", Phone: "+16", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 5, Name: "Daenerys", email: "abc@gmail.com", Phone: "+90", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 6, Name: "John", email: "abc@gmail.com", Phone: "+150", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 7, Name: "Ferrara", email: "abc@gmail.com", Phone: "+44", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 8, Name: "Rossini", email: "abc@gmail.com", Phone: "+36", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  //   { id: 9, Name: "Harvey", email: "abc@gmail.com", Phone: "+65", createdOn: "1/1/2022 10:11 AM", vehicles: 1 },
  // ];

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = React.useState("asc");
  const [model, setModal] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [pages, setPages] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [dialog1, setDialog1] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [perv_search_val, setPerv_Search_val] = React.useState("");
  const [search_val, setSearch_val] = React.useState("");
  const [length, setLength] = useState(5);
  const [columns, setColumns] = React.useState([]);
  const [Id, setId] = useState("");
  const navigate = useNavigate();
  let data = {
    page: page,
    limit: length,
    sort: "desc",
    search: "",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getList();
    const headCells = [
      {label:"First Name",name:"FirstName"},
      {label:"Last Name",name:"LastName"},
      {label:"Email",name:"Email"},
      {label:"Phone",name:"Phone"},
      {label:"Created On",name:"created_on"},
      {label:"Vehicles",name:"Vehicles"},
      // {label:"Action",name:"Action"},
    ].map((item, index) => ({
      id: item === "" ? "none" : item.name,
      numeric: false,
      disablePadding: true,
      label: item.label,
    }));
    setColumns(headCells);
  }, [length]);

  const getList = () => {
    setLoading(true);
    getCustomerList(data).then((res) => {
      setLoading(false);
      if (res?.data?.data?.total_records === 0) {
        setTotal(res?.data?.data?.total_records);
        setPages(res?.data?.data?.pages);
        setRows(res?.data?.data?.customer_list);
      } else if (res?.data?.status) {
        setRows(res?.data?.data?.customer_list);
        setPages(res?.data?.data?.pages);
        setTotal(res?.data?.data?.total_records);
      } else {
        setRows(res?.data?.data?.customer_list);
        setPages(res?.data?.data?.pages);
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
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
    data.page = value;
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
    let data = { customer_id: id };
    // setDialog(true);
    // if (dialog === "Yes") {
    deleteCustomer(data).then((res) => {
      if (res.data.status) {
        setDialog(false);
        toast.success(res?.data?.message);
        getList();
      } else {
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
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
      // Object.assign(data, { staff_id: staff })

      // if (order && orderBy) {
      //   let sort_column = { sort_column: orderBy };
      //   let sort = { sort_by: order };
      //   Object.assign(data, sort_column, sort);
      // }
      getList();
    }
  };
  const handleChange = (e) => {
    setLength(e.target.value);
    getList();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // p: 3,
      }}>
      <TopBox
        headerText={"Customer"}
        button_one={"+ Add Customer"}
        searchText={"Search customer"}
        setSearch_val={setSearch_val}
        onSubmit={onSubmit}
        button_one_onClick={() => {
          navigate("/customers/update");
          // setDialog1(true);
        }}
      />
      <AlertDialog
        title={"Are you sure you want to delete this Customer?"}
        open={dialog}
        onClickButton={() => handleDelete(Id)}
        onClickButtonCancel={() => setDialog(false)}
      />
      <Dialog
        open={dialog1}
        // onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ fontSize: "18px", color: "#3D2E57" }} id="alert-dialog-title">
          This is under progress
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#27AE60",
              textTransform: "none",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#27AE60",
              },
            }}
            onClick={() => setDialog1(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <LoaderComponent open={loading} />
      <Box sx={Style.table.tableWrapBox}>
        {rows?.length == 0 && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 20,
              pb: 20,
              fontSize: {xs:'20px',sm:"35px"},
              color: "#A8A8A8",
              fontWeight: "700",
            }}>
            No Customer Found
          </Typography>
        )}
        {!rows?.length == 0 && (
          <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
            <EnhancedTableHead
              // numSelected={selected.length}
              columns={columns}
              setColumns={setColumns}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.Name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left" sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.firstName}
                  </TableCell>

                  <TableCell align="left" sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.lastName}
                  </TableCell>

                  <TableCell align="left" sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.email}
                  </TableCell>

                  <TableCell align="left" sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.phone}
                  </TableCell>

                  <TableCell align="left" sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && row.created_on}
                  </TableCell>

                  <TableCell align="left" sx={Style.table.tableCell}>
                    {loading && <Skeleton sx={{ width: "100px" }} />}
                    {!loading && (
                      <Button sx={{ display: "flex", justifyContent: "space-between" }} onClick={() => setDialog1(true)}>
                        {row.vehicles}
                        <RemoveRedEyeIcon sx={{ color: "#4969B2", fontSize: "20px", ml: 1 }} />
                        <Button sx={{ color: "#F15F23" }}>
                          <AddIcon />
                          Add
                        </Button>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="left" sx={Style.table.tableCell}>
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
                            navigate("/customers/update", { state: row.customer_id });
                            // setDialog1(true);
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
                            setId(row.customer_id);
                            // setDialog1(true);
                          }}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Toastify />
          </Table>
        )}
      </Box>
      {total !== 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            p: 1,
          }}>
          <Typography
            sx={{
              pl: { xs: 0, sm: 3 },
              fontWeight: 400,
              fontSize: { xs: "12px", sm: "16px" },
              "&.MuiTypography-root": {
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: { xs: "center", md: "flex-start" },

                mb: 1,
              },
            }}>
            Number of Rows per Page
            <Select
              variant="standard"
              value={length}
              disableUnderline
              SelectDisplayProps={{
                style: {
                  padding: "0px 10px",
                  color: "rgba(0, 0, 0, 0.6)",
                  backgroundColor: "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "4px",
                },
              }}
              onChange={handleChange}
              sx={{
                ml: { xs: 0, sm: 1 },
                mr: { xs: 0, sm: 1 },
                // width: {xs:'20%',sm:'5%'},
                fontSize: { xs: "14px", sm: "16px" },
                display: "flex",
                justifyContent: "space-between",
              }}>
              <MenuItem value={5}>5</MenuItem>
              {total > 5 && <MenuItem value={10}>10</MenuItem>}
              {total > 10 && <MenuItem value={20}>20</MenuItem>}
            </Select>
            out of {total}{" "}
          </Typography>
          {pages > 1 && (
            <Pagination
              count={pages}
              page={page}
              boundaryCount={1}
              sx={{ button: { fontSize: "16px", mr: 1 }, width: "100%", display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}
              onChange={handlePageChange}
              siblingCount={0}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerList: (data) => dispatch(getCustomerList(data)),
    deleteCustomer: (data) => dispatch(deleteCustomer(data)),
  };
};

export default connect(null, mapDispatchToProps)(CustomersList);
