import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import ntc from "ntc";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const Colors = () => {
  const [color, setColor] = useState(false);
  const [index, setIndex] = useState();
  const [open, setOpen] = useState();
  const [colorpicker, setColorpicker] = useColor("#000000");
  const [colorName, setColorName] = useState([]);
  useEffect(() => {
    // setColorName(ntc.name(colorpicker.hex));
  }, [colorpicker.hex]);

  console.log(colorpicker.hex);
  console.log(colorName);

  return (
    <Grid columnGap={"10px"} container>
      <Dialog open={open}>
        <Box sx={{ p: 2 }}>
          <Typography>Select Color</Typography>
          <ColorPicker
            width={456}
            height={228}
            color={colorpicker}
            onChange={setColorpicker}
            hideHSV
            dark
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "35%", lg: "100%" },
            float: "left",
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-end" },
            pb: 2,
            pr: { xs: 1, sm: 3 },
            pl: { xs: 1, sm: 0 },
          }}
        >
          <Button
            disableRipple
            sx={{
              mr: { md: 3 },
              pl: "35px",
              pr: "35px",
              pt: "10px",
              pb: "10px",
              fontSize: "16px",
              lineHeight: "21px",
              fontWeight: 400,
              borderRadius: "5px",
              textTransform: "none",
              border: "1px solid #EB5757",
              bgcolor: "#EB5757",
              color: "white",
              "&.MuiButtonBase-root:hover": {
                border: "1px solid #EB5757",
                bgcolor: "#EB5757",
                color: "white",
              },
            }}
            onClick={() => {
              setOpen(false);
            }}
            variant="outlined"
            className="btn"
          >
            Cancel
          </Button>
          <Button
            disableRipple
            sx={{
              pl: "35px",
              pr: "35px",
              pt: "10px",
              pb: "10px",
              fontSize: "16px",
              lineHeight: "21px",
              fontWeight: 400,
              borderRadius: "5px",
              textTransform: "none",
              color: "white",
              bgcolor: "#27AE60",
              border: "1px solid #27AE60",
              "&.MuiButtonBase-root:hover": {
                border: "1px solid #27AE60",
                color: "white",
                bgcolor: "#27AE60",
              },
            }}
            variant="outlined"
            className="btn"
            onClick={() => {
              setColorName(ntc.name(colorpicker.hex))
              setOpen(false)
            }}
          >
            Save
          </Button>
        </Box>
      </Dialog>

      <Grid
        flex={"1 1 auto"}
        sx={{
          borderRight: "2px solid #ECECEC",
          mt: "10px",
        }}
        item
      >
        <Item
          sx={{
            p: "0px 20px 0px 0px",
            fontSize: "14px",
            color: "#000",
            boxShadow: "none",
            textAlign: "left",
            borderRadius: "0px",
          }}
        >
          Colors
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: "10px",
            }}
          >
            <Box
              sx={{
                p: "10px",
                bgcolor: "whitesmoke",
                borderRadius: "5px",
                border: "1px solid #ECECEC",
              }}
            ></Box>
            <Typography>Exterior</Typography>

            <Box
              sx={{ p: "10px", bgcolor: colorpicker.hex, borderRadius: "5px" }}
              onClick={() => setOpen(true)}
            ></Box>
            <Typography>{colorName[1]}</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid sx={{ width: "50%" }} container rowGap={"10px"} columnGap={"10px"}>
        <Grid
          flex={"1 1 auto"}
          sx={{
            pt: "15px",
            ml: { xs: "0px", lg: "30px" },
          }}
          item
        >
          <Item
            sx={{
              p: "0px",
              fontSize: "14px",
              color: "#000",
              boxShadow: "none",
              textAlign: "left",
            }}
          >
            Keys
            <Grid
              container
              flex={"1 1 auto"}
              columnGap={"5px"}
              sx={{ width: "90%", pt: 1 }}
            >
              {[0, 1, 2, "+3"].map((item, ind) => (
                <Button
                  disableRipple
                  sx={{
                    fontSize: { xs: "12px", xl: "16px" },
                    color: "#000",
                    mb: "20px",
                    border: color
                      ? ind === index
                        ? "2px solid #F15F23"
                        : "2px solid #ECECEC"
                      : "2px solid #ECECEC",
                    p: "0px",
                    minWidth: "40px",
                  }}
                  onClick={() => {
                    setColor(true);
                    setIndex(ind);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Colors;
