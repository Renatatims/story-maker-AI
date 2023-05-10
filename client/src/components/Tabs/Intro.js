import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';

function IntroPage() {
  return (
    <>
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontSize: { xs: 36, sm: 50 },
          marginBottom: 2,
          textAlign: "center",
          fontFamily: "Kreon",
        }}
      >
        Hello and Welcome to
      </Typography>
      <Box
        component="div"
        sx={{
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Link component="div" href="/">
          <Box
            component="img"
            src={require("../../assets/logo/storyMakerAI_intro.png")}
            alt="icon"
            style={{ borderRadius: "10px", maxWidth: "100%", height: "auto" }}
          ></Box>
        </Link>
      </Box>
      <Typography
        variant="h2"
        component="div"
        sx={{
          fontSize: { xs: 24, sm: 30 },
          marginBottom: 4,
          textAlign: "center",
          fontFamily: "Kreon",
        }}
      >
        create personalized stories using OpenAI API in a visual environment
      </Typography>
    </>
  );
}

export default IntroPage;
