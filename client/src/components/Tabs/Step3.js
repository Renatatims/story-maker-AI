import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
} from "@mui/material";
import HTMLFlipBook from "react-pageflip";
//import exampleImage from "../../assets/images/imgExample.PNG"; // import the image
import "../../assets/css/step3.css"; // import the CSS file

function ResponseFlipBook() {

  // Get Story from local storage
  const storedResponses = localStorage.getItem("responses") || "";
  const responsesArray = storedResponses ? JSON.parse(storedResponses) : [];
  // Get last story from array
  const lastResponse = responsesArray.length > 0 ? responsesArray[responsesArray.length - 1] : "";
  const sentencesPerPage = 1;
  const sentences = lastResponse.split(". "); // split response into an array of sentences
  const numPages = Math.ceil(sentences.length / sentencesPerPage); // calculate the number of pages needed

  //Get image from local storage
  const imageUrl = localStorage.getItem("imageUrl");

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          style={{ fontFamily: "Kreon", fontSize: "40px" }}
        >
          {" "}
          Step 3: Generate your personalized story{" "}
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
            src={imageUrl}
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
              Title
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
      <Card sx={{ padding: 5, margin: 20 }}>
        <HTMLFlipBook
          width={600}
          height={500}
          paddingLeft={10}
          style={{ fontFamily: "Kreon", fontSize: "30px" }}
        >
          {Array.from({ length: numPages }).map((_, i) => (
            <div key={i}>
              {sentences
                .slice(i * sentencesPerPage, (i + 1) * sentencesPerPage)
                .join(". ")}
              <img src={imageUrl} alt="imageAI" width={300} height={300} />
            </div>
          ))}
        </HTMLFlipBook>
      </Card>
    </>
  );
}

export default ResponseFlipBook;
