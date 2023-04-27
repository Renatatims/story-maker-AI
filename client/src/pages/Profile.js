import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Print } from "@mui/icons-material";
import exampleImage from "../assets/images/imgExample.PNG";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_STORIES_AI } from "../utils/queries";

function UserStories() {
  // QUERY_STORIES_AI query to get the list of stories from the database
  const { data } = useQuery(QUERY_STORIES_AI);
  console.log(data);
  const storiesAI = data?.storiesAI || [];

   // Define a state variable to keep track of whether to show the full or preview text
   const [showFullStory, setShowFullStory] = useState(false);

   // Define a function to toggle the state variable
   const handleToggleStory = () => {
     setShowFullStory((previewStory) => !previewStory);
   };

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
      {storiesAI?.map((storiesAI, index) => (
        <div key={index} id={`card-${index}`}>
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
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontFamily: "Rancho", fontSize: "35px" }}
              >
                Title
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontFamily: "Rancho",
                  fontSize: "30px",
                  maxHeight: showFullStory ? "none" : "120px", 
                  textOverflow: "ellipsis",
                  whiteSpace: "pre-line",
                  overflow: "hidden",
                }}
              >
                {storiesAI.stories}
              </Typography>
            </CardContent>
            <IconButton onClick={handleToggleStory}>
              {showFullStory ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton onClick={() => handlePrint(`card-${index}`)}>
              <Print />
            </IconButton>
          </Card>
        </div>
      ))}
      ;
    </>
  );
}

export default UserStories;
