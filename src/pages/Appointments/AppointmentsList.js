import { Box, Pagination, Skeleton, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import { getAppointmentList, deleteAppointment } from "../../redux/action/appointments";
import DeleteIcon from "@mui/icons-material/Delete";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import AlertDialog from "../../components/Dialog/Dialog";
const AppointmentsList = ({ getAppointmentList, deleteAppointment }) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = React.useState("asc");
  const [model, setModal] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");
  const [pages, setPages] = useState(0);
  const [dialog, setDialog] = useState(false);

  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState([{
    name:"John Doe",
    contact:"+1 562 5623",
    email:"Johndoe@wca.com",
    vin:"1FM5K8D8XFGA24638",
    price:"$25,000",
    schedule:"14/12/2022 10:44 AM"
  },
  {
    name:"Alex Smith",
    contact:"+1 562 5823",
    email:"alexsmith@wca.com",
    vin:"3CZRE38579G775540",
    price:"$25,000",
    schedule:"14/12/2022 10:44 AM"
  },
  {
    name:"Mike Tyson",
    contact:"+1 567 5627",
    email:"miketyson@wca.com",
    vin:"1FMCU93G29KC81990",
    price:"$22,000",
    schedule:"14/12/2022 10:44 AM"
  }]);
  const [perv_search_val, setPerv_Search_val] = React.useState("");
  const [search_val, setSearch_val] = React.useState("");
  const [Id, setId] = useState("")
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
    getAppointments();
  }, []);

  const getAppointments = () => {
    setLoading(true);
    getAppointmentList(data).then((res) => {
      setLoading(false);
      if (res.data) {
        setRows(res?.data?.staff_list);
        setPages(res?.data?.pages);
      } else {
        setRows(res?.data?.staff_list);
        setPages(res?.data?.pages);
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
    getAppointments();
  };
  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
    data = {
      page: value,
      limit: length,
      sort: "",
      sortColumn: "",
      search: "",
    };
    if (order && orderBy) {
      data.sort = order;
      data.sortColumn = orderBy;
    }
    if (search_val) {
      data.search = search_val;
    }
    getAppointments();
  };
  const handleDelete = (id) => {
    let data = { staff_id: id };
    // setDialog(true);
    // if (dialog === "Yes") {
      deleteAppointment(data).then((res) => {
      if (res.data.status) {
        setDialog(false);
        getAppointments();
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
      // if (order && orderBy) {
      //   let sort_column = { sort_column: orderBy };
      //   let sort = { sort_by: order };
      //   Object.assign(data, sort_column, sort);
      // }
      getAppointments();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}>
      <TopBox
        headerText={"Appointments"}
        searchText={"Search"}
        sortingText={"Customer"}
        value={""}
        onClick={onclick}
        onSubmit={onSubmit}
        search_val={search_val}
        setSearch_val={setSearch_val}
       
      />
      <AlertDialog
        title={"Are you sure?"}
        text={"To delete this item"}
        open={dialog}
        onClickButton={() => handleDelete(Id)}
        onClickButtonCancel={() => setDialog(false)}
      />
      <LoaderComponent open={loading} />
      <Box sx={{ overflow: "auto", p: 3 }}>
        
      {rows.length==0 && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 20,
            pb: 20,
            fontSize: "35px",
            color: "#A8A8A8",
            fontWeight: "700",
          }}
        >
          No Appointment Found
        </Typography>
      )}
      {!rows.length==0 && (  
      <Table
          sx={{
            minWidth: { xs: "775px", md: "100%" },
            border: "1px solid #dddddd",
            borderRadius: "25px",
          }}
          aria-labelledby="tableTitle">
          <EnhancedTableHead
            totalColumn={["Customer Name","Contact No", "Email","VIN","Price", "Scheduled on", "Action"]}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell sx={{ width: "130px" }}>
                  {loading && <Skeleton sx={{ width: "100px" }} />}
                  {!loading && row.name}
                </TableCell>
                <TableCell sx={{ width: "130px" }}>
                  {loading && <Skeleton sx={{ width: "100px" }} />}
                  {!loading && row.contact}
                </TableCell>
                <TableCell sx={{ width: "120px" }}>
                  {loading && <Skeleton sx={{ width: "100px" }} />}
                  {!loading && row.email}
                </TableCell>
                <TableCell sx={{ width: "120px" }}>
                  {loading && <Skeleton sx={{ width: "100px" }} />}
                  {!loading && row.vin}
                </TableCell>
                <TableCell sx={{ width: "100px" }}>
                  {loading && <Skeleton sx={{ width: "100px" }} />}
                  {!loading && row.price}
                </TableCell>
                <TableCell sx={{ width: "120px" }}>
                  {loading && <Skeleton sx={{ width: "100px" }} />}
                  {!loading && row.schedule}
                </TableCell>
                <TableCell sx={{ width: "120px" }}>
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
                          setDialog(true)
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          p: 1,
        }}>
        {pages > 1 && (
          <Pagination
            count={pages}
            page={page}
            boundaryCount={1}
            sx={{ button: { fontSize: "16px" } }}
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
    getAppointmentList: (data) => dispatch(getAppointmentList(data)),
    deleteAppointment: (data) => dispatch(deleteAppointment(data)),
  };
};

export default connect(null, mapDispatchToProps)(AppointmentsList);
