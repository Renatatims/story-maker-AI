import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Grid,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import exampleImage from "../assets/images/img4.PNG";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_STORIES_AI } from "../utils/queries";

//use Mutation to update the title
import { useMutation } from "@apollo/client";
import { UPDATE_STORY_TITLE } from "../utils/mutations";

function UserStories() {
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

  return (
    <>
      <Typography
        variant="h4"
        style={{ fontFamily: "Rancho", fontSize: "48px" }}
      >
        Saved Stories
      </Typography>
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
                  src={exampleImage}
                  alt="imageAI"
                  sx={{ objectFit: "contain" }}
                  className="center"
                />
              </div>
              <CardContent>
                <h2
                  style={{
                    paddingLeft: "80px",
                    fontWeight: "bold",
                    color: "#8C2E5A",
                  }}
                >
                  {isEditing[story._id] ? (
                    <TextField
                      value={editedTitle}
                      onChange={handleTitleChange}
                      label="Story Title"
                    />
                  ) : (
                    <>
                      {story.title}{" "}
                      <IconButton
                        onClick={() => handleEditTitle(story._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                  {isEditing[story._id] && (
                    <IconButton onClick={() => handleSaveTitle(story._id)}>
                      <DoneIcon />
                    </IconButton>
                  )}
                </h2>
                <Typography
                  variant="body2"
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UserStories;
