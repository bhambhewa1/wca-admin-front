import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import React from "react";
import IconLinkButton from "../../components/Buttons/IconLinkButton";
import { EnhancedTableHead } from "../../components/TableHeader/TableHeader";
import TopBox from "../../components/TableHeader/TopBox";
import EditIcon from "@mui/icons-material/Edit";
import { Style } from "../../const/Style";
import { VEHICLEINFO } from "../../routes/constURL";
import { useNavigate } from "react-router-dom";
const rows = [
  { id: 1, name: "Fedx",createdOn: "14/12/2022 10:44 AM" },
  { id: 2, name: "DHL",createdOn: "1/1/2022 10:11 AM" },
  { id: 3, name: "UPS",createdOn: "1/1/2022 10:11 AM" },
];

const TruckingCompaniesList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const Submit = () => {
    navigate("/vehicles/details/info");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}>
      <TopBox
        headerText={"Trucking companies"}
        button_one={"+ Add trucking company"}
        searchText={"Search"}
        sortingText={"Customer"}
        value={""}
        onClick={onclick}
        button_one_onClick={handleOpen}
      />
      <Dialog open={open}>
        <form handleSubmit={Submit}>
          <DialogTitle sx={{ borderBottom: "1px solid #dddddd" }}>Add Vehicle</DialogTitle>
          <DialogContent sx={{ borderBottom: "1px solid #dddddd" }}>
            <FormLabel>Enter VIN number</FormLabel>
            <TextField
              variant="filled"
              sx={{ width: "100%" }}
              InputProps={{ disableUnderline: true }}
              inputProps={{
                style: {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  color: "#A8A8A8",
                },
              }}></TextField>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: { xs: "100%", md: "35%", lg: "70%" },
                float: "right",
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
                pb: 3,
                pr: 3,
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
                // type="submit"
                onClick={Submit}>
                Next
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <Box sx={Style.table.tableWrapBox}>
        <Table sx={Style.table.tableBox} aria-labelledby="tableTitle">
          <EnhancedTableHead
            totalColumn={["Company Name", "Created on","Action"]}
            // numSelected={selected.length}
            // order={order}
            // orderBy={orderBy}
            // onSelectAllClick={handleSelectAllClick}
            // onRequestSort={handleRequestSort}
            // rowCount={rows.length}
          />
          <TableBody sx={{ border: "1px solid #ECECEC" }}>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.name}
                </TableCell>
                <TableCell sx={Style.table.tableCell} align="left">
                  {row.createdOn}
                </TableCell>

                <TableCell align="left" sx={Style.table.tableCell}>
                  <IconLinkButton buttonName={"Edit"} onClickLink={VEHICLEINFO} />
                  <IconLinkButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TruckingCompaniesList;
