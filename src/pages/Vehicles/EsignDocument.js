import { Box, Grid, Typography, Paper, Button, AppBar, Toolbar, Drawer, Divider, ListItem, ListItemButton, ListItemIcon, List, ListItemText, CssBaseline } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { EsignDocumentData } from "../../config/mockData";
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
    boxShadow: 'none'
}));
const EsignDocument = () => {
    const location = useLocation();
    let URL = location.pathname;
    const [data, setData] = React.useState(EsignDocumentData);
    //   React.useEffect(() => {
    //     const trimmedURL = URL.slice(0, 6);
    //     data.map((item, index) => {
    //       let trimmedRoute = item?.Routes?.slice(0, 6);
    //       trimmedURL === trimmedRoute ? (item.isActive = true) : (item.isActive = false);
    //     });
    //     setData([...data]);
    //   }, [location.pathname]);
    return (
        <Box sx={{ m: { xs: 1, sm: 0 }, borderTop: "1px solid rgba(0, 0, 0, 0.06)" }}>
            <Grid sx={{
                display: 'flex',
                borderBottom: '1px solid gray'
            }}
                xs={12} container
            >
                <Grid xs={6}>
                    <Typography sx={style.headingText}>Documents</Typography>
                </Grid>

                <Grid item xs={6} sx={{
                    display: 'flex',
                    justifyContent: "flex-end",
                    p: 2
                }}>
                    <Item sx={{
                        fontWeight: 700,
                        bgcolor: "#4969B2",
                        width: '100px',
                    }}><Link style={{
                        display: 'flex',
                        textDecoration: "none",
                        justifyContent: 'space-around'
                    }}>
                            <EditIcon sx={{ color: "white", fontSize: "20px" }} />
                            <Typography sx={{ color: 'white', fontSize: "16px" }}>Edit</Typography>
                        </Link></Item>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pl: 2, pr: 2, pt: 2 }}>
                <Grid sx={{ display: 'flex', border: '1px solid "#dddddd' }} xs={4}>
                    <List sx={{
                        ml: 3,
                        border: '1px solid gray',
                        width: '240px',
                        mt: 2
                    }}>
                        {data.map((text, index) => (
                            <>
                                <ListItem
                                    sx={{
                                        bgcolor: text.isActive ? "#F15F23" : "",
                                        borderRadius: text.isActive ? "5px" : "",
                                        //   borderTop: "0.1px solid #B2C1F0",
                                        // mt: "10px",
                                    }}
                                    key={index}
                                    disablePadding
                                // onClick={}
                                >
                                    <Link
                                        className="drawerItemLinks"
                                        style={{ color: text.isActive ? "#fff" : "#B2C1F0" }}
                                        to={text.Routes}>
                                        <ListItemIcon
                                            sx={{
                                                color: text.isActive ? "#fff" : "#B2C1F0",
                                                // width: "30px",
                                                minWidth: "35px",
                                                // mr: "30px",
                                            }}>
                                            {text.src}
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={{
                                                color: "#000000",
                                                fontWeight: "400",
                                                fontSize: "14px",
                                                display: { xs: "none", sm: "flex" },
                                            }}
                                            primary={text.val}
                                        />
                                    </Link>
                                </ListItem>
                            </>
                        ))}
                    </List>
                </Grid>
                <Grid xs={8}>
                    <Item sx={{ m: { xs: 1, sm: 2 } }} >
                        <Typography>Title Back</Typography>
                        <Typography>it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Typography>
                        <Typography>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EsignDocument;
const style = {
    headingText: {
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "38px",
        color: "#000000",
        pl: 3,
        pt: 2
    },
};