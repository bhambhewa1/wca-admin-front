import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import IconLinkButton from "../../components/Buttons/IconLinkButton";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import EditIcon from "@mui/icons-material/Edit";
import { Style } from "../../const/Style";
import { VEHICLEINFO } from "../../routes/constURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { getVehiclesList } from "../../redux/action/vehicle/vehicle";
import { useFormik } from "formik";
import { addVIN } from "../../redux/action/vehicle/vehicle";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import Toastify from "../../components/SnackBar/Toastify";
const rows1 = [
  { id: 1, VIN: "1FM5K8D8XFGA24638", createdOn: "1/1/2022 10:11 AM" },
  { id: 2, VIN: "1FM5K8D8XFGA24638", createdOn: "1/1/2022 10:11 AM" },
];

const VehicleList = ({ getVehiclesList, addVIN }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = React.useState("asc");
  const [model, setModal] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [pages, setPages] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [perv_search_val, setPerv_Search_val] = React.useState("");
  const [search_val, setSearch_val] = React.useState("");
  const [length, setLength] = useState(5);
  const [Id, setId] = useState("");
  const navigate = useNavigate();
  let data = {
    page: page,
    limit: length,
    sort: "desc",
    search: "",
  };

  React.useEffect(() => {
    document.title = "WCA - Vehicle";
    window.scrollTo(0, 0);
    getList();
  }, [length]);
  const getList = () => {
    setLoading(true);
    getVehiclesList(data).then((res) => {
      setLoading(false);
      if (res?.data?.data?.total_records === 0) {
        setTotal(res?.data?.data?.total_records);
        setPages(res?.data?.data?.pages);
        setRows(res?.data?.data?.vehicles_list);
      } else if (res?.data?.status) {
        setRows(res?.data?.data?.vehicles_list);
        setPages(res?.data?.data?.pages);
        setTotal(res?.data?.data?.total_records);
      } else {
        setRows(res?.data?.data?.vehicles_list);
        setPages(res?.data?.data?.pages);
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
      }
    });
  };
  const handleChange = (e) => {
    setLength(e.target.value);
    // getList();
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
  // const handleDelete = (id) => {
  //   let delete_data = { staff_id: id };
  //   // setDialog(true);
  //   // if (dialog === "Yes") {
  //   deleteStaff(delete_data).then((res) => {
  //     if (res.data.status) {
  //       setDialog(false);

  //       toast.success(res?.data?.message);
  //       getStaffList(data).then((res) => {
  //         setLoading(false);
  //         if (res?.data?.total_records === 0) {
  //           setTotal(res?.data?.total_records);
  //           setPages(res?.data?.pages);
  //           setRows(res?.data?.staff_list);
  //         } else if (res?.data?.status) {
  //           setRows(res?.data?.staff_list);
  //           setLength(res?.data?.total_records <= 10 ? 10 : 20)
  //           setPages(res?.data?.pages);
  //           setTotal(res?.data?.total_records);
  //         } else {
  //           setRows(res?.data?.staff_list);
  //           setPages(res?.data?.pages);
  //           res?.data?.errors.map((error) => {
  //             toast.error(error);
  //           });
  //         }
  //       }
  //       )
  //     } else {
  //       res?.data?.errors.map((error) => {
  //         toast.error(error);
  //       });
  //     }
  //   });
  // };

  const handleOpen = () => {
    setOpen(true);
  };
  const Submit = (value) => {
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
  const formik = useFormik({
    initialValues: {
      vin: "",
    },
    onSubmit: (value) => {
      onSubmit(value);
    },
    enableReinitialize: true,
  });
  const onSubmit = (val) => {
    addVIN(val).then((res) => {
      if (res?.data?.status) {
        toast.success(res.data.message);
        setOpen(false);
        getList();
      } else {
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // p: 3,
      }}>
      <Toastify />
      <TopBox
        headerText={"Vehicles"}
        button_one={"+ Add Vehicle"}
        button_two={"Negotiating vehicles"}
        button_three={"Purchased vehicles"}
        searchText={"Search vehicle"}
        sortingText={"Customer"}
        value={""}
        setSearch_val={setSearch_val}
        onSubmit={Submit}
        onClick={onclick}
        button_one_onClick={() => setOpen(true)}
      />
      <LoaderComponent open={loading} />
      <Dialog open={open}>
        <DialogTitle sx={{ borderBottom: "1px solid #dddddd" }}>Add Vehicle</DialogTitle>
        <DialogContent
          sx={{
            borderBottom: "1px solid #dddddd",
            mt: 2,
            "&.MuiDialogContent-root": {
              pb: 0,
            },
          }}>
          <form onSubmit={formik.handleSubmit}>
            <FormLabel>Enter VIN number</FormLabel>
            <TextField
              variant="filled"
              name="vin"
              onChange={formik.handleChange}
              value={formik.values.vin}
              sx={{ width: "100%" }}
              InputProps={{ disableUnderline: true }}
              inputProps={{
                style: {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  color: "#A8A8A8",
                },
              }}
            />
            <DialogActions
              sx={{
                "&.MuiDialogActions-root": {
                  pr: 0,
                },
              }}>
              <Box
                sx={{
                  width: { xs: "100%", md: "35%", lg: "70%" },
                  float: "right",
                  display: "flex",
                  justifyContent: { xs: "space-between", md: "flex-end" },
                  pb: 3,
                  // pr: 3,
                  pl: { xs: 2, md: 0 },
                }}>
                <Button
                  disableRipple
                  sx={{
                    mr: { md: 3 },
                    pl: "25px",
                    pr: "25px",
                    pt: "10px",
                    pb: "10px",
                    fontSize: "16px",
                    lineHeight: "21px",
                    // fontWeight: 400,
                    borderRadius: "5px",
                    textTransform: "none",
                    border: "1px solid #EB5757",
                    bgcolor: "#EB5757",
                    width: { xs: "40%", md: "50%" },
                    color: "white",
                    "&.MuiButtonBase-root:hover": {
                      border: "1px solid #EB5757",
                      bgcolor: "#EB5757",
                      color: "white",
                    },
                  }}
                  variant="outlined"
                  className="btn"
                  onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  disableRipple
                  sx={{
                    pl: "25px",
                    pr: "25px",
                    pt: "10px",
                    pb: "10px",
                    fontSize: "16px",
                    lineHeight: "21px",
                    // fontWeight: 400,
                    borderRadius: "5px",
                    textTransform: "none",
                    color: "white",
                    bgcolor: "#27AE60",
                    border: "1px solid #27AE60",
                    width: { xs: "40%", md: "50%" },
                    "&.MuiButtonBase-root:hover": {
                      border: "1px solid #27AE60",
                      color: "white",
                      bgcolor: "#27AE60",
                    },
                  }}
                  variant="outlined"
                  className="btn"
                  type="submit">
                  Next
                </Button>
              </Box>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* <Dialog
            open={dialog}
            // onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle sx={{ fontSize: "18px", color: "#3D2E57" }} id="alert-dialog-title">
              This is under progress
            </DialogTitle>
            <DialogContent>
            </DialogContent>
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
                onClick={() => setDialog(false)}>
                OK
              </Button>
            </DialogActions>
          </Dialog> */}
      <Box sx={Style.table.tableWrapBox}>
        {rows?.length == 0 && (
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
            No Vehicle Found
          </Typography>
        )}
        {!rows?.length == 0 && (
          <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
            <EnhancedTableHead
              totalColumn={["VIN", "Make", "Year", "Model", "Price", "CreatedOn", "Action"]}
              // order={order}
              // orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              // rowCount={rows.length}
            />

            <TableBody sx={{ border: "1px solid #ECECEC" }}>
              {rows.map((row) => (
                <TableRow key={row.Name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.vin}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.make}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.year}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.model}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.price}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.created_on}
                  </TableCell>

                  <TableCell align="left" sx={Style.table.tableCell}>
                    <IconLinkButton buttonName={"Edit"} onClickLink={VEHICLEINFO} />
                    <IconLinkButton onClickButton={() => setDialog(true)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
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
    getVehiclesList: (data) => dispatch(getVehiclesList(data)),
    addVIN: (data) => dispatch(addVIN(data)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleList);

// import { Typography } from '@mui/material';
// import { Box } from '@mui/system';
// import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux';
// import { getVehicleData } from '../../redux/action/vehicle/vehicle';
// import LoaderComponent from '../../components/Loader/LoaderComponent'
// const VehicleList = ({ getVehicleData }) => {
//   const [data, setData] = useState([])
//   const [open, setOpen] = useState(true)
//   useEffect(() => {
//     getVehicleData({ vin: "2C4RDGBG1CR385500" }).then((res) => {
//       setOpen(false)
//       if (res?.data?.status) {
//         setData(res?.data?.data?.used_vehicles?.used_vehicle_list)
//       }
//     })
//   }, [])
//   return (
//     <Box sx={{
//       p:5
//     }}>
//       <LoaderComponent open={open}/>
//         {data.map((list)=>(<>
//           <Typography>{" { "}</Typography>
//           <Typography>model:{list.model}</Typography>
//           <Typography>model_year:{list.model_year}</Typography>
//           <Typography>vin:{list.vin}</Typography>
//           <Typography>make:{list.make}</Typography>
//           <Typography>{" } "}</Typography>
//           </> ))}
//           {/* {data} */}
//     </Box >
//   )
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getVehicleData: (data) => dispatch(getVehicleData(data)),
//   };
// };

// export default connect(null, mapDispatchToProps)(VehicleList);
