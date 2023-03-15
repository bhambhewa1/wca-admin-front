import React from "react";
import { Box, TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { visuallyHidden } from "@mui/utils";
import { useLocation } from "react-router-dom";

const Icon = () => {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5px",
      }}>
      <ArrowDropUpIcon sx={{ fontSize: "16px", marginTop: "-2px", marginBottom: "-6px" }} />
      <ArrowDropDownIcon sx={{ fontSize: "16px", marginTop: "-3px" }} />
    </span>
  );
};

export const EnhancedTableHead = ({
  totalColumn,
  numSelected,
  order,
  orderBy,
  onSelectAllClick,
  onRequestSort,
  rowCount,
  //   checkbox,
}) => {
  const headCells = totalColumn.map((item, index) => ({
    id: item === "" ? "none" : item,
    numeric: false,
    disablePadding: true,
    label: item,
  }));
  const location = useLocation();
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "#F6FAFD", border: "1px solid #ECECEC" }}>
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            style={Style.tableHeader}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.label}
            {headCell.id !== "none" && headCell.id !== "Action" && headCell.id !== "Image" && (
              <TableSortLabel
                active={orderBy === headCell.id}
                IconComponent={Icon}
                direction={orderBy === headCell.id ? order : "asc"}
                // onClick={createSortHandler(
                //   headCell.id === "Item" ? "none" : headCell.id
                // )}
              >
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
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
    borderRadius: "2px",
    letterSpacing: "0px",
    paddingLeft: "16px",
    fontSize: "14px",
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
