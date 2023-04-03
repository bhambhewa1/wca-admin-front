import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const EnhancedTableHead = ({ totalColumn, numSelected, order, orderBy, onRequestSort, rowCount }) => {
  const [indexOfArrow, setIndexOfArrow] = React.useState();
  const headCells = totalColumn.map((item, index) => ({
    id: item === "" ? "none" : item,
    numeric: false,
    disablePadding: true,
    label: item,
  }));
  const createSortHandler = (property, index) => (event) => {
    onRequestSort(event, property);
    setIndexOfArrow(index);
  };

  const Icon = ({ fontUp, fontDown }) => {
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "5px",
        }}>
        <ArrowDropUpIcon sx={{ fontSize: order !== "asc" ? fontUp : "", marginTop: "-2px", marginBottom: "-6px" }} />
        <ArrowDropDownIcon sx={{ fontSize: order !== "desc" ? fontDown : "", marginTop: "-3px" }} />
      </span>
    );
    // fontSize:order==="asc"?"20px":"16px",
  };
  return (
    <TableHead>
      <TableRow
        sx={{
          bgcolor: "#F6FAFD",
          border: "1px solid #ECECEC",
          ".MuiTableRow-root": {
            // borderRadius: "20px",
            // border-bottom-left-radius: 10px;
          },
          borderRadius: "10px",
        }}>
        {/* {!checkbox && (
          <TableCell style={Style.tableHeaderCheckBox}>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              sx={{ mt: "10px" }}
            />
          </TableCell>
        )} */}
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            sx={Style.tableHeader}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
            {headCell.id !== "Type" && headCell.id !== "Action" && headCell.id !== "Contact No" && headCell.id!=='Template format name'&&headCell.id!=='Make'&& (
              <TableSortLabel
                active={orderBy === headCell.id}
                IconComponent={() => (
                  <Icon fontDown={index === indexOfArrow ? "24px" : "16px"} fontUp={index === indexOfArrow ? "24px" : "16px"} />
                )}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id === "Item" ? "none" : headCell.id, index)}>
                {/* //   {orderBy === headCell.id ? (
              //     <Box component="span" sx={visuallyHidden}>
              //       {order === "desc" ? "sorted descending" : "sorted ascending"}
              //     </Box>
              //   ) : null} */}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const Style = {
  tableHeader: {
    color: "#000000",
    letterSpacing: "0px",
    paddingLeft: "16px",
    fontSize: "14px",
    fontWeight: "800",
    minWidth: "131px",
  },

  tableHeaderCheckBox: {
    lineHeight: "22px",
    color: "#333333",
    width: "40px",
    borderBottom: "2px solid #FF8D2A",
    borderRadius: "2px",
    paddingTop: 0,
    paddingLeft: "16px",
  },
};
