import React from 'react';
import { Box, Button, Chip, Fab, Grid, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadFile = ({id,path,src}) => {
  return (
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
            //   onChange={handleDriverLicense}
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

            {src && (
              <Chip
                href={src}
                clickable
                label={path.name || path.name1}
                component="a"
                variant="outlined"
                name="driver_license"
                onDelete={() => {
                //   console.log("ram...1.",driverLicense);
                //   setDriverLicense({ id: driverLicense.id, path: "", src:"" });
                  // setImgerr(true)
                }}
              />
            )}
          </Box>
  )
}

export default UploadFile;