import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import exampleImage from "../assets/images/imgExample.PNG";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_STORIES_AI } from "../utils/queries";

function ResponseFlipBook() {
  // QUERY_STORIES_AI query to get the list of stories from the database
  const { data } = useQuery(QUERY_STORIES_AI);
  console.log(data);
  const storiesAI = data?.storiesAI || [];

  // Print a specifc Story Card 
  const handlePrint = (cardId) => {
    const cardToPrint = document.getElementById(cardId);
    console.log("Printing card:", cardToPrint.outerHTML);
    const printWindow = window.open('', 'printWindow', 'height=400,width=600');
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
            }
          </style>
        </head>
        <body>
        <div id="card-to-print">
          ${cardToPrint.outerHTML}
        </div>
      </body>
    </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <>
      <Typography
        variant="h4"
        style={{ fontFamily: "Rancho", fontSize: "48px" }}
      >
        {" "}
        Saved Stories{" "}
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
            <CardMedia
              component="img"
              height="300"
              src={exampleImage}
              alt="imageAI"
              sx={{ objectFit: "contain" }}
            />
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
                sx={{ fontFamily: "Rancho", fontSize: "30px" }}
              >
                {storiesAI.stories}
              </Typography>
            </CardContent>
            <Button onClick={() => handlePrint(`card-${index}`)}>Print</Button>
          </Card>
        </div>
      ))}
      ;
    </>
  );
}

export default ResponseFlipBook;
