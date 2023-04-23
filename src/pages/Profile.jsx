import React, { useEffect, useRef, useState } from "react";
import { TextField, Grid, Box, Typography, Container, Avatar, CssBaseline, Button} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { updateProfile } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth, logout, upload, useAuth } from "../firebaseConfig";

const theme = createTheme();
const img =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";

const Profile = () => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const nameRef = useRef();

  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
  );

  const handleChangeAvt = () => {
    if (photo) {
      upload(photo, currentUser, setLoading);
      toast.success("Update successful, please reload the page");
    } else {
      toast.warning("Please choose a photo");
    }
  };
  const handleChoice = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeName = (e) => {
    setInputName(e.target.value);
  };
  const db = getFirestore();

  const handleUpdateName = async () => {
    if(inputName) {
      await updateProfile(currentUser, {
        displayName: inputName,
      });
      toast.success('Update successful, please reload the page');
    } else {
      toast.warning('Please enter your name');
    }
  };
  const user = auth.currentUser;
  if (user !== null) {
    user.providerData.forEach((profile) => {
      if (profile.displayName) {
        try {
          nameRef.current.textContent = "Your Name: " + profile.displayName;
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: "150px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mb: "40px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                width: "152px",
                height: "152px",
                mb: "16px",
              }}
              //   src={preview}
              alt="avatar_Profile"
              src={photoURL}
            />
            <TextField
              type={"file"}
              inputProps={{ accept: "image/*" }}
              onChange={handleChoice}
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              sx={
                loading || !photo
                  ? { mt: 3, mb: 2, width: "70%", opacity: "0.6" }
                  : { mt: 3, mb: 2, width: "70%" }
              }
              onClick={handleChangeAvt}
            >
              Change Your Avatar
            </Button>
          </Box>

          <Grid container sx={{ mb: "30px" }} spacing="40px">
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Your email
              </Typography>
              <Typography variant="h7">{currentUser?.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Password
              </Typography>
              <Typography variant="h6">********</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: "30px" }}>
            <Grid item xs>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Full name
              </Typography>
              <Typography variant="h7" ref={nameRef}>
                You have not entered your name
              </Typography>
              <TextField
                id="standard-basic"
                label="Change your full name"
                value={inputName}
                variant="standard"
                sx={{ width: "100%" }}
                onChange={handleChangeName}
              />
              <Button
                type="submit"
                variant="contained"
                sx={inputName ? { mt: 3, mb: 2, width: "50%" } : { mt: 3, mb: 2, width: "50%", opacity: "0.6" }}
                onClick={handleUpdateName}
              >
                Change Your Name
              </Button>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "30%" }}
                  onClick={handleLogout}
                  color="error"
                >
                  Log out
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
