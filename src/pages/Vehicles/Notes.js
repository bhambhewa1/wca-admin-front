import styled from '@emotion/styled';
import { FormLabel, Grid, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    // color: theme.palette.text.secondary,
    boxShadow: 'none'
}));
const Notes = () => {
  return (
    <Item >
   <Grid sx={{p:2,borderTop:'1px solid #dddddd',pt:5,pb:15}}>
    <form>
        <Box sx={{display:'flex',flexDirection:'column'}}>
        <FormLabel sx={{color:'#000000'}}>
            Add Note
        </FormLabel>
        <TextField
        variant='filled'
        multiline
        InputProps={{disableUnderline:true}}
        placeholder='Enter a note here'
        rows={7}
        sx={{
            width:{xs:'100%',sm:'40%'},
            marginBottom:2,
            backgroundColor:'#F5F6FA'
        }}/>
        </Box>
        <Link style={{
            backgroundColor:'#28A745',
            textDecoration:'none',
            paddingTop:'10px',
            paddingBottom:'10px',
            paddingLeft:'40px',
            paddingRight:'40px',
            color:'white',
            borderRadius:'5px',
        }}>
        Save
        </Link>
    </form>
   </Grid>
   </Item >
  )
}

export default Notes