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
// import { Dialog } from 'primereact/dialog';
import { Button as ButtonCustom } from 'primereact/button';

const theme = createTheme();
const img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'

const Profile = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
//   const [photo, setPhoto] = useState(null);
  const [inputName, setInputName] = useState("");
  const nameRef = useRef();
  const [photoURL, setPhotoURL] = useState(null)

const [image, setImage] = useState("");
  const [imageCrop, setImageCrop] = useState(false);
  const [preview, setPreview] = useState(false);
  const [profile , setProfile] = useState([])
  const [srcImg, setSrcImg] = useState(false)

  const profileFinal = profile.map((item) => item.preview)

  const onClose = () => setPreview(null);
  const onCrop = (preview) => setPreview(preview);
  const saveCropImage = () => {
    setProfile([...profile, { preview: preview }]);
    setImageCrop(false);
  }

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeAvt = async() => {
      setShow(true)
      try {
          upload(photoURL, currentUser)
      } catch (error) {
          console.log(error);
      }
  }
  const handleChoice = (e) => {
    //   if (e.target.files[0]) {
    //       setPhoto(e.target.files[0])
    //   }
    //   console.log("done");
    const file = e.target.files[0];
    if(file && file.type.substr(0, 5) === "image") {
        setImage(file)
        toast.success('Cập nhật thành công, hãy load lại trang')
    }else {
        alert("Please choose an image file")
        setImage(null)
    }
  }
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
  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

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
              }}
            //   src={preview}
              src={profileFinal.length ? profileFinal : img}
              onClick={() => setImageCrop(true)}
            />
                <Dialog open={imageCrop} onClose={() => setImageCrop(false)} >
                    <DialogTitle>Change Your Avatar</DialogTitle>
                    <Avatar
                        width={400}
                        height={300}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={srcImg}
                    />
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5, mb: 2, width: "50%", mx: "auto"}}
                    onClick={saveCropImage}
                    >
                    Save
                    </Button>
                </Dialog>
            <TextField accept='image/*' sx={{display:"none"}} type='file' onChange={handleChoice}></TextField>
            <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 5, mb: 2, width: "100%"}}
                    onClick={() => setImageCrop(true)}

                    >
                    Change Your Avatar
            </Button>
          </Box>

          <Grid container sx={{ mb: "30px" }} spacing="100px">
            <Grid item xs>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Your email
              </Typography>
              <Typography variant="h7">{currentUser?.email}</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
