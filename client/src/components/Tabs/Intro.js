import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function IntroPage() {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#00334A",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: 60,
          marginBottom: 2,
          textAlign: "center",
          fontFamily: "Rancho",
        }}
      >
        Hello and Welcome to 
      </Typography>
      <Box sx={{
          textAlign: "center",
          borderRadius: "10px",
         }}>
      <a href="/">
        <img
          src={require("../../assets/logo/storyMakerAI_intro.png")}
          alt="icon"
          height="300px"
          style={{ borderRadius: "10px" }}
        ></img>
      </a>
      </Box>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: 40,
          marginBottom: 4,
          textAlign: "center",
          fontFamily: "Rancho",
        }}
      >
        create personalized stories using OpenAI API in a visual environment
      </Typography>
    </div>
  );
}

export default IntroPage;
