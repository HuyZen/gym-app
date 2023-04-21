import React from "react";
import { Box, Typography, Button } from "@mui/material";

import HeroBannerImage from "../assets/images/banner.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box
      sx={{
        mt: { lg: "212px", xs: "150px" },
        mx: { lg: "150px", sm:"50px", xs: "0px" },
      }}
      position="relative"
      p="20px"
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="26px">
        Dream Muscles
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "40px" } }}
        mb="23px"
        mt="30px"
      >
        Build Your <br /> Perfect Body
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={4}>
        Check out the most effective exercises
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#ff2625", padding: "10px" }}
      >
        <Link role="link" to="/exercises" style={{textDecoration:"none", color:"black"}}>Explore Exercises</Link>
      </Button>
      <Typography
        fontWeight={600}
        color="#ff2625"
        sx={{ opacity: 0.1, display: { lg: "block", sm:"block" , xs: "none" }, fontSize:{lg:"224px", sm: "150px"} }}
      >
        Exercise
      </Typography>
      <img src={HeroBannerImage} alt="banner" className="hero-banner-img" />
    </Box>
  );
};

export default HomePage;
