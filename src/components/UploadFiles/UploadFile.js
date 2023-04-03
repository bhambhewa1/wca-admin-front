import React from 'react';
import { Box, Button, Chip, Fab, Grid, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AlertDialog from '../Dialog/Dialog';

const UploadFile = ({setUploadArray, arr, index}) => {

  const [myarray,setMyarray] = React.useState(arr);
  const [open,setOpen] = React.useState(false);

  const handleUploadArray = (e) => {  
    myarray[index].path = e.target.files[0];
    myarray[index].src = URL.createObjectURL(e.target.files[0]);
    setMyarray([...myarray])
    setUploadArray([...myarray])
  };
   
  const handleDelete = (id) => {
   myarray[index].id = id
   myarray[index].path = ""
   myarray[index].src = ""
   setMyarray([...myarray])
   setUploadArray([...myarray])
  }

  return (
    <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 2,
            }}>
              <AlertDialog image={require("../../assests/loginBigImg.png")} open={open} onClickButtonCancel={() => setOpen(false)} />
            <input
              style={{ padding: "17px 12px", display: "none" }}
              type="file"
              id={index}
              name={index}
              accept="image/png, image/gif, image/jpeg"
              onChange={handleUploadArray}
            />
            <label htmlFor={index} >
              <Button
                component="span"
                sx={{
                  bgcolor: "#F15F23",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#F15F23",
                  },
                  color: "white",
                  textTransform: "none",
                  borderRadius: "130px",
                  pl: 2,
                  pr: 2,
                  mr:5,
                  fontSize: "12px",
                }}>
                <CloudUploadIcon sx={{ mr: 1 }} /> Upload
              </Button>
            </label>

            { myarray[index].src && (
              <Chip
                // href={myarray[index].src}
                label={myarray[index].path.name}
                component="a"
                variant="outlined"
                name="driver_license"
                onClick={() => setOpen(true)}
                onDelete={() => {
                  handleDelete(myarray[index].id);
                  // setImgerr(true)
                }}
              />
            )}
          </Box>
  )
}

export default UploadFile;