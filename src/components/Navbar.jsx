import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  useTheme,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Box,
  useMediaQuery,
  Typography,
  Avatar,
} from "@mui/material";

import Logo from "../assets/images/Logo.png";
import MobileNav from "./MobileNav";
import { listItemNav } from "../data/data";
import { useAuth } from "../firebaseConfig";

const Navbar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);
  const currentUser = useAuth()

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(126,126,128,1) 0%, rgba(249,101,101,1) 35%, rgba(231,235,134,1) 100%)",
      }}
    >
      <Toolbar sx={{ margin: "20px 0" }}>
        {isMatch ? (
          <>
            <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ width: "60px", height: "60px" }}
                />
              </Link>
            <MobileNav />
          </>
        ) : (
          <Grid container sx={{ placeItems: "center" }}>
            <Grid item xs={1} />
            <Grid item xs={2}>
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ width: "60px", height: "60px" }}
                />
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Typography
                // value={value}
                // textColor="secondary"
                // indicatorColor="secondary"
                // onChange={(e, value) => setValue(value)}
              >
                {listItemNav.map((item) => (
                  // <Tab key={item.id} label={item.title} className="active" component={NavLink} to={item.path} />
                  <Button sx={{mr:"30px"}} key={item.id}>
                    <NavLink to={item.path} style={{textDecoration:"none", color:"white"}}>{item.title}</NavLink>
                  </Button>
                ))}
              </Typography>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={2}>
              {currentUser ? <Link to="/profile" style={{textDecoration:"none"}}><Avatar sx={{width:"40px", height:"40px"}} src={currentUser.photoURL} /></Link> :
              <Box>
              <Link to="/sign-in" style={{textDecoration:"none"}}>
                <Button sx={{ marginLeft: "auto" }} variant="outlined">
                  Login
                </Button>
              </Link>
              <Link to="/sign-up" style={{textDecoration:"none"}}>
                <Button sx={{ marginLeft: 1 }} variant="outlined">
                  Sign Up
                </Button>
              </Link>
            </Box>}
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
