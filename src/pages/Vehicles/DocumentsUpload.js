import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles, styled } from "@mui/styles";
import UploadFile from "../../components/UploadFiles/UploadFile";
import { Style } from "../../const/Style";

const DocumentsUpload = () => {
  const [driverLicense, setDriverLicense] = useState({
    id: "",
    path: "",
    src: "",
  });

  const handleDriverLicense = (e) => {
    console.log("ram", driverLicense);
    setDriverLicense({
      id: driverLicense.id,
      path: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <>
      {/* <Box sx={{display:'flex', justifyContent: "center"}}> */}
      <Grid
        sx={{ ml: "10px", mt: "20px" }}
        container
        rowGap={"30px"}
        columnGap={"30px"}
      >
        {[0, 1, 2, 3].map((grid, index) => (
          <Grid item xl={5.6} sx={style.innerGrid} key={index}>
            <Typography sx={style.typography1}>Driver license</Typography>
            <Typography sx={style.typography2}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </Typography>
            <UploadFile
              id={driverLicense.id}
              path={driverLicense.path}
              src={driverLicense.src}
            />
          </Grid>
        ))}

        <Grid
          sx={{
            border: "2px solid rgba(0, 0, 0, 0.06)",
            borderRadius: "5px",
            mr: "50px",pb: 8
          }}
          container
          rowGap={"0px"}
          columnGap={"0px"}
        >
          <Grid item xl={12} sx={{mb:4}}>
            <Typography sx={style.typography1}>Pictures of vehicles</Typography>
            <Typography
              sx={style.typography2}
              style={{ paddingRight: "100px" }}
            >
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </Typography>
          </Grid>

          {[0, 1, 2, 3, 4, 5, 6, 7].map((grid, index) => (
            <Grid
              item
              xl={3}
              key={index}
              sx={ 
                index === 1
                  ? style.innerGrid_1
                  : index === 3
                  ? style.innerGrid_3
                  : index === 5
                  ? style.innerGrid_5
                  : style.innerGrid_padd
              }
            >
              <Box sx={index===0 || index===1 || index===2
              ? style.box_borderBottom
              : index===3
              ? style.box_borderBottom_3
              : style.box_borderBottom_padd
              }>
              <Typography sx={style.typography3}>Front</Typography>
              <UploadFile
                id={driverLicense.id}
                path={driverLicense.path}
                src={driverLicense.src}
              />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mb: 7,
          }}
        >
          <Button sx={Style.button}>Add note</Button>
          <Button
            sx={Style.button}
            style={{
              marginLeft: "30px",
              marginRight: "50px",
              backgroundColor: "#28A745",
            }}
          >
            Save
          </Button>
        </Box>
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default DocumentsUpload;

const style = {
  innerGrid: {
    border: "2px solid rgba(0, 0, 0, 0.06)",
    borderRadius: "5px",
    pb: 4,
  },
  typography1: {
    p: 2,
    fontSize: "16px",
    fontWeight: "900",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    color: "#000000",
  },
  typography2: {
    p: 2,
    fontSize: "13px",
    fontWeight: "400",
    color: "#000000",
  },
  innerGrid_1: {
    borderRight: "2px solid rgba(0, 0, 0, 0.06)",
    pr: 4
  },
  innerGrid_3: {
    pr:4
  },
  innerGrid_5: {
    borderRight: "2px solid rgba(0, 0, 0, 0.06)",
  },
  innerGrid_padd: {
    pl:4,
  },
  box_borderBottom: {
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    pb:4
  },
  box_borderBottom_3: {
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    pb:4,pl:4
  },
  box_borderBottom_padd: {
    pb:3
  },
  typography3: {
    p: 2,
    fontSize: "16px",
    fontWeight: "900",
    color: "#000000",
  },
};
