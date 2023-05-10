import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  IconButton,
  Grid,
  useMediaQuery,
  TextField,
  Box,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import Auth from "../utils/auth";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_STORIES_AI } from "../utils/queries";

//use Mutation to update the title
import { useMutation } from "@apollo/client";
import { UPDATE_STORY_TITLE } from "../utils/mutations";

// Mutation to delete a story
import { DELETE_STORY_AI } from "../utils/mutations";

function UserStories({onGoToStep2}) {
  // QUERY_STORIES_AI query to get the list of stories from the database
  const { data } = useQuery(QUERY_STORIES_AI);
  console.log(data);
  const storiesAI = data?.storiesAI || [];

  // TITLE
  //Define state variables for editing the title
  const [isEditing, setIsEditing] = useState({});
  const [editedTitle, setEditedTitle] = useState("");

  // UPDATE_STORY_TITLE mutation - to update a meal plan title
  const [updateTitle] = useMutation(UPDATE_STORY_TITLE, {
    refetchQueries: [{ query: QUERY_STORIES_AI }],
  });

  // handleEditTitle function - to handle the edit title button click event
  const handleEditTitle = (storyId) => {
    // Set the editing state of the title with the given storyId to true
    setIsEditing((prevEditing) => ({ ...prevEditing, [storyId]: true }));
  };

  //handleSaveTitle function - save title button click event
  const handleSaveTitle = async (storyId) => {
    try {
      await updateTitle({
        variables: {
          storyId,
          title: editedTitle,
        },
      });
      setIsEditing((prev) => ({ ...prev, [storyId]: false }));
      setEditedTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  //handleTitleChange function -  handle the input field's change event
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  //Delete Meal Plan mutation
  const [deleteStory] = useMutation(DELETE_STORY_AI, {
    refetchQueries: [{ query: QUERY_USER }],
  });

  //Get Image from local Storage - Future development: get image from database
  //Get image from local storage
  const imageUrls = localStorage.getItem("imageUrls");
  const urlsArray = imageUrls ? JSON.parse(imageUrls) : [];

  // Get last URL from array
  const lastImageUrl =
    urlsArray.length > 0 ? urlsArray[urlsArray.length - 1] : "";

  //PREVIEW
  // Define a state variable to keep track of whether to show the full or preview text
  const [showFullStory, setShowFullStory] = useState(
    storiesAI.map((story) => false)
  );

  // Define a function to toggle the state variable for a specific card
  const handleToggleStory = (index) => {
    setShowFullStory((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  //Mobile view
  const isMobile = useMediaQuery("(max-width:600px)");

  // Print a specifc Story Card - included a timeout so the print window opens after the browser renders all info before printing it
  const handlePrint = (cardId) => {
    const cardToPrint = document.getElementById(cardId).innerHTML;
    console.log("Printing card:", cardToPrint);
    const printWindow = window.open("", "printWindow", "height=400,width=600");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Card Printout</title>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              * {
                visibility: hidden;
              }
              #card-to-print, #card-to-print * {
                visibility: visible;
              }
              #card-to-print {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              #card-to-print .MuiTypography-h5 {
                font-family:  sans-serif;
                font-size: 35px;
              }
              #card-to-print .MuiTypography-body2 {
                font-family: sans-serif;
                line-height: 2.5;
                font-size: 25px;
              }
              #card-to-print .center {
                text-align: center; /* center the image */
              }
            }
          </style>
        </head>
        <body>
          <div id="card-to-print">
            ${cardToPrint}
          </div>
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  };

  // Delete Story from Profile
  const handleDeleteStory = async (storyId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await deleteStory({
        variables: { storyId },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          component ="div"
          sx={{
            fontFamily: "Kreon",
            fontSize: {
              xs: "30px",
              sm: "35px",
              md: "40px",
            },
          }}
        >
          Saved Stories
        </Typography>
      </Container>
      <Grid container spacing={isMobile ? 2 : 4}>
        {storiesAI?.map((story, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} id={`card-${index}`}>
            <Card
              key={index}
              sx={{
                maxWidth: 600,
                margin: "auto",
                boxShadow: 10,
                marginBottom: "20px",
              }}
            >
              <div className="center">
                <CardMedia
                  component="img"
                  height="300"
                  src={lastImageUrl}
                  alt="imageAI"
                  sx={{ objectFit: "contain" }}
                  className="center"
                  onError={(e) => {
                    e.target.style.display = "none";
                    document.getElementById("image-error").style.display = "block";
                  }}
                />
              </div>
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
                  cursor: "pointer",
                }}
                onClick={onGoToStep2}
              >
                To view an image go to Step 2{" "}
                <span>
                  <IconButton onClick={onGoToStep2}>
                    <ImageIcon sx={{ pb: "4px" }} />
                  </IconButton>
                </span>
              </Box>
              <CardContent component ="div">
                <Typography
                  component ="div"
                  style={{
                    fontSize: "25px",
                    fontFamily: "Kreon",
                    fontWeight: "bold",
                    color: "#8C2E5A",
                  }}
                >
                  {isEditing[story._id] ? (
                    <TextField
                      component ="div"
                      value={editedTitle}
                      onChange={handleTitleChange}
                      label="Story Title"
                    />
                  ) : (
                    <>
                      {story.title}{" "}
                      <IconButton onClick={() => handleEditTitle(story._id)}>
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                  {isEditing[story._id] && (
                    <IconButton onClick={() => handleSaveTitle(story._id)}>
                      <DoneIcon />
                    </IconButton>
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  component ="div"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Rancho",
                    fontSize: "30px",
                    maxHeight: showFullStory[index] ? "none" : "120px",
                    textOverflow: "ellipsis",
                    whiteSpace: "pre-line",
                    overflow: "hidden",
                  }}
                >
                  {story.stories}
                </Typography>
              </CardContent>
              <IconButton onClick={() => handleToggleStory(index)}>
                {showFullStory[index] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <IconButton onClick={() => handlePrint(`card-${index}`)}>
                <Print />
              </IconButton>
              <IconButton onClick={() => handleDeleteStory(story._id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UserStories;
