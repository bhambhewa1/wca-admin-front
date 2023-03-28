import { Box, Grid, Typography, Paper, Button, AppBar, Toolbar, Drawer, Divider, ListItem, ListItemButton, ListItemIcon, List, ListItemText, CssBaseline, Menu, MenuItem, useMediaQuery, Dialog, DialogTitle, DialogContent, FormLabel, TextField, DialogActions } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation, useNavigate } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { EsignDocumentData } from "../../config/mockData";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CheckBox } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
    boxShadow: 'none'
}));
const EsignDocument = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    // let URL = location.pathname;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuButton, setMenuButton] = React.useState(EsignDocumentData[0].val);
    const [data, setData] = React.useState(EsignDocumentData);
    const [open, setOpen] = React.useState(false);
    const [sign, setSign] = React.useState({
        id: "",
        path: "",
        src: "",
    });
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSign = (e) => {
        console.log(e.target);
        setSign({
            id: sign.id,
            path: e.target.files[0],
            src: URL.createObjectURL(e.target.files[0]),
        });
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const Submit = () => {
        navigate("/vehicles/details/esigndocument");
    };
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
                <Dialog open={open}>
                    <form handleSubmit={Submit}>
                        <DialogTitle sx={{ borderBottom: "1px solid #dddddd" }}>Send Documents</DialogTitle>
                        <DialogContent sx={{ borderBottom: "1px solid #dddddd" }}>
                            <Box sx={{
                                display:'flex',
                                pt:2
                            }}>
                            <FormLabel>Document send Email:</FormLabel>
                            <Typography>Johndoe@Wca.com</Typography>
                            </Box>
                            <Box sx={{
                                display:'flex',
                            }}>
                            <FormLabel>Contact number for Otp:</FormLabel>
                            <Typography>+1 256 2354</Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Box
                                sx={{
                                    width: { xs: "100%", md: "35%", lg: "70%" },
                                    float: "right",
                                    display: "flex",
                                    justifyContent: { xs: "space-between", md: "flex-end" },
                                    pb: 3,
                                    pr: 3,
                                    pl: { xs: 2, md: 0 },
                                }}>
                                <Button
                                    disableRipple
                                    sx={{
                                        mr: { md: 3 },
                                        pl: "25px",
                                        pr: "25px",
                                        pt: "10px",
                                        pb: "10px",
                                        fontSize: "16px",
                                        lineHeight: "21px",
                                        // fontWeight: 400,
                                        borderRadius: "5px",
                                        textTransform: "none",
                                        border: "1px solid #EB5757",
                                        bgcolor: "#EB5757",
                                        width: { xs: "40%", md: "50%" },
                                        color: "white",
                                        "&.MuiButtonBase-root:hover": {
                                            border: "1px solid #EB5757",
                                            bgcolor: "#EB5757",
                                            color: "white",
                                        },
                                    }}
                                    variant="outlined"
                                    className="btn"
                                    onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    disableRipple
                                    sx={{
                                        pl: "25px",
                                        pr: "25px",
                                        pt: "10px",
                                        pb: "10px",
                                        fontSize: "16px",
                                        lineHeight: "21px",
                                        // fontWeight: 400,
                                        borderRadius: "5px",
                                        textTransform: "none",
                                        color: "white",
                                        bgcolor: "#27AE60",
                                        border: "1px solid #27AE60",
                                        width: { xs: "40%", md: "50%" },
                                        "&.MuiButtonBase-root:hover": {
                                            border: "1px solid #27AE60",
                                            color: "white",
                                            bgcolor: "#27AE60",
                                        },
                                    }}
                                    variant="outlined"
                                    className="btn"
                                    // type="submit"
                                    onClick={Submit}>
                                    Confirm
                                </Button>
                            </Box>
                        </DialogActions>
                    </form>
                </Dialog>
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
                        width: '150px',
                    }}><Link style={{
                        display: 'flex',
                        textDecoration: "none",
                        justifyContent: 'space-around'
                    }}
                        onClick={handleOpen}>
                            <Typography sx={{ color: 'white', fontSize: "16px" }}>Send Documents</Typography>
                        </Link></Item>
                </Grid>
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pl: 2, pr: 2, pt: 2, borderBottom: '1px solid "#dddddd' }}>
                <Button
                    onClick={handleClick}
                    disableTouchRipple
                    disableRipple
                    sx={{
                        display: { xs: "flex", sm: "none" },
                        bgcolor: "#F15F23",
                        color: "white",
                        textTransform: "none",
                        fontSize: "14px",
                        "&.MuiButtonBase-root:hover": {
                            bgcolor: "#F15F23",
                        },
                        width: '130px',
                        height: '50px',
                        float: 'right'

                    }}>
                    {menuButton}
                    {/* <ArrowDropDownIcon sx={{ fontSize: "20px" }} /> */}
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                // TransitionComponent={Fade}
                >
                    {EsignDocumentData.map((item, index) => (
                        <MenuItem
                            onClick={() => {
                                // navigate(item.route);
                                handleClose();
                                setMenuButton(item.val);
                            }}>
                            {item.val}
                        </MenuItem>
                    ))}
                </Menu>
                {!isMobile && <Grid sx={{ display: 'flex', border: '1px solid "#dddddd' }} xs={4}>
                    <List sx={{
                        ml: 3,
                        border: '1px solid gray',
                        width: '240px',
                        mt: 2,
                        p: 0
                    }}>
                        {data.map((text, index) => (
                            <>
                                <ListItem
                                    sx={{
                                        bgcolor: text.isActive ? "#F15F23" : "",
                                        // borderRadius: text.isActive ? "5px" : "",
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
                </Grid>}
                <Grid xs={12} sm={8}>
                    <Item sx={{ m: { xs: 1, sm: 2 } }} >
                        <Typography sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 700, p: 2 }}>Title Back</Typography>
                        <Typography>it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Typography>
                        <Typography>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</Typography>
                        <Typography sx={{ mb: 2, mt: 2, color: '#F15F23' }}>
                            <input
                                type="checkbox"
                                color="#F15F23"
                            // onChange={formik.handleChange}
                            // checked={formik.values.validate_Password}
                            // value={formik.values.validate_Password}
                            />
                            I accept all the terms and condition
                        </Typography>
                        <Grid xs={12} sx={{ display: 'flex', flexDirection: 'Column', alignItems: 'flex-end' }}>
                            <Typography sx={{ pr: { xs: 17, sm: 8 } }}>Signature</Typography>
                            {sign.src &&
                                <Grid xs={12}>
                                    <img
                                        width={isMobile ? "210px" : "150px"}
                                        height="100px"
                                        src={sign.src}
                                    />
                                </Grid>
                            }
                            <input
                                style={{ padding: "17px 12px", display: "none" }}
                                type="file"
                                id="sign"
                                name="sign"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleSign}
                            />
                            <label htmlFor="sign">
                                <Button
                                    component="span"
                                    name="sign"
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
                                        fontSize: "16px",
                                    }}>
                                    <CloudUploadIcon sx={{ mr: 1 }} /> Upload
                                </Button>
                            </label>
                        </Grid>
                    </Item>
                </Grid>

            </Grid>
            <Grid xs={12}
                sx={{
                    // width: { xs: "100%", md: "35%", lg: "40%" },
                    display: "flex",
                    justifyContent: { xs: "space-between", sm: "flex-end" },
                    pt: 4,
                    pb: 3,
                    pr: 3,
                    pl: { xs: 2, md: 0 },
                }}>
                <Button
                    disableRipple
                    sx={{
                        mr: { md: 3 },
                        pl: "25px",
                        pr: "25px",
                        pt: "10px",
                        pb: "10px",
                        fontSize: "18px",
                        lineHeight: "21px",
                        fontWeight: 400,
                        borderRadius: "5px",
                        textTransform: "none",
                        border: "1px solid #F15F23",
                        bgcolor: "#F15F23",
                        // width: { xs: "40%", md: "50%" },
                        color: "white",
                        "&.MuiButtonBase-root:hover": {
                            border: "1px solid #F15F23",
                            bgcolor: "#F15F23",
                            color: "white",
                        },
                    }}
                    variant="outlined"
                    className="btn"
                // onClick={() => navigate('/customers')}
                >
                    Add Note
                </Button>
                <Button
                    disableRipple
                    sx={{
                        pl: "25px",
                        pr: "25px",
                        pt: "10px",
                        pb: "10px",
                        fontSize: "18px",
                        lineHeight: "21px",
                        fontWeight: 400,
                        borderRadius: "5px",
                        textTransform: "none",
                        color: "white",
                        bgcolor: "#27AE60",
                        border: "1px solid #27AE60",
                        // width: { xs: "40%", md: "50%" },
                        "&.MuiButtonBase-root:hover": {
                            border: "1px solid #27AE60",
                            color: "white",
                            bgcolor: "#27AE60",
                        },
                    }}
                    variant="outlined"
                    className="btn"
                    type="submit">
                    Save
                </Button>
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