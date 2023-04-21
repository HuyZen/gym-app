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
import { Link, NavLink } from "react-router-dom";
import { listItemNav } from "../data/data";
import { useAuth } from "../firebaseConfig";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useAuth();
  return (
    <>
      <Drawer
        PaperProps={{ sx: { padding: "36px 52px" } }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {listItemNav.map((item) => (
            <ListItemButton key={item.id} sx={{paddingBottom:"20px"}}>
              <ListItemIcon>
                <ListItemText>
                  <NavLink
                    style={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                      color: "black",
                      paddingBottom:"4px"
                    }}
                    to={item.path}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </NavLink>
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <Box sx={{ marginTop: "40px" }}>
            {!currentUser ? (
              <>
                <Button sx={{ marginLeft: "auto" }} variant="outlined">
                  Login
                </Button>
                <Button sx={{ marginLeft: 1 }} variant="outlined">
                  Sign Up
                </Button>
              </>
            ) : (
              <Link to="/profile" style={{ textDecoration: "none", marginLeft: "12px" }}>
                <Button variant="contained">
                  Profile
                </Button>
              </Link>
            )}
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
