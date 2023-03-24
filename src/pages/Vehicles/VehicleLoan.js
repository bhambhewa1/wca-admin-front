import { Grid, Typography, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import { useTheme } from "@emotion/react";
import {
    Stepper,
    Step,
    StepLabel,
    Stack,
    useMediaQuery
} from '@mui/material';
import {
    Check,
    Settings,
    GroupAdd,
    VideoLabel,
    CircleRounded
} from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
        paddingLeft: '5px',
        paddingRight: '5px'
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            //     border:
            //   '2px solid #4BB543',
            backgroundImage: 'linear-gradient(to right,#4BB543, #dddddd)',

        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            // backgroundImage: 'linear-gradient(#4BB543, #dddddd)',
            border:
                '2px solid #4BB543',
            paddingLeft: '5px',
            paddingRight: '5px'
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
        paddingLeft: '5px',
        paddingRight: '5px'
    },
}));
const Style = {
    grid: {
        mr: 2,
        mt: { xs: 2, sm: 0 },
        borderRadius: '5px',
    },
    item: {
        height: "100px",
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    }
}

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#dddddd',
    width: 60,
    height: 60,

    display: 'flex',
    borderRadius: '50%',
    fontSize: "30px",
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #dddddd',
    ...(ownerState.active && {
        border:
            '3px solid #F15F23 ',
        color: '#F15F23 ',
    }),
    ...(ownerState.completed && {
        border: '3px solid #4BB543',
        color: "#4BB543"
    }
    ),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <DirectionsCarFilledIcon />,
        2: <TextSnippetIcon />,
        3: <PersonIcon />,
        4: <PersonIcon />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Vehicle Information', 'Documents', 'Supervisior', 'Payoff'];
const status = [
    {
        heading: 'Vehicle Status',
        d1: {
            name: "Vehicle Inspection under review",
            date: "18/03/2023",
            Status: "Complete"
        },
        d2: {
            name: "Vehicle Inspection Confirmed",
            date: "18/03/2023",
            Status: "Complete"
        },
        d3: {
            name: "Verification under process",
            date: "18/03/2023",
            Status: "Complete"
        },
        d4: {
            name: "The Verification Completed",
            date: "18/03/2023",
            Status: "Pending"
        }
    },
    {
        heading: 'Documents Status',
        d1: {
            name: "Preparing Loan Payoff closing documents",
            date: "18/03/2023",
            Status: "Complete"
        },
        d2: {
            name: "Loan Payoff documents is being prepared",
            date: "18/03/2023",
            Status: "Complete"
        },
        d3: {
            name: "Loan Payoff Documents prepared",
            date: "18/03/2023",
            Status: "Pending"
        }
    },
    {
        heading: 'Supervisior Status',
        d1: {
            name: "Waiting for level #1 supervisor approval",
            date: "18/03/2023",
            Status: "Complete"
        },
        d2: {
            name: "Level 1 Supervisor Approved",
            date: "18/03/2023",
            Status: "Complete"
        },
        d3: {
            name: "Waiting for level #2 supervisor approval",
            date: "18/03/2023",
            Status: "Complete"
        },
        d4: {
            name: "Level 2 Supervisor Approved",
            date: "18/03/2023",
            Status: "Complete"
        },
        d5: {
            name: "Waiting for level #3 supervisor approval",
            date: "18/03/2023",
            Status: "Complete"
        },
        d6: {
            name: "Level 3 Supervisor Approved",
            date: "18/03/2023",
            Status: "Pending"
        }
    },
    {
        heading: 'Payoff Status',
        d1: {
            name: "Loan Payoff check issued",
            date: "18/03/2023",
            Status: "Complete"
        },
        d2: {
            name: "Payoff in Transit",
            date: "18/03/2023",
            Status: "Complete"
        },
        d3: {
            name: "Payoff Complete",
            date: "18/03/2023",
            Status: "Complete"
        },
    }];
const gridData = [{
    name: "Purchase price",
    price: "$25,000"
},
{
    name: "Outstanding loan amount",
    price: "$30,000"
},
{
    name: "Negative equity",
    price: "$5,000"
},
]

const VehicleLoan = () => {
    const theme = useTheme();
    const [active, setActive] = React.useState(2)
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    let direction = ""
    isMobile ? (direction = "vertical") : (direction = 'horizontal');
    console.log(gridData);
    const handleStep = (step) => () => {
        setActive(step);
      };
    return (
        <>
            <Grid container xs={12} sx={{ p: 3, borderTop: "1px solid #ECECEC", borderBottom: "1px solid #ECECEC", display: 'flex' }}>
                <Grid sm={9} xs={12} sx={{
                    display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
                    "&.MuiGrid-root": {
                        pl: { xs: 2, sm: 0 },
                    }
                }} >
                    {gridData.map((data, index) => (
                        <Grid sm={2.5} xs={12} sx={Style.grid} >
                            <Item sx={Style.item} style={{
                            border: index === 2 ? '2px solid #F15F23' : ""
                        }} >
                                <Typography sx={{ fontSize: '12px' }}>{data.name}</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: '18px', color: 'black' }}>{data.price}</Typography>
                                {index == 2 &&
                                    <Box sx={{
                                        display: 'flex',
                                        color: '#4969B2'
                                    }}>
                                        <CheckIcon />
                                        <Typography sx={{fontSize:'12px'}}>Mark as Paid</Typography>
                                    </Box>
                                }
                            </Item>
                        </Grid>
                    ))}

                </Grid>
                <Grid sm={3} xs={12} sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'flex-end',
                    pt: { xs: 2, sm: 0 }
                }}>
                    <Link style={{
                        display: 'flex',
                        fontWeight: 500,
                        backgroundColor: "#28A745",
                        textDecoration: "none",
                        justifyContent: 'space-around',
                        width:isMobile? "100%":"80%",
                        borderRadius: "5px"
                    }}>
                        <Typography sx={{ color: 'white', fontSize: "14px", p: 1 }}>Loan payoff documents</Typography>
                    </Link>
                    <Link style={{
                        display: 'flex',
                        fontWeight: 500,
                        backgroundColor: "#F15F23",
                        textDecoration: "none",
                        justifyContent: 'space-around',
                        borderRadius: "5px",
                        width:isMobile? "100%":"50%",
                        float: 'right',
                        marginTop: 10
                    }}>
                        <Typography sx={{ color: 'white', fontSize: "14px", p: 1 }}>Add Note</Typography>
                    </Link>
                </Grid>
            </Grid>
            {/* </Grid> */}
            <Item sx={{
                '&.MuiPaper-root':{
                    p:0
                }
            }}>
                <Grid container sx={{ order: { xs: 1, sm: 2 }, pb: 3 }}>
                    <Grid xs={6} sx={{ pb: 2 }}>
                        <Typography sx={{
                            mt: 3,
                            fontSize: { xs: "16px", sm: "20px" },
                            fontWeight: 500,
                            color: 'black',
                            pl:{xs:0,sm:2}
                        }}>Loan Payoff Status</Typography>
                    </Grid>
                    <Grid xs={6} sx={{
                        display: "flex",
                        justifyContent: "flex-end",

                    }}>
                        <Item sx={{
                            fontWeight: 700,
                            bgcolor: "#4969B2",
                            width: '100px',
                            mt: { xs: 4.3, sm: 2 },
                            mb: 2,
                            mr:2,
                            height: { xs: '40%' ,sm:'55%'}
                        }}>
                            <Link style={{
                                display: 'flex',
                                textDecoration: "none",
                                justifyContent: 'space-around'
                            }}>
                                <EditIcon sx={{ color: "white", fontSize: "20px" }} />
                                <Typography sx={{ color: 'white', fontSize: "14px" }}>Configure</Typography>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid xs={12} sx={{ borderTop: '1px solid #dddddd ', pt: 2 ,
                
                }}>
                        <Stack sx={{ width: '100%',pt:5 }} spacing={4}>

                            <Stepper alternativeLabel activeStep={active} connector={<ColorlibConnector /> }>
                                {steps.map((label, index) => (
                                    <Step key={label}  onClick={handleStep(index)} sx={{cursor:'pointer'}} >
                                        <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
                                        {index === active && <Grid sx={{
                                            color: active === 4 ? '#4BB543' : '#f15f23',
                                            display: 'flex',
                                            pl: 6,
                                            pt: 1
                                        }}>
                                            <CircleRounded />
                                            <Typography sx={{ pl: 2 }}>{active === 4 ? "Completed" : "Under Progress"}</Typography>
                                        </Grid>}
                                    </Step>
                                ))}
                            </Stepper>
                            {status.map((data, index) => (
                                index === active && <>
                                    <Typography sx={{
                                        width: '100%',
                                        backgroundColor: '#f15f23',
                                        p: 2,
                                        color: 'white'
                                    }}>{data.heading}</Typography>
                                    <Grid sx={{
                                        pl: 2,
                                        "&.MuiGrid-root": {
                                            marginTop: 0
                                        }
                                    }}>
                                        {data.d6 && <Box sx={{ pt: 2 }}>
                                            <Typography>{data.d6?.name}</Typography>
                                            <Box sx={{
                                                display: 'flex', width:{lg:'15%',sm:'18%'}, justifyContent: 'space-between', fontSize: '12px',
                                                "&.MuiBox-root": {
                                                    marginTop: 0
                                                }
                                            }}>
                                                <Typography>{data.d6?.date}</Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography style={{ fontWeight: 700 }}>Status:</Typography>
                                                    <Typography style={{ color: data.d6.Status === 'Pending' ? "#f15f23" : '#4BB543' }}>{data.d6?.Status}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        }
                                        {data.d5 && <Box sx={{ pt: 2 }}>
                                            <Typography>{data.d5?.name}</Typography>
                                            <Box sx={{
                                                display: 'flex', width:{lg:'15%',sm:'18%'}, justifyContent: 'space-between', fontSize: '12px',
                                                "&.MuiBox-root": {
                                                    marginTop: 0
                                                }
                                            }}>
                                                <Typography>{data.d5?.date}</Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography style={{ fontWeight: 700 }}>Status:</Typography>
                                                    <Typography style={{ color: data.d5.Status === 'Pending' ? "#f15f23" : '#4BB543' }}>{data.d5?.Status}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        }
                                        {data.d4 && <Box sx={{ pt: 2 }}>
                                            <Typography>{data.d4?.name}</Typography>
                                            <Box sx={{
                                                display: 'flex', width:{lg:'15%',sm:'18%'}, justifyContent: 'space-between', fontSize: '12px',
                                                "&.MuiBox-root": {
                                                    marginTop: 0
                                                }
                                            }}>
                                                <Typography>{data.d4?.date}</Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography style={{ fontWeight: 800 }}>Status:</Typography>
                                                    <Typography style={{ color: data.d4.Status === 'Pending' ? "#f15f23" : '#4BB543' }}>{data.d4?.Status}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        }
                                        <Box sx={{ pt: 2 }}>
                                            <Typography>{data.d3?.name}</Typography>
                                            <Box sx={{
                                                display: 'flex',width:{lg:'15%',sm:'18%'}, justifyContent: 'space-between', fontSize: '12px',
                                                "&.MuiBox-root": {
                                                    marginTop: 0
                                                }
                                            }}>
                                                <Typography>{data.d3?.date}</Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography style={{ fontWeight: 800 }}>Status:</Typography>
                                                    <Typography style={{ color: data.d3.Status === 'Pending' ? "#f15f23" : '#4BB543' }}>{data.d3?.Status}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pt: 2 }}>
                                            <Typography>{data.d2?.name}</Typography>
                                            <Box sx={{
                                                display: 'flex',width:{lg:'15%',sm:'18%'}, justifyContent: 'space-between', fontSize: '12px',
                                                "&.MuiBox-root": {
                                                    marginTop: 0
                                                }
                                            }}>
                                                <Typography>{data.d2?.date}</Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography style={{ fontWeight: 900 }}>Status:</Typography>
                                                    <Typography style={{ color: data.d2.Status === 'Pending' ? "#f15f23" : '#4BB543' }}>{data.d2?.Status}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ pt: 2 }}>
                                            <Typography>{data.d1?.name}</Typography>
                                            <Box sx={{
                                                display: 'flex', width:{lg:'15%',sm:'18%'}, justifyContent: 'space-between', fontSize: '12px',
                                                "&.MuiBox-root": {
                                                    marginTop: 0
                                                }
                                            }}>
                                                <Typography>{data.d1?.date}</Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography style={{ fontWeight: 900 }}>Status:</Typography>
                                                    <Typography style={{ color: data.d1.Status === 'Pending' ? "#f15f23" : '#4BB543' }}>{data.d1?.Status}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </>
                            ))}
                        </Stack>

                    </Grid>
                </Grid>
            </Item>
        </>
    )
}

export default VehicleLoan
