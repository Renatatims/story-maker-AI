import React from "react";
import { Modal, Card, Grid, Typography, Box, Stack } from "@mui/material";
import images from "../../../../utils/images";

const ImageModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bgcolor: "white",
          boxShadow: 20,
          borderRadius: 4,
          p: 2,
          m: 1,
          minWidth: "300px",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
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
                    <Card
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
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ImageModal;
