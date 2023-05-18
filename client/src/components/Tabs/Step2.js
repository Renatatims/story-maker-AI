import React, { useState } from "react";
import {
  Button,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Auth from "../../utils/auth";

//Import Categories Modal
import CategoriesModal from "../Modals/Step2Modal/";

// Apollo useMutation() Hook
import { useMutation } from "@apollo/client";
//Import Mutation
import { SAVE_IMAGE } from "../../utils/mutations";

import { Configuration, OpenAIApi } from "openai";
import images2 from "../../utils/images2";

const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(prompt) {
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
    });
    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
    return "";
  }
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveImage] = useMutation(SAVE_IMAGE);

  //Select a Category
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Submit user prompt
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const imagePrompt = prompt;
    try {
      const generatedImageUrl = await generateImage(imagePrompt);

      // Convert the image to Base64
      try {
        const response = await fetch(`/proxy-image?url=${generatedImageUrl}`);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64Image = reader.result;

          // Local storage Images
          const storedUrls = localStorage.getItem("imageUrls");
          const urlsArray = storedUrls ? JSON.parse(storedUrls) : [];

          // Add new URL to array and store back into local storage
          urlsArray.push(generatedImageUrl);

          // Store the updated array back into local storage
          localStorage.setItem("imageUrls", JSON.stringify(urlsArray));

          // Update the UI with the generated image URL
          setImageUrl(generatedImageUrl);

          setLoading(false);

          // Save the image to the database if user is logged in
          if (Auth.loggedIn()) {
            try {
              await saveImage({
                variables: {
                  imageData: {
                    image: base64Image,
                  },
                },
              });
            } catch (saveError) {
              console.error("Error saving image:", saveError);
            }
          }
        };
      } catch (fetchError) {
        console.error("Error fetching the image:", fetchError);
        setLoading(false);
      }
    } catch (generationError) {
      console.error("Error generating the image:", generationError);
      setLoading(false);
    }
  };

  /*//Render example Images - generated by AI
  const [setSelectedImage] = useState(null);

  const handleSelect = (image) => {
    setSelectedImage(image);
  };*/

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //Categories Step 2 Modal
  //Modal - useState
  const [modalCategoriesShow, setCategoriesModalShow] = useState(false);

  //Open Modal
  const handleOpenCategoriesModal = (category) => {
    setSelectedCategory(category);
    setCategoriesModalShow(true);
  };
  //Close Modal
  const handleCloseCategoriesModal = () => {
    setCategoriesModalShow(false);
  };

  //Select a Category
  const categories = [
    {
      title: "christmas",
      images: images2.christmas,
      cover: images2.christmas[0].path,
    },
    {
      title: "princess",
      images: images2.princess,
      cover: images2.princess[2].path,
    },
    {
      title: "space",
      images: images2.space,
      cover: images2.space[0].path,
    },
  ];

  return (
    <Container>
      <Container
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          Step 2: Create a personalized image using AI
        </Typography>
        {!Auth.loggedIn() && (
          <Typography
            variant="h6"
            component="div"
            style={{
              fontFamily: "Kreon",
              fontSize: "20px",
              alignItems: "center",
              margin: "20px",
            }}
          >
            Generate an AI image by typing a description below. To save the
            image in your account, you must login or signup, but you can still
            view the generated AI image on the next steps. Have fun!
          </Typography>
        )}
        <Box component="div" mt={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter a description"
              fullWidth
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!prompt || loading}
              sx={{
                marginTop: "1rem",
                fontFamily: "Kreon",
                backgroundColor: "grey",
                "&:hover": { backgroundColor: "#00334A" },
              }}
            >
              Generate Image
            </Button>
          </form>
        </Box>
        {loading && <CircularProgress />}
        {imageUrl && (
          <Box
            mt={4}
            component="div"
            style={{
              width: "350px",
              height: "300px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <img
              src={imageUrl}
              alt="Generated_AI_Image"
              style={{ margin: "0 auto", maxHeight: "100%", maxWidth: "100%" }}
            />
          </Box>
        )}
      </Container>

      <Box component="div" sx={{ flexGrow: 1, marginBottom: "20px" }}>
        <Typography
          variant="h5"
          component="div"
          style={{
            fontFamily: "Kreon",
            fontSize: "40px",
            textAlign: "center",
            margin: "40px",
          }}
        >
          AI images generated - browse by categories
        </Typography>

        {/* Render Cards for each category */}
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid key={index} item xs={6} sm={4} md={3}>
              <Item
                onClick={() => handleOpenCategoriesModal(category)}
                sx={{
                  cursor: "pointer",
                  fontFamily: "Kreon",
                  fontSize: "20px",
                }}
              >
                 <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  objectFit="cover"
                  image={category.cover}
                  alt="Card Image"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontFamily: "Kreon",
                      fontSize: {
                        sm: "20px",
                        md: "25px",
                      },
                    }}
                  >
                    {category.title}
                  </Typography>
                </CardContent>
              </Item>
            </Grid>
          ))}
        </Grid>

        {/* Render the modal */}
        {selectedCategory && (
          <CategoriesModal
            open={modalCategoriesShow}
            handleClose={handleCloseCategoriesModal}
            category={selectedCategory ? selectedCategory.images : []}
          />
        )}

        {/* Categories */}
        <Typography
          variant="h6"
          component="div"
          style={{ fontFamily: "Kreon", fontSize: "25px" }}
        >
          Christmas Theme
        </Typography>
        <Grid container spacing={2}>
          {images2.christmas.map((image) => (
            <Grid key={image.id} item xs={6} md={3}>
              <Item>
                <img
                  src={image.path}
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
          ))}
        </Grid>

        <Typography
          variant="h6"
          component="div"
          style={{ fontFamily: "Kreon", fontSize: "25px" }}
        >
          Princess Theme
        </Typography>
        <Grid container spacing={2}>
          {images2.princess.map((image) => (
            <Grid key={image.id} item xs={6} md={3}>
              <Item>
                <img
                  src={image.path}
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
          ))}
        </Grid>

        <Typography
          variant="h6"
          component="div"
          style={{ fontFamily: "Kreon", fontSize: "25px" }}
        >
          Space
        </Typography>
        <Grid container spacing={2}>
          {images2.space.map((image) => (
            <Grid key={image.id} item xs={6} md={3}>
              <Item>
                <img
                  src={image.path}
                  alt={image.title}
                  style={{ height: "200px" }}
                />
                <Grid item>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item>{image.title}</Grid>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ImageGenerator;
