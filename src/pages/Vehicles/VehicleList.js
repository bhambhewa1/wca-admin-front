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
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconLinkButton from "../../components/Buttons/IconLinkButton";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import { Style } from "../../const/Style";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { deleteVehicleItem, getVehiclesList } from "../../redux/action/vehicle/vehicle";
import { useFormik } from "formik";
import { addVIN } from "../../redux/action/vehicle/vehicle";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import Toastify from "../../components/SnackBar/Toastify";
import AlertDialog from "../../components/Dialog/Dialog";
const schema = yup.object().shape({
  vin: yup.string().required("Please enter valid VIN number").min(14, `Enter minimum 14 characters `),
});
const VehicleList = ({ getVehiclesList, addVIN, deleteVehicleItem }) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [dialog, setDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [columns, setColumns] = React.useState([]);
  const [tableData, setTableData] = useState({
    rows: [],
    pages: 0,
    total: 0,
  });
  const [perv_search_val, setPerv_Search_val] = useState("");
  const [search_val, setSearch_val] = useState("");
  const [length, setLength] = useState(5);
  const [Id, setId] = useState("");
  const navigate = useNavigate();
  let data = {
    page: 1,
    limit: length,
    sort: "desc",
    search: "",
  };

  useEffect(() => {
    document.title = "WCA - Vehicle";
    window.scrollTo(0, 0);
    getList();
    const headCells = [
      { label: "VIN", name: "vin" },
      { label: "Make", name: "make" },
      { label: "Year", name: "year" },
      { label: "Model", name: "model" },
      { label: "Price", name: "trade_price" },
      { label: "Created On", name: "created_on" },
      { label: "Miles", name: "miles" },
      { label: "Int Color", name: `base_int_color` },
      { label: "Ext Color", name: `base_ext_color` },
    ].map((item, index) => ({
      id: item === "" ? "none" : item.name,
      numeric: false,
      disablePadding: true,
      label: item.label,
    }));
    setColumns(headCells);
  }, [length]);
  const getList = () => {
    formik.values.vin = "";
    setLoading(true);
    getVehiclesList(data).then((res) => {
      const response = res?.data?.data;
      setLoading(false);
      if (res?.data?.data?.total_records === 0) {
        setTableData({
          total: response?.total_records,
          pages: response?.pages,
          rows: response?.vehicles_list,
        });
      } else if (res?.data?.status) {
        setTableData({
          total: response?.total_records,
          pages: response?.pages,
          rows: response?.vehicles_list,
        });
      } else {
        setTableData({ pages: response?.pages, rows: response?.vehicles_list });
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
      }
    });
  };
  const handleChange = (e) => {
    // e.target.value = e.target.values;
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
  const handleDelete = (id) => {
    let vehicles_id = { vehicles_id: id };
    setDialog(true);
    deleteVehicleItem(vehicles_id).then((res) => {
      if (res.data.status) {
        setDialog(false);

        toast.success(res?.data?.message);
        getVehiclesList(data).then((res) => {
          const response = res?.data?.data;
          setLoading(false);
          if (response?.total_records === 0) {
            setTableData({
              total: response?.total_records,
              pages: response?.pages,
              rows: response?.vehicles_list,
            });
          } else if (res?.data?.status) {
            setTableData({
              total: response?.total_records,
              pages: response?.pages,
              rows: response?.vehicles_list,
            });
          } else {
            setTableData({
              pages: response?.pages,
              rows: response?.vehicles_list,
            });
            res?.data?.errors.map((error) => {
              toast.error(error);
            });
          }
        });
      } else {
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
      }
    });
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const Submit = (value) => {
    if ((value !== "" && value.trim().length !== 0) || perv_search_val !== "") {
      setPerv_Search_val(value);
      setLoading(true);
      setSearch_val(value);
      setPage(1);
      data.search = value;
      getList();
    }
  };

  const formik = useFormik({
    initialValues: {
      vin: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      onSubmit(value);
    },
    enableReinitialize: true,
  });
  const onSubmit = (val) => {
    let id = { vehicles_id: "" };
    let otherdata = { miles: "", purchase_price: "" };
    Object.assign(id, val, otherdata);
    setLoading(true);
    addVIN(id).then((res) => {
      if (res?.data?.status) {
        toast.success(res.data.message);
        setOpen(false);
        setLoading(false);
        getList();
      } else {
        setLoading(false);
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
        headerText={"Appraisal Vehicles"}
        button_one={"+ Add Vehicle"}
        // button_two={"Negotiating vehicles"}
        // button_three={"Purchased vehicles"}
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
        <DialogTitle sx={{ borderBottom: "1px solid #dddddd", overflow: "hidden" }}>Add Vehicle</DialogTitle>
        <LoaderComponent open={loading} />

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
                maxLength: 17,
                style: {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  color: "#A8A8A8",
                },
              }}
            />
            {formik.errors.vin && formik.touched.vin ? <p style={{ color: "red", margin: "10px" }}>{formik.errors.vin}</p> : null}
            <Box sx={{ display: "flex", mt: "10px" }}>
              <InfoOutlinedIcon sx={{ fontSize: "18px", mr: "10px" }} />
              <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                All the Ford vehicle start with 2FAP etc. Honda and Toyota , GMC has their owns special characters which has been assigned
                to each manufacture.
              </Typography>
            </Box>
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

      <AlertDialog
        title={"Are you sure you want to delete this vehicle ?"}
        open={dialog}
        onClickButton={() => handleDelete(Id)}
        onClickButtonCancel={() => setDialog(false)}
      />
      <Box sx={Style.table.tableWrapBox}>
        {tableData?.rows?.length == 0 && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 20,
              pb: 20,
              fontSize: { xs: "20px", sm: "35px" },
              color: "#A8A8A8",
              fontWeight: "700",
            }}>
            No Vehicle Found
          </Typography>
        )}
        {!tableData?.rows?.length == 0 && (
          <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
            <EnhancedTableHead onRequestSort={handleRequestSort} columns={columns} setColumns={setColumns} />
            <TableBody>
              {tableData?.rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {columns.map((item, index) => (
                      <TableCell component="th" scope="row" padding="none" sx={Style.table.tableCell}>
                        { item.id === "trade_price" || item.id === "miles" ? Number(row[item.id]).toLocaleString() :row[item.id]}   
                      </TableCell>  
                    ))}
                    <TableCell sx={Style.table.tableCell}>
                      <IconLinkButton buttonName={"Edit"} onClickLink={`/vehicles/details/info/${row.vehicles_id}`} id={row.vehicles_id} />
                      <IconLinkButton
                        onClickButton={() => {
                          setDialog(true);
                          setId(row.vehicles_id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>
      {tableData?.total !== 0 && (
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
              {tableData?.total > 5 && <MenuItem value={10}>10</MenuItem>}
              {tableData?.total > 10 && <MenuItem value={20}>20</MenuItem>}
            </Select>
            out of {tableData?.total}{" "}
          </Typography>
          {tableData?.pages > 1 && (
            <Pagination
              count={tableData?.pages}
              page={page}
              boundaryCount={1}
              sx={{
                button: { fontSize: "16px", mr: 1 },
                width: "100%",
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
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
    deleteVehicleItem: (data) => dispatch(deleteVehicleItem(data)),
    addVIN: (data) => dispatch(addVIN(data)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleList);
