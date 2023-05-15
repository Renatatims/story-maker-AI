import React, { useState } from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import exampleImage from "../../assets/images/imgExample.PNG"; // import the image
import bookCoverImage from "../../assets/images/template/bookPage_template.png";
import ImageIcon from "@mui/icons-material/Image";

//Import Login modal
import LoginModal from "../LoginModal/index";

//Import Signup modal
import SignupModal from "../SignupModal/index";

import Auth from "../../utils/auth";

// Apollo useMutation() Hook
import { useMutation } from "@apollo/client";
//Import Save Story AI mutation
import { SAVE_STORY_AI } from "../../utils/mutations";

function ResponseFlipBook() {
  const [saveStoriesAI] = useMutation(SAVE_STORY_AI);
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

  // Define the handleSaveStoryAI function
  const handleSaveStoryAI = async () => {
    try {
      // Call the saveNutriPlan mutation with the nutriPlan object
      await saveStoriesAI({
        variables: { storyData: { stories: lastResponse } },
      });

      // Show a success message to the user
      alert("Story saved successfully!");
    } catch (error) {
      console.error(error);

      // Show an error message to the user
      alert(
        "An error occurred while saving the story. Please try again later."
      );
    }
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
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontFamily: "Kreon",
                fontSize: "27px",
                m: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {title}
            </Typography>
          </Container>
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
              mr: "20px",
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
              <Stack alignItems="center" sx={{ ml: "30px" }}>
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
                    overflow: "auto",
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
            cursor: "pointer",
          }}
          onClick={handleSaveStoryAI}
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
            color: "#00334A",
          }}
        >
          <p>
            Please{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={handleOpenModal}
            >
              login
            </span>
            <span>
              <IconButton onClick={handleOpenModal}>
                <AccountCircleIcon />
              </IconButton>
            </span>
            or{" "}
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={handleOpenSignupModal}
            >
              create an account
            </span>{" "}
            to save your story
          </p>
        </Container>
      )}
      <LoginModal open={modalShow} handleClose={handleCloseModal} />
      <SignupModal
        open={modalSignupShow}
        handleClose={handleCloseSignupModal}
      />
    </>
  );
}

export default ResponseFlipBook;
