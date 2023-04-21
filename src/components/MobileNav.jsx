import {
    Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { listItemNav } from "../data/data";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer
        PaperProps={{ sx: { padding: "36px" } }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {listItemNav.map((item) => (
            <ListItemButton key={item.id}>
              <ListItemIcon>
                <ListItemText>
                  <NavLink
                    style={{ textDecoration: "none", textTransform:"uppercase", color: "black" }}
                    to={item.path}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </NavLink>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <Box sx={{marginTop:"40px"}}>
                <Button sx={{ marginLeft: "auto" }} variant="outlined">
                  Login
                </Button>
                <Button sx={{ marginLeft: 1 }} variant="outlined">
                  Sign Up
                </Button>
              </Box>
        </List>
      </Drawer>

      <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default MobileNav;
