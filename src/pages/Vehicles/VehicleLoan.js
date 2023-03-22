import { Grid, Typography, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PersonIcon from "@mui/icons-material/Person";
import React from 'react'
import PropTypes from 'prop-types';
import {
    Stepper,
    Step,
    StepLabel,
    Stack
} from '@mui/material';
import {
    Check,
    Settings,
    GroupAdd,
    VideoLabel
} from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Link } from 'react-router-dom';
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
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color:'#dddddd',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #dddddd',
    ...(ownerState.active && {
        border:
            '3px solid #dddddd',
            color:'#dddddd',
    }),
    ...(ownerState.completed && {
        border:'3px solid #f15f23',
        color:"#f15f23"
    }
      ),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <DirectionsCarFilledIcon/>,
        2: <TextSnippetIcon />,
        3: <PersonIcon />,
        4: <PersonIcon/>
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

const steps = ['Vehicle Information', 'Documents', 'Supervisior','Payoff'];


const VehicleLoan = () => {
    return (
        <>
            <Grid sx={{ p: 3, borderTop: "1px solid #ECECEC", borderBottom: "1px solid #ECECEC" }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pl: 2, pr: 2 }}>
                    <Grid xs={2}>
                        <Item>
                            <Typography>Purchase price</Typography>
                            <Typography>$25,000</Typography>
                        </Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item>
                            <Typography>Purchase price</Typography>
                            <Typography>$25,000</Typography>
                        </Item>
                    </Grid>
                    <Grid xs={2}>
                        <Item>
                            <Typography>Purchase price</Typography>
                            <Typography>$25,000</Typography>
                        </Item>
                    </Grid>
                    <Grid xs={6} sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'flex-end'
                    }}>
                        <Link style={{
                            display: 'flex',
                            fontWeight: 500,
                            backgroundColor: "#28A745",
                            textDecoration: "none",
                            justifyContent: 'space-around',
                            width: "50%",
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
                            width: "25%",
                            float: 'right',
                            marginTop: 10
                        }}>
                            <Typography sx={{ color: 'white', fontSize: "14px", p: 1 }}>Add Note</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Item>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pl: 3 }}>
                    <Grid xs={6}>
                        <Typography sx={{
                            mt: 2,
                            fontSize: "20px",
                            fontWeight: 500,
                            color: 'black'
                        }}>Loan Payoff Status</Typography>
                    </Grid>
                    <Grid xs={6} sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Item sx={{
                            fontWeight: 700,
                            bgcolor: "#4969B2",
                            width: '100px',
                            mt: 2,
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
                    <Grid xs={12}>
                        <Stack sx={{ width: '100%' }} spacing={4}>
                           
                            <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Stack>
                    </Grid>
                </Grid>
            </Item>
        </>
    )
}

export default VehicleLoan