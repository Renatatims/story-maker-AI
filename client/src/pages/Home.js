import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Step1 from "../components/Tabs/Step1";
import Step2 from "../components/Tabs/Step2";
import Step3 from "../components/Tabs/Step3";

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
        <Tab label="Step One" {...a11yProps(0)} />
        <Tab label="Step Two" {...a11yProps(1)} />
        <Tab label="Step Three" {...a11yProps(2)} />
        <Tab label="Step Four" {...a11yProps(3)} />
        <Tab label="Step Five" {...a11yProps(4)} />
        <Tab label="Step Six" {...a11yProps(5)} />
        <Tab label="Step Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Step1 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Step2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Step3 />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Step Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Step Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Step Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Step Seven
      </TabPanel>
    </Box>
  );
}
