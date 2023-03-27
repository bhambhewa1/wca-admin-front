import { Box, Button, Chip, Fab, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles, styled } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DocumentsUpload = () => {
  const [driverLicense, setDriverLicense] = useState({
    id: "",
    path: "",
    src: "",
  });

  const handleDriverLicense = (e) => {
    console.log("ram",driverLicense);
    setDriverLicense({
      id: driverLicense.id,
      path: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <>
      {/* <Box sx={{display:'flex', justifyContent: "center"}}> */}
      <Grid sx={{ ml: "10px" }} container rowGap={"10px"} columnGap={"60px"}>
        <Grid item xl={5.6} sx={{ border: "1px solid black", pb: 4 }}>
          <Typography sx={{ p: 2, borderBottom: "1px solid black" }}>
            Driver License
          </Typography>
          <Typography sx={{ p: 2 }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 2,
            }}>
            <input
              style={{ padding: "17px 12px", display: "none" }}
              type="file"
              id="drLicense"
              name="main_image"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleDriverLicense}
            />
            <label htmlFor="drLicense">
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
                  fontSize: "16px",
                }}>
                <CloudUploadIcon sx={{ mr: 1 }} /> Upload
              </Button>
            </label>

            {driverLicense.src && (
              <Chip
                // href={mainImg}
                // clickable
                label={driverLicense.path.name || driverLicense.path.name1}
                component="a"
                variant="outlined"
                name="driver_license"
                onDelete={() => {
                  console.log("ram...1.",driverLicense);
                  setDriverLicense({ id: driverLicense.id, path: "", src:"" });
                  // setImgerr(true)
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xl={5.6} sx={{ border: "1px solid black" }}>
          <Typography sx={{ p: 2, borderBottom: "1px solid black" }}>
            Vehicle Registeration
          </Typography>
          <Typography sx={{ p: 2 }}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Typography>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default DocumentsUpload;
