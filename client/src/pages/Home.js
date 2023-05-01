import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Intro from "../components/Tabs/Intro";
import Step1 from "../components/Tabs/Step1";
import Step2 from "../components/Tabs/Step2";
import Step3 from "../components/Tabs/Step3";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import "../App.css";

//Import Login modal
import LoginModal from "../components/LoginModal/index";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 30,
            textTransform: "none",
          }}
          label="Intro"
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 30,
            textTransform: "none",
          }}
          label="Step 1"
          {...a11yProps(1)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 30,
            textTransform: "none",
          }}
          label="Step 2"
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 30,
            textTransform: "none",
          }}
          label="Step 3"
          {...a11yProps(3)}
        />
        {Auth.loggedIn() ? (
          <div>
            <Link to="/Profile">
              <IconButton
                size="large"
                aria-label="heart"
                sx={{ ml: 2, color: "grey" }}
              >
                <Badge badgeContent={0} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>
        ) : (
          <div>
            <Button sx={{ ml: 2, color: "grey" }} onClick={handleOpenModal}>
              <AccountCircleIcon />
            </Button>
          </div>
        )}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Intro />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Step1 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Step2 />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Step3 />
      </TabPanel>
      <LoginModal open={modalShow} handleClose={handleCloseModal} />
    </Box>
  );
}
