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
} from "@mui/material";
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
  const [total, setTotal] = useState(0);
  const [page, setPage] = React.useState(1);
  const [columns, setColumns] = React.useState([]);
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
    document.title = "WCA - Staff";
    window.scrollTo(0, 0);
    getList();
    const headCells = [
      { label: "First Name", name: "Firstname" },
      { label: "Last Name", name: "Lastname" },
      { label: "Type", name: "Type" },
      { label: "Contact No", name: "Contact No" },
      { label: "Email", name: "Email" },
      { label: "Created On", name: "CreatedOn" },
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
    getStaffList(data).then((res) => {
      setLoading(false);
      if (res?.data?.data?.total_records === 0) {
        setTotal(res?.data?.data?.total_records);
        setPages(res?.data?.data?.pages);
        setRows(res?.data?.data?.staff_list);
      } else if (res?.data?.data?.status) {
        setRows(res?.data?.data?.staff_list);
        setPages(res?.data?.data?.pages);
        setTotal(res?.data?.data?.total_records);
      } else {
        setRows(res?.data?.data?.staff_list);
        setTotal(res?.data?.data?.total_records);
        setPages(res?.data?.data?.pages);
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
      }
    });
  };
  console.log(total);
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
    data.staff_id = staff;
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
    let delete_data = { staff_id: id };
    // setDialog(true);
    // if (dialog === "Yes") {
    deleteStaff(delete_data).then((res) => {
      if (res.data.status) {
        setDialog(false);

        toast.success(res?.data?.message);
        getStaffList(data).then((res) => {
          setLoading(false);
          if (res?.data?.data?.total_records === 0) {
            setTotal(res?.data?.data?.total_records);
            setPages(res?.data?.data?.pages);
            setRows(res?.data?.data?.staff_list);
          } else if (res?.data?.data?.status) {
            setRows(res?.data?.data?.staff_list);
            setLength(res?.data?.data?.total_records <= 10 ? 10 : 20);
            setPages(res?.data?.data?.pages);
            setPage(1);
            setTotal(res?.data?.data?.total_records);
          } else {
            setRows(res?.data?.data?.staff_list);
            setPages(res?.data?.data?.pages);
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

  const onSubmit = (value) => {
    if ((value !== "" && value.trim().length !== 0) || perv_search_val !== "") {
      setPerv_Search_val(value);
      setLoading(true);
      setSearch_val(value);
      setPage(1);
      data.search = value;
      Object.assign(data, { staff_id: staff });

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
    // getList();
  };
  {
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        {rows?.length == 0 && (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 20,
              pb: 20,
              fontSize: { xs: "20px", sm: "35px" },
              color: "#A8A8A8",
              fontWeight: "700",
            }}
          >
            No Staff Member Found
          </Typography>
        )}
        {!rows?.length == 0 && (
          <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
              setColumns={setColumns}
            />
            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  key={row.staff_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
      {total !== 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            p: 1,
          }}
        >
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
            }}
          >
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
              }}
            >
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
    getStaffList: (data) => dispatch(getStaffList(data)),
    deleteStaff: (data) => dispatch(deleteStaff(data)),
  };
};

export default connect(null, mapDispatchToProps)(StaffList);
