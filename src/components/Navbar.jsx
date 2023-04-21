import React, { useEffect, useRef, useState } from "react";
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
  ButtonGroup,
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
  const currentUser = useAuth();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const prevScrollPosRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPosRef.current;

      setIsNavbarVisible(!isScrollingDown);
      prevScrollPosRef.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Change language
  const changeLanguage = () => {
    setLanguage(!language);
  };
  const[language, setLanguage] = useState(false);

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(126,126,128,1) 0%, rgba(249,101,101,1) 35%, rgba(231,235,134,1) 100%)",
        visibility: isNavbarVisible ? "visible" : "hidden",
        transition: "visibility 0.3s",
        transform: isNavbarVisible ? "translateY(0)" : "translateY(-100%)",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <Toolbar sx={{ margin: "20px 0" }}>
        {isMatch ? (
          <>
            <Link to="/">
              <img
                src={"https://www.worldgym.com/images/logos/logo-light.png"}
                alt="logo"
                style={{ width: "198x", height: "54px" }}
              />
            </Link>
            <MobileNav />
          </>
        ) : (
          <Grid container sx={{ placeItems: "center" }}>
            {/* <Grid item xs={1} /> */}
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Link to="/">
                <img
                  src={"https://www.worldgym.com/images/logos/logo-light.png"}
                  alt="logo"
                  style={{ width: "283px", height: "54px" }}
                />
              </Link>
            </Grid>
            <Grid item xs={6} sx={{display:"flex", justifyContent:"flex-end"}}>
              <Typography
              // value={value}
              // textColor="secondary"
              // indicatorColor="secondary"
              // onChange={(e, value) => setValue(value)}
              >
                {listItemNav.map((item) => (
                  // <Tab key={item.id} label={item.title} className="active" component={NavLink} to={item.path} />
                  <Button sx={{ mr: "30px" }} key={item.id}>
                    <NavLink
                      to={item.path}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {item.title}
                    </NavLink>
                  </Button>
                ))}
              </Typography>
            </Grid>
            {/* <Grid item xs={1} /> */}
            <Grid item xs={3} sx={{display:"flex", justifyContent:"center"}}>
              {currentUser ? (
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    // display: "flex",
                    // justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: "44px", height: "44px" }}
                    src={currentUser.photoURL}
                  />
                </Link>
              ) : (
                <Box>
                  <Link to="/sign-in" style={{ textDecoration: "none" }}>
                    <Button sx={{ marginLeft: "auto" }} variant="outlined">
                      Login
                    </Button>
                  </Link>
                  <Link to="/sign-up" style={{ textDecoration: "none" }}>
                    <Button sx={{ marginLeft: 1 }} variant="outlined">
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              )}
              <ButtonGroup variant="outlined" color="primary" sx={{marginLeft:"24px"}}>
                <Button variant={!language? "contained" : "outlined"} onClick={() => changeLanguage("en")}>EN</Button>
                <Button variant={language ? "contained" : "outlined"} onClick={() => changeLanguage("vi")}>VI</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
