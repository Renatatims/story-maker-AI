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
import View from "../components/Tabs/View";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ImageIcon from "@mui/icons-material/Image";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import VisibilityIcon from '@mui/icons-material/Visibility';

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

function NumberIcon(props) {
  const { number, icon } = props;
  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
          position: "absolute",
          top: "-10px",
          right: "-20px",
        }}
      >
        {number}
      </div>
      {icon}
    </div>
  );
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
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 30,
            textTransform: "none",
          }}
          icon={<HomeIcon />}
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 25,
            textTransform: "none",
          }}
          label={<NumberIcon number="1" icon={<MenuBookIcon />} />}
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 25,
            textTransform: "none",
          }}
          label={<NumberIcon number="2" icon={<ImageIcon />} />}
          {...a11yProps(2)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 25,
            textTransform: "none",
          }}
          label={<NumberIcon number="3" icon={<AutoFixHighIcon />} />}
          {...a11yProps(3)}
        />
        <Tab
          sx={{
            fontFamily: "Rancho, cursive",
            fontSize: 25,
            textTransform: "none",
          }}
          icon={<VisibilityIcon />} 
          {...a11yProps(4)}
        />
        {Auth.loggedIn() ? (
          <div>
            <Link to="/Profile">
              <IconButton
                size="large"
                aria-label="heart"
                sx={{ ml: 1.5, color: "grey" }}
              >
                <Badge badgeContent={0} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>
        ) : (
          <div>
            <Button sx={{ ml: 1.5, color: "grey" }} onClick={handleOpenModal}>
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
      <TabPanel value={value} index={4}>
        <View />
      </TabPanel>
      <LoginModal open={modalShow} handleClose={handleCloseModal} />
    </Box>
  );
}
