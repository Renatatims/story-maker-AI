import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import "../../assets/css/step3.css"; // import the CSS file

function StoryCard() {
  // Get Title from Local storage
  const [title, setTitle] = useState(
    localStorage.getItem("cardTitle") || "Title"
  );

  const [isEditing, setIsEditing] = useState(false);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleEditTitle() {
    setIsEditing(true);
  }

  function handleSaveTitle() {
    setIsEditing(false);
    localStorage.setItem("cardTitle", title);
  }

  // Get Story from local storage
  const storedResponses = localStorage.getItem("responses") || "";
  const responsesArray = storedResponses ? JSON.parse(storedResponses) : [];
  // Get last story from array
  const lastResponse =
    responsesArray.length > 0 ? responsesArray[responsesArray.length - 1] : "";
 
  //Get image from local storage
  const imageUrls = localStorage.getItem("imageUrls");
  const urlsArray = imageUrls ? JSON.parse(imageUrls) : [];

  // Get last URL from array
  const lastImageUrl =
    urlsArray.length > 0 ? urlsArray[urlsArray.length - 1] : "";

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Kreon",
            fontSize: {
              xs: "30px",
              sm: "35px",
              md: "40px",
            },
          }}
        >
          Step 3: Generate your personalized story
        </Typography>
      </Container>
      <div>
        <Card
          sx={{ maxWidth: 600, margin: "auto", boxShadow: 10 }}
          className="printable-content"
        >
          <CardMedia
            component="img"
            height="300"
            src={lastImageUrl}
            alt="imageAI"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontFamily: "Kreon", fontSize: "35px" }}
            >
              {isEditing ? (
                <TextField
                  label="Title"
                  variant="filled"
                  value={title}
                  onChange={handleTitleChange}
                  sx={{ fontFamily: "Kreon", fontSize: "35px" }}
                />
              ) : (
                <>
                  {title}
                  <IconButton className="edit-icon" onClick={handleEditTitle}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
              {isEditing && (
                <IconButton onClick={handleSaveTitle}>
                  <DoneIcon />
                </IconButton>
              )}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "Kreon", fontSize: "28px" }}
            >
              {lastResponse}
            </Typography>
          </CardContent>
        </Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handlePrint}
            variant="contained"
            sx={{ marginTop: "20px" }}
          >
            Print
          </Button>
        </div>
      </div>
    </>
  );
}

export default StoryCard;
