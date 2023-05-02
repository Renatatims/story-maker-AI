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
        minHeight: { xs: "auto", sm: "100vh" },
        padding: { xs: 2, sm: 4 },
        backgroundColor: "#00334A",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: 36, sm: 50 },
          marginBottom: 2,
          textAlign: "center",
          fontFamily: "Kreon",
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
          style = {{ borderRadius: "10px", maxWidth: "100%", height: "auto" }}
        ></img>
      </a>
      </Box>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: 24, sm: 30 },
          marginBottom: 4,
          textAlign: "center",
          fontFamily: "Kreon",
        }}
      >
        create personalized stories using OpenAI API in a visual environment
      </Typography>
    </div>
  );
}

export default IntroPage;
