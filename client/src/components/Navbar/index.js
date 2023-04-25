import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

//Import Login modal
import LoginModal from "../LoginModal/index";

//Import Signup modal
import SignupModal from "../SignupModal/index";

export default function ButtonAppBar() {
  //Login Modal
  //Modal - useState
  const [modalShow, setModalShow] = useState(false);

  //Open Modal
  const handleOpenModal = () => {
    setModalShow(true);
  };
  //Close Modal
  const handleCloseModal = () => {
    setModalShow(false);
  };

  //Signup Modal
  //Modal - useState
  const [modalSignupShow, setSignupModalShow] = useState(false);

  //Open Modal
  const handleOpenSignupModal = () => {
    setSignupModalShow(true);
  };

  //Close Modal
  const handleCloseSignupModal = () => {
    setSignupModalShow(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Story Maker AI
          </Typography>
          {Auth.loggedIn() ? (
            <div>
              <Link to="/MealPlan">
                <IconButton
                  size="large"
                  aria-label="heart"
                  sx={{ ml: 2, color:"white" }}
                >
                  <Badge badgeContent={0} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                size="large"
                aria-label="logout"
                color="inherit"
                onClick={() => {
                  Auth.logout();
                }}
              >
                <Badge badgeContent={0} color="error">
                  <ExitToAppIcon />
                </Badge>
              </IconButton>
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={handleOpenModal}>
                Login
              </Button>
              <Button color="inherit" onClick={handleOpenSignupModal}>
                Signup
              </Button>
            </div>
          )}  
        </Toolbar>
      </AppBar>
      <LoginModal 
        open={modalShow} 
        handleClose={handleCloseModal} />
      <SignupModal
        open={modalSignupShow}
        handleClose={handleCloseSignupModal}
      />
    </Box>
  );
}
