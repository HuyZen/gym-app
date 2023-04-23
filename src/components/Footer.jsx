import { Box, Grid, List, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/images/Logo-1.png'

const Footer = () => {
  return (
    <Box mt="100px" sx={{backgroundImage:"linear-gradient(90deg, rgba(8,7,8,1) 7%, rgba(189,25,25,1) 52%, rgba(26,26,26,1) 93%)", color:"white"}}>
      <Stack gap="40px" alignItems="center" px="40px" py="24px">
        <img src="https://www.worldgym.com/images/logos/logo-light.png" alt="logo" width="283px" height="54px"/>
        <Grid container mt="20px">
          <Grid item xs={4}>
            <Typography variant="h7" sx={{paddingLeft:"8px", color:"#B2B4B5"}}>© 2023 All Rights Reserved.</Typography> <br/>
              <ul sx={{display:"flex", fontSize:"14px"}}>
                <li style={{display:"inline-block", paddingLeft:"8px"}}>
                  <a className='footer-link' href='/site-map'>Site Map</a> |</li>
                <li style={{display:"inline-block", paddingLeft:"8px"}}>
                  <a className='footer-link' href='/accessibility'>Accessibility</a> |</li>
                <li style={{display:"inline-block", paddingLeft:"8px"}}>
                  <a className='footer-link' href="/privacy-policy">Privacy Policy</a> |</li>
                <li style={{display:"inline-block", paddingLeft:"8px"}}>
                  <a className='footer-link' href="/site-search">Site Search</a>
                </li>
              </ul>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} sx={{textAlign:"right"}}>
            <Typography variant="h7" sx={{paddingRight:"8px", color:"#B2B4B5"}}>Every World Gym is independently owned and operated.</Typography> <br/>
            <Typography variant="h7" sx={{paddingRight:"8px", color:"#B2B4B5"}}>World Gym is a registered trademark of World Gym International, Inc.</Typography>
          </Grid>
        </Grid>
      </Stack>
      
    </Box>
  )
}

export default Footer