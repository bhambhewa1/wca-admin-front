import { Grid, Typography ,Paper} from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  }));
const VehicleLoan = () => {
    return (
        <Grid sx={{}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{pl:2,pr:2}}>
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
                <Grid xs={5}>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default VehicleLoan