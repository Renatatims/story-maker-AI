import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  Box,
  Paper,
  Grid,
  IconButton,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import images from "../../utils/images";
import "../../App.css";

import { Configuration, OpenAIApi } from "openai";
// Apollo useMutation() Hook
import { useMutation } from "@apollo/client";
//Import Save Story AI mutation
import { SAVE_STORY_AI } from "../../utils/mutations";

const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getResponse(userInput) {
  const prompt = userInput.trim();
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const responseText = response.data.choices[0].text;
    // Retrieve existing responses from local storage
    const storedResponses = localStorage.getItem("responses");
    const responsesArray = storedResponses ? JSON.parse(storedResponses) : [];

    // Add new response to array and store back into local storage
    responsesArray.push(responseText);
    localStorage.setItem("responses", JSON.stringify(responsesArray)); // store response in local storage Array

    return responseText;
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching the data. Please try again later.";
  }
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function StoryMaker() {
  const [character, setCharacter] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  //Render Images - so user can select and include in their story
  const [selectedImage, setSelectedImage] = useState(null);

  const [saveStoriesAI] = useMutation(SAVE_STORY_AI);

  const handleSelect = (image) => {
    setSelectedImage(image);
    console.log(image.description);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const prompt = `Please generate a story that includes a main character with the name: ${character}, and description: ${description} and has the following theme: ${theme}. Story's max words: 150 words. ${
      selectedImage
        ? "The story should also include the following " +
          selectedImage.description.toLowerCase() +
          "."
        : ""
    }`;
    const response = await getResponse(prompt);
    console.log(prompt);
    console.log(response);
    setResponse(response);
    setLoading(false);
  };

  // Define the handleSaveStoryAI function
  const handleSaveStoryAI = async () => {
    try {
      // Call the saveNutriPlan mutation with the nutriPlan object
      await saveStoriesAI({ variables: { storyData: { stories: response } } });

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

  return (
    <Container>
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
        Step 1: Describe your story
      </Typography>
      <Box component="div" onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingTop: "15px",
            paddingLeft: "20px",
            fontFamily: "Kreon",
            fontSize: {
              xs: "20px",
              sm: "25px",
              md: "30px",
            },
          }}
        >
          please input the following info:
        </Typography>
        <Card
          component="div"
          variant="outlined"
          sx={{
            m: "20px",
            p: "10px",
            borderColor: "dark",
            borderWidth: "5px",
          }}
        >
          <form>
            <TextField
              component="div"
              label="Character's name"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              sx={{ p: "10px", fontFamily: "Kreon" }}
            />
            <TextField
              label="Description"
              component="div"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ p: "10px" }}
            />
            <TextField
              label="Theme"
              component="div"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              sx={{ p: "10px" }}
            />
            <Button
              type="submit"
              disabled={!character || loading}
              variant="contained"
              sx={{
                m: "20px",
                fontFamily: "Kreon",
                backgroundColor: "grey",
                "&:hover": { backgroundColor: "#00334A" },
              }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Box>
      {loading && <CircularProgress />}
      {response && (
        <Card
          component="div"
          sx={{
            padding: "30px",
            margin: "20px",
            paddingLeft: "20px",
            fontFamily: "Kreon",
            fontSize: "30px",
          }}
        >
          {response}
          <IconButton onClick={handleSaveStoryAI}>
            <FavoriteBorderIcon />
          </IconButton>
        </Card>
      )}
      <Box component="div" sx={{ flexGrow: 1, marginBottom: "20px" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingTop: "15px",
            paddingLeft: "20px",
            fontFamily: "Kreon",
            fontSize: {
              xs: "20px",
              sm: "25px",
              md: "30px",
            },
          }}
        >
          If you wish, click over the images and add the items to your story:
        </Typography>

        {/*Animals*/}
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingTop: "15px",
            paddingLeft: "20px",
            fontFamily: "Kreon",
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "25px",
            },
          }}
        >
          Choose an Animal:
        </Typography>
        <Grid container spacing={2}>
          {images.map(
            (image) =>
              image.id <= 8 && (
                <Grid key={image.id} item xs={6} sm={4} md={3}>
                  <Item
                    onClick={() => handleSelect(image)}
                    sx={{
                      cursor: "pointer",
                      fontFamily: "Kreon",
                      fontSize: "20px",
                    }}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      style={{ maxHeight: "200px" }}
                    />
                    <Grid item>
                      <Grid container justifyContent="center" spacing={1}>
                        <Grid item>{image.title}</Grid>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              )
          )}
        </Grid>

        {/*Characters*/}
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingTop: "15px",
            paddingLeft: "20px",
            fontFamily: "Kreon",
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "25px",
            },
          }}
        >
          Choose a character:
        </Typography>
        <Grid container spacing={2}>
          {images.map(
            (image) =>
              image.id >= 9 &&
              image.id <= 12 && (
                <Grid
                  key={image.id}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  sx={{ paddingBottom: "15px" }}
                >
                  <Item
                    onClick={() => handleSelect(image)}
                    sx={{
                      cursor: "pointer",
                      fontFamily: "Kreon",
                      fontSize: "20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <img
                        src={image.url}
                        alt={image.title}
                        style={{
                          maxHeight: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>{image.title}</div>
                  </Item>
                </Grid>
              )
          )}
        </Grid>

        {/*Celebrations*/}
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingTop: "15px",
            paddingLeft: "20px",
            fontFamily: "Kreon",
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "25px",
            },
          }}
        >
          Choose a special occasion or celebration:
        </Typography>
        <Grid container spacing={2}>
          {images.map(
            (image) =>
              image.id >= 13 && (
                <Grid
                  key={image.id}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  sx={{ paddingBottom: "15px" }}
                >
                  <Item
                    onClick={() => handleSelect(image)}
                    sx={{
                      cursor: "pointer",
                      fontFamily: "Kreon",
                      fontSize: "20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <img
                        src={image.url}
                        alt={image.title}
                        style={{
                          maxHeight: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>{image.title}</div>
                  </Item>
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default StoryMaker;
