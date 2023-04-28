import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import { Style } from "../../const/Style";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { ConfigurationData } from "../../config/mockData";
const edit = require("../../assests/edit.png");
const Configuration = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(ConfigurationData);
  const navigate = useNavigate();
  useEffect(() => {}, [data]);

  const handleDec = (e) => {
    // name.map((item, ind) => {
    //     if (item.days === 0)
    //         item.days = 0
    //     else {
    //         if (ind === index) {
    //             item.days -= 1
    //         }
    //     }
    // }
    // )
    // setData(name)
  };
  const handleInc = (index, name) => {
    name.map((item, ind) => {
      if (ind === index) {
        item.days += 1;
      }
    });
    // setData(name)
  };
  const Submit = () => {
    // navigate("/vehicles/details/esigndocument");
  };
  return (
    <Box sx={{ p: 3 }}>
      <Dialog open={open}>
        <form handleSubmit={Submit} style={{ width: "100%" }}>
          <DialogTitle sx={{ borderBottom: "1px solid #dddddd", fontSize: "16px", fontWeight: "700" }}>Edit Pay off status</DialogTitle>
          <DialogContent sx={{ borderBottom: "1px solid #dddddd", height: "300px", width: "400px" }}>
            <Box sx={{ pt: 2 }}>
              <FormLabel sx={{ color: "#000000" }}>Status</FormLabel>
              <Select
                variant="filled"
                name="type"
                displayEmpty
                disableUnderline
                SelectDisplayProps={{ style: { padding: 3, marginLeft: "10px", color: "#000000", backgroundColor: "transparent" } }}
                MenuProps={{ disableScrollLock: true }}
                inputProps={{
                  style: {
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontSize: "14px",
                  },
                }}
                sx={{
                  height: "53px",
                  minWidth: "200px",
                  fontSize: "14px",
                  fontWeight: "400",
                  width: "100%",
                  borderBottom: "none",
                }}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="level 1 supervisor">Pending</MenuItem>
                <MenuItem value="level 2 supervisor">Completed</MenuItem>
              </Select>
            </Box>
            <Box sx={{ pt: 2 }}>
              <FormLabel sx={{ color: "#000000" }}>Reason</FormLabel>
              <TextField
                variant="filled"
                name="type"
                displayEmpty
                multiline
                rows={5}
                InputProps={{ disableUnderline: true, style: { padding: 10 } }}
                inputProps={{
                  style: {
                    paddingTop: "0px",
                    paddingBottom: "8px",
                    fontSize: "14px",
                    "&.MuiFilledInput-root": {
                      padding: 0,
                    },
                  },
                }}
                placeholder="Please enter reason"
                sx={{
                  height: "53px",
                  minWidth: "200px",
                  fontSize: "14px",
                  fontWeight: "400",
                  width: "100%",
                  borderBottom: "none",
                  "&.MuiFilledInput-root": {
                    pt: 0,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: { xs: "100%", md: "35%", lg: "70%" },
                float: "right",
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
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
                  fontSize: "14px",
                  lineHeight: "21px",
                  // fontWeight: 400,
                  borderRadius: "5px",
                  textTransform: "none",
                  border: "1px solid #EB5757",
                  bgcolor: "#EB5757",
                  width: { xs: "40%", md: "40%" },
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
                  fontSize: "14px",
                  lineHeight: "21px",
                  // fontWeight: 400,
                  borderRadius: "5px",
                  textTransform: "none",
                  color: "white",
                  bgcolor: "#27AE60",
                  border: "1px solid #27AE60",
                  width: { xs: "40%", md: "40%" },
                  "&.MuiButtonBase-root:hover": {
                    border: "1px solid #27AE60",
                    color: "white",
                    bgcolor: "#27AE60",
                  },
                }}
                variant="outlined"
                className="btn"
                // type="submit"
                onClick={Submit}>
                Save
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <Grid>
        <Typography sx={{ color: "#000000", fontSize: "18px", fontWeight: "700" }}>Configure loan payoff</Typography>
      </Grid>
      <Grid sx={{ paddingTop: 2 }}>
        <Box sx={Style1.inputStyle}>
          <FormLabel sx={{ color: "#000000" }}>Select Date</FormLabel>
          <TextField
            name="date"
            // value={formik.values.phone}
            id="date"
            // onChange={formik.handleChange}
            type="date"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            inputProps={{
              style: {
                paddingTop: "16px",
                paddingBottom: "15px",
                fontSize: "14px",
              },
            }}
            autoComplete="false"
            color="primary"
            placeholder="Enter Date here"
            sx={{
              width: "100%",
              border: "none",
              mt: "10px",
            }}
          />
        </Box>
        {/* {formik.errors.phone && formik.touched.phone ? <p style={Style.validationStyle}>{formik.errors.phone}</p> : null} */}
      </Grid>
      <Grid>
        <Grid sx={{ bgcolor: "#F5F6FA", p: 1, pl: 4 }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: "700" }}>Vehicle Information</Typography>
        </Grid>
        <Grid container sx={Style.table.tableWrapBox}>
          <Table aria-labelledby="tableTitle">
            <TableRow>
              <TableCell sx={Style.table.tableCell} align="left">
                Title
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Days
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Status
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Action
              </TableCell>
            </TableRow>
            <TableBody>
              {data.VehicleInfomation.map((row, index) => (
                <TableRow sx={{ border: "none" }}>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.Title}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <Grid container columnGap={"12px"}>
                      <Button
                        disableRipple
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={handleDec}>
                        <RemoveIcon sx={{ fontsize: "18px", color: "white" }} />
                      </Button>
                      <Grid xs={3}>
                        <TextField
                          sx={{
                            border: "none",
                          }}
                          value={row.days}
                          inputProps={{
                            style: {
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: "12px",
                              border: "none",
                              backgroundColor: "#F5F6FA",
                              textAlign: "center",
                            },
                          }}
                        />
                      </Grid>
                      <Button
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleInc(index, data.VehicleInfomation)}>
                        <AddIcon sx={{ fontsize: "18px" }} />
                      </Button>
                    </Grid>
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} style={{ color: row.Status === "Complete" ? "green" : "#F15F23" }} align="left">
                    {row.Status}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <img width="10%" src={edit} onClick={() => setOpen(true)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid>
        <Grid sx={{ bgcolor: "#F5F6FA", p: 1, pl: 4 }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: "700" }}>Documents</Typography>
        </Grid>
        <Grid container sx={Style.table.tableWrapBox}>
          <Table aria-labelledby="tableTitle">
            <TableRow>
              <TableCell sx={Style.table.tableCell} align="left">
                Title
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Days
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Status
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Action
              </TableCell>
            </TableRow>
            <TableBody>
              {data.Documents.map((row, index) => (
                <TableRow sx={{ border: "none" }}>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.Title}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <Grid container columnGap={"12px"}>
                      <Button
                        disableRipple
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleDec(index, data.Documents)}>
                        <RemoveIcon sx={{ fontsize: "18px", color: "white" }} />
                      </Button>
                      <Grid xs={3}>
                        <TextField
                          sx={{
                            border: "none",
                          }}
                          value={row.days}
                          inputProps={{
                            style: {
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: "12px",
                              border: "none",
                              backgroundColor: "#F5F6FA",
                              textAlign: "center",
                            },
                          }}
                        />
                      </Grid>
                      <Button
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleInc(index, data.Documents)}>
                        <AddIcon sx={{ fontsize: "18px" }} />
                      </Button>
                    </Grid>
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} style={{ color: row.Status === "Complete" ? "green" : "#F15F23" }} align="left">
                    {row.Status}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <img width="10%" src={edit} onClick={() => setOpen(true)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid>
        <Grid sx={{ bgcolor: "#F5F6FA", p: 1, pl: 4 }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: "700" }}>Supervisior</Typography>
        </Grid>
        <Grid container sx={Style.table.tableWrapBox}>
          <Table aria-labelledby="tableTitle">
            <TableRow>
              <TableCell sx={Style.table.tableCell} align="left">
                Title
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Days
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Status
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Action
              </TableCell>
            </TableRow>
            <TableBody>
              {data.Supervisior.map((row, index) => (
                <TableRow sx={{ border: "none" }}>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.Title}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <Grid container columnGap={"12px"}>
                      <Button
                        disableRipple
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleDec(index, data.Supervisior)}>
                        <RemoveIcon sx={{ fontsize: "18px", color: "white" }} />
                      </Button>
                      <Grid xs={3}>
                        <TextField
                          sx={{
                            border: "none",
                          }}
                          value={row.days}
                          inputProps={{
                            style: {
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: "12px",
                              border: "none",
                              backgroundColor: "#F5F6FA",
                              textAlign: "center",
                            },
                          }}
                        />
                      </Grid>
                      <Button
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleInc(index, data.Supervisior)}>
                        <AddIcon sx={{ fontsize: "18px" }} />
                      </Button>
                    </Grid>
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} style={{ color: row.Status === "Complete" ? "green" : "#F15F23" }} align="left">
                    {row.Status}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <img width="10%" src={edit} onClick={() => setOpen(true)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid>
        <Grid sx={{ bgcolor: "#F5F6FA", p: 1, pl: 4 }}>
          <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: "700" }}>Payoff</Typography>
        </Grid>
        <Grid container sx={Style.table.tableWrapBox}>
          <Table aria-labelledby="tableTitle">
            <TableRow>
              <TableCell sx={Style.table.tableCell} align="left">
                Title
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Days
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Status
              </TableCell>
              <TableCell sx={Style.table.tableCell} align="left">
                Action
              </TableCell>
            </TableRow>
            <TableBody>
              {data.Payoff.map((row, index) => (
                <TableRow sx={{ border: "none" }}>
                  <TableCell sx={Style.table.tableCell} align="left">
                    {row.Title}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <Grid container columnGap={"12px"}>
                      <Button
                        disableRipple
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleDec(index, data.Payoff)}>
                        <RemoveIcon sx={{ fontsize: "18px", color: "white" }} />
                      </Button>
                      <Grid xs={3}>
                        <TextField
                          sx={{
                            border: "none",
                          }}
                          value={row.days}
                          inputProps={{
                            style: {
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: "12px",
                              border: "none",
                              backgroundColor: "#F5F6FA",
                              textAlign: "center",
                            },
                          }}
                        />
                      </Grid>
                      <Button
                        sx={{
                          backgroundColor: "#F15F23",
                          color: "white",
                          "&.MuiButton-root ": {
                            minWidth: 0,
                          },
                          "&.MuiButtonBase-root:hover": {
                            color: "white",
                            bgcolor: "#F15F23",
                          },
                        }}
                        onClick={() => handleInc(index, data.Payoff)}>
                        <AddIcon sx={{ fontsize: "18px" }} />
                      </Button>
                    </Grid>
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} style={{ color: row.Status === "Complete" ? "green" : "#F15F23" }} align="left">
                    {row.Status}
                  </TableCell>
                  <TableCell sx={Style.table.tableCell} align="left">
                    <Link onClick={() => setOpen(true)}>
                      <img width="10%" src={edit} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disableRipple
          sx={{
            pl: "35px",
            pr: "35px",
            pt: "10px",
            pb: "10px",
            mr: 2,
            fontSize: "14px",
            lineHeight: "21px",
            // fontWeight: 400,
            borderRadius: "5px",
            textTransform: "none",
            color: "white",
            bgcolor: "#F15F23",
            border: "1px solid #F15F23",
            // width: { xs: "40%", md: "40%" },
            "&.MuiButtonBase-root:hover": {
              border: "1px solid #F15F23",
              color: "white",
              bgcolor: "#F15F23",
            },
          }}
          variant="outlined"
          className="btn"
          // type="submit"
          onClick={() => navigate(-1)}>
          Save
        </Button>
      </Grid>
    </Box>
  );
};

export default Configuration;
const Style1 = {
  label: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    color: "#333333",
  },
  typographyStyle: {
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: { xs: "30px", md: "60px" },
    letterSpacing: "0em",
    textAlign: "center",
    color: "#3D2E57",
    display: "flex",
    // pb: 2,
    pl: { xs: 1, sm: 3 },
    pt: { xs: 2, sm: 0 },
    pb: { xs: 2, sm: 0 },
  },
  inputStyle: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "35%",
      lg: "35%",
      xl: "35%",
    },
    mb: 2,
  },
  star: {
    color: "red",
  },
  rowBoxStyle: {
    width: "100%",
    display: "flex",
    fontSize: "18px",
    fontWeight: "500",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
  },
  validationStyle: {
    color: "red",
    margin: "10px",
  },
};
