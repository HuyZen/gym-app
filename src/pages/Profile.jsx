import React, { useEffect, useRef, useState } from "react";
import {Avatar as AvatarMUI, Dialog, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link as LinkMaterial, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { updateProfile } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth, logout, upload, useAuth } from "../firebaseConfig";
import Avatar from "react-avatar-edit";

const theme = createTheme();
const img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'

const Profile = () => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const nameRef = useRef();
  
  // const [imageCrop, setImageCrop] = useState(false);
  // const [preview, setPreview] = useState(false);
  // const [profile , setProfile] = useState([])
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png");
  
  //Handle change avatar

  // const profileFinal = profile.map((item) => item.preview)
  // console.log(profileFinal);
  // const jsonString = JSON.stringify(profileFinal);
  // const file = new File([jsonString], 'filename.json', { type: 'application/json' });
  // console.log(file);
  // const onClose = () => setPreview(null);
  // const onCrop = (preview) => setPreview(preview);
  // const saveCropImage = async () => {
  //   setProfile([...profile, { preview: preview }]);
  //   setImageCrop(false)
  // }

  const handleChangeAvt = () => {
    if (photo) {
      upload(photo, currentUser, setLoading);
      toast.success('Update successful, please reload the page');
    }else {
      toast.warning('Please choose a photo');
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
    await updateProfile(currentUser, {
      displayName: inputName,
    });
    window.location.reload();
    toast.success("Cập nhật thành công, hãy load lại trang");
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
      <Container component="main" maxWidth="xs" sx={{ mt: "120px" }}>
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
            <AvatarMUI
              sx={{
                bgcolor: "secondary.main",
                width: "128px",
                height: "128px",
                mb:"16px"
              }}
            //   src={preview}
              alt="avatar_Profile"
              src={photoURL}
            />

                {/* <Dialog open={imageCrop} onClose={() => setImageCrop(false)} >
                    <DialogTitle>Change Your Avatar</DialogTitle>
                    <Avatar
                        width={500}
                        height={400}
                        onCrop={onCrop}
                        onClose={onClose}
                    />
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5, mb: 2, width: "50%", mx: "auto"}}
                    onClick={saveCropImage}
                    >
                    Save
                    </Button>
                </Dialog> */}
            <TextField accept='image/*' type='file' onChange={handleChoice}></TextField>
            <Button
                    type="submit"
                    variant="contained"
                    sx={loading || !photo ? { mt: 3, mb: 2, width: "70%", opacity:"0.6"} : { mt: 3, mb: 2, width: "70%"}}
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
                sx={{ mt: 3, mb: 2, width: "50%" }}
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