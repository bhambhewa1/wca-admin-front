import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";

export const EnhancedTableHead = ({
  totalColumn,
  numSelected,
  columns,
  setColumns,
  order,
  orderBy,
  onRequestSort,
  rowCount,
}) => {
  const [indexOfArrow, setIndexOfArrow] = React.useState();
  const location = useLocation();
  // const [columns, setColumns] = React.useState(totalColumn);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // const headCells = columns.map((item, index) => ({
  //   id: item === "" ? "none" : item,
  //   numeric: false,
  //   disablePadding: true,
  //   label: item,
  // }));
  const createSortHandler = (property, index) => (event) => {
    onRequestSort(event, property);
    setIndexOfArrow(index);
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      columns,
      result.source.index,
      result.destination.index
    );

    setColumns([...items]);
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    // margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    // display: 'flex',
    // padding: grid,
    overflow: "auto",
  });

  const Icon = ({ fontUp, fontDown }) => {
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "5px",
        }}
      >
        <ArrowDropUpIcon
          sx={{
            fontSize: order !== "asc" ? fontUp : "",
            marginTop: "-2px",
            marginBottom: "-6px",
          }}
        />
        <ArrowDropDownIcon
          sx={{ fontSize: order !== "desc" ? fontDown : "", marginTop: "-3px" }}
        />
      </span>
    );
    // fontSize:order==="asc"?"20px":"16px",
  };
  return (
    <TableHead>
      {location.pathname === "/vehicles/negotiating" ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <TableRow
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                sx={{
                  bgcolor: "#F6FAFD",
                  border: "1px solid #ECECEC",
                  borderRadius: "10px",
                }}
              >
                {columns.map((headCell, index) => (
                  <Draggable
                    key={headCell.id}
                    draggableId={headCell.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableCell
                        key={headCell.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        // align={headCell.numeric ? 'right' : 'left'}
                        sx={Style.tableHeader}
                        // padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                      >
                        {headCell.label}
                        {headCell.la !== "Type" &&
                          headCell.id !== "Action" &&
                          headCell.id !== "Contact No" &&
                          headCell.id !== "Template format name" &&
                          headCell.id !== "Make" && (
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              IconComponent={() => (
                                <Icon
                                  fontDown={
                                    index === indexOfArrow ? "24px" : "16px"
                                  }
                                  fontUp={
                                    index === indexOfArrow ? "24px" : "16px"
                                  }
                                />
                              )}
                              direction={
                                orderBy === headCell.id ? order : "asc"
                              }
                              onClick={createSortHandler(
                                headCell.id === "Item" ? "none" : headCell.id,
                                index
                              )}
                            >
                              {/* //   {orderBy === headCell.id ? (
              //     <Box component="span" sx={visuallyHidden}>
              //       {order === "desc" ? "sorted descending" : "sorted ascending"}
              //     </Box>
              //   ) : null} */}
                            </TableSortLabel>
                          )}
                      </TableCell>
                    )}
                  </Draggable>
                ))}
                <TableCell sx={Style.tableHeader}>Action</TableCell>
              </TableRow>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <TableRow
          sx={{
            bgcolor: "#F6FAFD",
            border: "1px solid #ECECEC",
            ".MuiTableRow-root": {
              // borderRadius: "20px",
              // border-bottom-left-radius: 10px;
            },
            borderRadius: "10px",
          }}
        >
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
          {columns.map((headCell, index) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
              sx={Style.tableHeader}
              // padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label}
              {headCell.id !== "Type" &&
                headCell.id !== "Action" &&
                headCell.id !== "Contact No" &&
                headCell.id !== "Template format name" &&
                headCell.id !== "Make" && (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    IconComponent={() => (
                      <Icon
                        fontDown={index === indexOfArrow ? "24px" : "16px"}
                        fontUp={index === indexOfArrow ? "24px" : "16px"}
                      />
                    )}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(
                      headCell.id === "Item" ? "none" : headCell.id,
                      index
                    )}
                  >
                    {/* //   {orderBy === headCell.id ? (
            //     <Box component="span" sx={visuallyHidden}>
            //       {order === "desc" ? "sorted descending" : "sorted ascending"}
            //     </Box>
            //   ) : null} */}
                  </TableSortLabel>
                )}
            </TableCell>
          ))}
          <TableCell sx={Style.tableHeader}>Action</TableCell>
        </TableRow>
      )}
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
