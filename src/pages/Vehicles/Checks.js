import { Box, Grid, Typography, Paper, Button, Table, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, FormLabel, DialogActions, Radio, RadioGroup, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import PrintIcon from '@mui/icons-material/Print';
import { VEHICLECHECKS } from '../../routes/constURL'
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
  boxShadow: 'none'
}));
const rows = [
  {
    name: 'Customer',
    template: 'Customer check 1',
    amount: '$25000.00',
    createdOn: '14/12/2022 10:44 AM',
  },
  {
    name: 'Customer',
    template: 'Customer check 1',
    amount: '$25000.00',
    createdOn: '14/12/2022 10:44 AM',
  },
  {
    name: 'Customer',
    template: 'Customer check 1',
    amount: '$25000.00',
    createdOn: '14/12/2022 10:44 AM',
  },
]

const Checks = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };
  const Submit = () => {
    navigate(VEHICLECHECKS);
  };
  return (
    <>
    <Item >
      <Grid container sx={{ boxShadow: '1px solid #dddddd', borderTop: '1px solid #dddddd' }}>
        <Dialog open={open}>
          <form handleSubmit={Submit}>
            <DialogTitle sx={{ borderBottom: "1px solid #dddddd", fontSize: '16px' }}>Generate Check</DialogTitle>
            <DialogContent sx={{ borderBottom: "1px solid #dddddd" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column',fontSize:'12px',mt:2 }}>
                <FormLabel>Type of check</FormLabel>
                <Box sx={{ display: 'flex' }}>
                  <Radio />
                  <label style={{paddingTop:'5px'}}>Inhouse</label>
                  <Radio />
                  <label style={{paddingTop:'5px'}}>Customer</label>
                </Box>
                <Box sx={{mt:2}}>
                  <FormLabel sx={{fontSize:'12px',mt:2}}>
                  Select Check Format
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <Select
                    variant="filled"
                    name="type"
                    value="Customer check 1"
                    // onChange={formik.handleChange}
                    // onBlur = {formik.handleBlur}
                    displayEmpty
                    disableUnderline
                    SelectDisplayProps={{ style: { padding: 3, marginLeft: "10px" ,color:'#000000'} }}
                    MenuProps={{ disableScrollLock: true }}
                    inputProps={{
                      style: {
                        paddingTop: "8px",
                        paddingBottom: "8px",
                      },
                    }}
                    sx={{
                      // height: "53px",
                      pt:1,pb:1,
                      minWidth: "200px",
                      fontSize: "12px",
                      fontWeight: "400",
                      width:'100%',
                      borderBottom: "none",
                    }}>
                    <MenuItem value="Customer check 1">Customer check 1</MenuItem>
                    <MenuItem value="level 1 supervisor"> level 1 supervisor</MenuItem>
                    <MenuItem value="level 2 supervisor"> level 2 supervisor</MenuItem>
                  </Select>
                </Box>
                <Box sx={{mt:2}}>
                  <FormLabel sx={{fontSize:'12px'}}>
                  Amount
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <TextField
                    name="phone"
                    value='$25,000'
                    id="phone"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    type="phone"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                        fontSize:'12px'
                      },
                    }}
                    autoComplete="false"
                    color="primary"
                    placeholder="Enter Phone Number here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                  <Box sx={{mt:2}}>
                  <FormLabel sx={{fontSize:'12px'}}>
                  Activation code
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <TextField
                    // name="phone"
                    // id="phone"
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // type="phone"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                        fontSize:'12px',

                      },
                    }}
                    autoComplete="false"
                    color="primary"
                    sx={{
                      width: "97%",
                      border: "none",
                    }}
                  />
                  </Box>
                  <Link style={{
                     display: 'flex',
                     textDecoration: "none",
                     justifyContent: 'space-around',
                     alignItems: 'center',
                     backgroundColor: "#F15F23",
                     padding: 4,
                     marginTop:'35px',
                     borderRadius: '5px',
                     width: '30%',
                     color:'white'
                  }}>
                  Generate
                  </Link>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Box
                sx={{
                  // width: { xs: "100%", md: "35%", lg: "70%" },
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
                    fontSize: "12px",
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
                    fontSize: "12px",
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
                  // type="submit"
                  onClick={Submit}>
                  Confirm
                </Button>
              </Box>
            </DialogActions>
          </form>
        </Dialog>
        <Grid xs={12} sm={8} >
          <Typography sx={style.headingText}>Checks</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{
          display: 'flex',
          justifyContent: { xs: "", sm: "flex-end" },
        }}>
          <Item sx={{
            fontWeight: 500,
            // bgcolor: "",
            width: '100%',
            // height: '60px',
            p:'20px',
            display: 'flex',
            justifyContent: "space-between",
          }}><Link style={{
            display: 'flex',
            textDecoration: "none",
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: "#F15F23",
            padding: '10px',
            borderRadius: '5px',
            marginRight: 3,
            width: '47%',
          }}>
              <Typography sx={{ color: 'white', fontSize: "14px" }}>Add Notes</Typography>

            </Link>
            <Link style={{
              display: 'flex',
              textDecoration: "none",
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: "#F15F23",
              padding: 4,
              borderRadius: '5px',
              width: '47%',
              // width: '150px',
            }}>
              <Typography sx={{ color: 'white', fontSize: "14px" }} onClick={handleOpen}>Generate Check</Typography>
            </Link></Item>
        </Grid>

      </Grid>
      <Grid container sx={Style.table.tableWrapBox} >
        <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
          <EnhancedTableHead
            totalColumn={["Check Type", "Template format name", "Amount", "Generated on", "Action"]}
          // numSelected={selected.length}
          // order={order}
          // orderBy={orderBy}
          // onSelectAllClick={handleSelectAllClick}
          // onRequestSort={handleRequestSort}
          // rowCount={rows.length}
          />
          <TableBody sx={{ border: "1px solid #ECECEC" }}>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.name}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.template}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.amount}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.createdOn}
                </TableCell>

                <TableCell sx={Style.table.tableCell} >
                  <>
                    <Box sx={{
                      display: 'flex',
                    }}>
                      <PrintIcon sx={{
                        fontSize: "24px",
                        color: '#4BB543'
                      }}
                      />
                      <Typography sx={{ fontSize: '14px' ,mt:'2px'}}>Print</Typography>
                      <DeleteIcon
                        color="error"
                        sx={{
                          fontSize: "24px",
                          ml: 3
                        }}
                      // onClick={() => {
                      //   setDialog(true);
                      //   setId(row.staff_id);
                      // }}
                      />
                    </Box>

                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      </Item >
    </>
  )
}

export default Checks
const style = {
  headingText: {
    fontSize: "14px",
    fontWeight: "800",
    lineHeight: "38px",
    color: "#000000",
    pl: { xs: 1, sm: 3 },
    pt: 2
  },
};