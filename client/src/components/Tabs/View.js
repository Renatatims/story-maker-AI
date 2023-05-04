import React from "react";
import {
  Card,
  Typography,
  Container,
} from "@mui/material";
import HTMLFlipBook from "react-pageflip";
//import exampleImage from "../../assets/images/imgExample.PNG"; // import the image
import bookCoverImage from "../../assets/images/book_template.png";

function ResponseFlipBook() {
  // Get Title from Local storage
  const title = localStorage.getItem("cardTitle") || "Title"

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
      <Container>
        <Typography
          variant="h4"
          style={{ fontFamily: "Kreon", fontSize: "40px" }}
        >
          View your story
        </Typography>
      </Container>
      <Card>
      <Typography
          variant="h2"
          style={{ fontFamily: "Kreon", fontSize: "40px" }}
        >
          {title}
        </Typography>
        <HTMLFlipBook
          width={600}
          height={800}
          style={{
            fontFamily: "kreon",
            backgroundImage: `url(${bookCoverImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: "70vh", 
            maxWidth: "700px", 
            margin: "auto", 
            padding: "50px",
          }}
        >
          {Array.from({ length: numPages }).map((_, i) => (
            <div key={i}>
              {sentences
                .slice(i * sentencesPerPage, (i + 1) * sentencesPerPage)
                .join(". ")}
              <img src={lastImageUrl} alt="imageAI" style={{ maxWidth: '40%', height: 'auto' }} />
            </div>
          ))}
        </HTMLFlipBook>
      </Card>
    </>
  );
}

export default ResponseFlipBook;