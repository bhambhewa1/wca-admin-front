import { Box, FormLabel, Grid, IconButton, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { load } from "cheerio";
import React, { useEffect, useState } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { localMarket } from "../../../../redux/action/vehicle/vehicle";
import { connect } from "react-redux";
import axios from "axios";
// const data = [
//   {
//     img: require('../../../../assests/download.jpg'),
//     name: 'Durango',
//     price: '$25,499',
//     rt: 'R/T 5.7L V8',
//     vin: '1C4SDHCT2EC405171',
//     mi: '50,142 Mi',
//     type: 'Pasco, WA',
//     dom: 115
//   },
//   {
//     img: require('../../../../assests/Mahindra-Scorpio-N-300620221053.jpg'),
//     name: 'Durango',
//     price: '$18,324',
//     rt: 'R/T 5.7L V8',
//     vin: '1C4SDHCT2EC405171',
//     mi: '154,217 Mi',
//     type: 'Holly, Mi',
//     dom: 115
//   },
//   {
//     img: require('../../../../assests/0x0.jpg'),
//     name: 'Durango',
//     price: '$24,999',
//     rt: 'R/T 5.7L V8',
//     vin: '1C4SDHCT2EC405171',
//     mi: '102,909 Mi',
//     type: 'Loganville, GA',
//     dom: 115
//   },
// ]
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const LocalMarket = ({ localMarket, localMarketPayloads }) => {
  const [distance, setDistance] = useState("Select");
  const [zip, setZip] = useState("");
  const [data, setData] = useState([
    {
      canonical_mmt: "",
      vin: "",
      price: "",
      stock_type: "",
      mileage: "",
      engine: "",
    },
  ]);
  var model = [localMarketPayloads?.make+'-'+localMarketPayloads?.model]
  var make = [localMarketPayloads?.make]
  const handleSelect = (e) => {
    setDistance(e.target.value);
    market()
  };
  const handleChange = (e) => {
    setZip(e.target.value);
    market()
  };
  useEffect(() => {
    if(localMarketPayloads!==undefined)
    {
      market()
    }

  }, [zip,distance,localMarketPayloads]);
  
  const market = ()=>{
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://wca-python-api.orientaloutsourcing.in/cars?zip=${zip}&maximum_distance=${distance}&models[]=${model}&makes[]=${make}&year_min=${localMarketPayloads?.year}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        var $ = load(response.data);
        var data = $(".listings-page").attr("data-site-activity");
        var r = JSON.parse(data);
        console.log("r", r);
        var resp = r.vehicleArray;
        const cars = [];
        const car = {};
        $(".vehicle-card").each((i, el) => {
          console.log($(el).find("strong").text());
          cars.push({
            img: $(el).find(".vehicle-image").attr("data-src") || $(el).find(".vehicle-image").attr("src"),
            dealerName: $(el).find("strong").text()
          });
        });
        cars.forEach((j, ind) => {
          resp[ind].image = j.img;
          resp[ind].dealerName = j.dealerName;
        });
        const data1 = [];
        var length = resp.length;
        $(".listings-page").each((i, el) => {
          for (let index = 1; index <= length; index++) {
            data1.push({ engine: $(el).find("script")?.get(index) });
          }
        });
        data1.forEach((i, index) => {
          var dd = i?.engine?.firstChild?.data;
          resp[index].engine = dd?.vehicleEngine?.name;
        });
        setData(resp)
      })
      .catch((error) => {
      });
  }

  const miles = [
    { value: "Select", name: "Select" },
    { value: 50, name: "<50" },
    { value: 100, name: "<100" },
    { value: 200, name: "<200" },
    { value: 300, name: "<300" },
    { value: 400, name: "<400" },
    { value: 500, name: "<500" },
    { value: 600, name: "<600" },
  ];

  return (
    <Box sx={{ p: 1 }}>
      <Grid container sx={{ borderBottom: "2px solid #ECECEC" }}>
        <Grid xs={6}>
          <Typography sx={{ p: 2 }}>Local Market</Typography>
        </Grid>
        <Grid
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pb: 2,
          }}>
          <form
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
              }}>
              <FormLabel>Maximum Miles</FormLabel>
              <Select name="mile" value={distance} onChange={handleSelect} SelectDisplayProps={{ style: { padding: 5 } }}>
                {miles.map((val) => (
                  <MenuItem value={val.value}>{val.name}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "40%",
              }}>
              <FormLabel>Zip</FormLabel>
              <TextField
                onChange={handleChange}
                style={{ padding: "0px" }}
                InputProps={{ disableUnderline: true }}
                inputProps={{
                  style: {
                    padding: 5,
                  },
                }}
              />
            </Box>
          </form>
          <IconButton>
            <OpenInNewRoundedIcon sx={{ fontSize: "20px", color: "#000000" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        sx={{
          height: "500px",
          overflow: "scroll",
        }}>
        {data.map((item) => (
          <Item sx={{ bgcolor: "green", mt: 2, width: "99%" }}>
            <Grid container xs={11.9} xl={11.9} sx={{ bgcolor: "white", ml: 1, p: 2 }}>
              <Grid xs={6} container>
                <Grid xs={2}>
                  <img
                    style={{
                      width: "80%",
                      height: "80%",
                      padding: 2,
                    }}
                    src={item.image}
                  />
                </Grid>
                <Grid xs={9} sx={{ fontSize: "14px" }}>
                  <Typography sx={{ fontWeight: 800, color: "#000000", fontSize: "16px" }}>{item.canonical_mmt}</Typography>
                  <Typography>{item.engine}</Typography>
                  <Typography sx={{ fontWeight: 800, color: "#000000", fontSize: "14px" }}>{item.dealerName}</Typography>
                  <Grid container>
                    <Typography sx={{ borderRight: "1px solid black", pr: 1 }}>{item.vin}</Typography>
                    <Typography sx={{ pl: 1, fontWeight: "700", color: "#000000" }}>{item.mileage}MI</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={5.5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "800", color: "#000000" }}>${ Number(item.price).toLocaleString()}</Typography>
              </Grid>
            </Grid>
            <Grid container xs={11.9} sx={{ bgcolor: "#ECECEC", ml: 1 }}>
              <Grid
                xs={6}
                sx={{
                  p: 1,
                }}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    backgroundColor: "#000000",
                    padding: "5px 30px 5px 30px",
                    fontSize: "14px",
                    borderRadius: "5px",
                  }}>
                  {item.stock_type}
                </Link>
              </Grid>
              <Grid xs={5.5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                {/* <Typography sx={{ fontSize: "14px" }}>DOM:</Typography> */}
                <Typography sx={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>{item.dom}</Typography>
              </Grid>
              <Grid>
                <Typography sx={{ fontSize: "14px", pl: 1 }}>{item.type}</Typography>
              </Grid>
            </Grid>
          </Item>
        ))}
      </Grid>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    localMarket: (data) => dispatch(localMarket(data)),
  };
};

export default connect(null, mapDispatchToProps)(LocalMarket);
