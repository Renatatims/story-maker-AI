import React from "react";
import {
  Typography,
  Container,
  IconButton,
  Icon,
  Stack,
  Box,
} from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//import exampleImage from "../../assets/images/imgExample.PNG"; // import the image
import bookCoverImage from "../../assets/images/bookPage_template.png";
import ImageIcon from "@mui/icons-material/Image";

import Auth from "../../utils/auth";

function ResponseFlipBook() {
  // Get Title from Local storage
  const title = localStorage.getItem("cardTitle") || "Title";

  // Get Story from local storage
  const storedResponses = localStorage.getItem("responses") || "";
  const responsesArray = storedResponses ? JSON.parse(storedResponses) : [];

  // Get last story from array
  const lastResponse =
    responsesArray.length > 0 ? responsesArray[responsesArray.length - 1] : "";
  const sentencesPerPage = 1;
  const sentences = lastResponse.split(". "); // split response into an array of sentences
  const numPages = Math.ceil(sentences.length / sentencesPerPage); // calculate the number of pages needed

  //Get image from local storage
  const imageUrls = localStorage.getItem("imageUrls");
  const urlsArray = imageUrls ? JSON.parse(imageUrls) : [];

  // Get last URL from array
  const lastImageUrl =
    urlsArray.length > 0 ? urlsArray[urlsArray.length - 1] : "";

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontFamily: "Kreon",
            fontSize: {
              xs: "30px",
              sm: "35px",
              md: "40px",
            },
          }}
        >
          View your story: {title}
        </Typography>
      </Container>
      <HTMLFlipBook
        width={300}
        height={450}
        style={{
          fontFamily: "kreon",
          border: "4px solid black",
          backgroundImage: `url(${bookCoverImage})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px",
          height: "70vh",
          maxWidth: "50%",
          margin: "auto",
          padding: "10px",
          paddingTop: "0px",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        }}
        showCover={true}
      >
        <div>
          <Typography
            variant="h2"
            component="div"
            sx={{
              fontFamily: "Kreon",
              fontSize: "27px",
            }}
          >
            {title}
          </Typography>
          <img
            src={lastImageUrl}
            alt="imageAI"
            style={{
              padding: "20px",
              paddingTop: "10px",
              maxWidth: "80%",
              height: "auto",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              document.getElementById("image-error").style.display = "block";
            }}
          />
          <Box
            id="image-error"
            sx={{
              fontFamily: "Kreon",
              fontSize: {
                xs: "22px",
              },
              display: "none",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              margin: "10px",
              boxShadow: 5,
              textAlign: "center",
              justifyContent: "center",
              width: "55%",
              mx: "auto",
            }}
          >
            To view an image go to Step 2{" "}
            <span>
              <Icon>
                <ImageIcon sx={{ paddingTop: "3.5px" }} />
              </Icon>
            </span>
          </Box>
          <IconButton
            sx={{
              fontFamily: "kreon",
              fontWeight: "bold",
              position: "absolute",
              bottom: "130px",
              right: "10px",
            }}
          >
            <PlayCircleFilledWhiteIcon fontSize="large" />
          </IconButton>
        </div>
        {Array.from({ length: numPages }).map((_, i) => (
          <Stack direction="column" alignItems="center">
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              <IconButton sx={{ marginLeft: "-100px", marginTop: "200px" }}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <Stack alignItems="center">
                <img
                  src={lastImageUrl}
                  alt="imageAI"
                  style={{
                    padding: "20px",
                    maxWidth: "60%",
                    height: "auto",
                    alignItems: "center",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div
                  style={{
                    fontFamily: "Kreon",
                    fontSize: "25px",
                    margin: "0px 30px",
                    padding: "10px",
                  }}
                >
                  {sentences
                    .slice(i * sentencesPerPage, (i + 1) * sentencesPerPage)
                    .join(". ")}
                </div>
              </Stack>
              <IconButton sx={{ marginRight: "-50px", marginTop: "200px" }}>
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          </Stack>
        ))}
      </HTMLFlipBook>
      {Auth.loggedIn() ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Kreon",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          <p>Save to Profile</p>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Kreon",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          <p>Please login or create an account to save your story</p>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Container>
      )}
    </>
  );
}

export default ResponseFlipBook;
