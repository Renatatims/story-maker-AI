import React from "react";
import {
  Modal,
  Grid,
  Typography,
  Box,
  Stack,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import images from "../../../../utils/images";
import { styled } from "@mui/material/styles";

const ImageModal = (props) => {
  const { open, handleClose, handleSelect } = props;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} sx={{ m: "10px" }}>
          <IconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
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
            Choose one or more Animals by clicking over the images:
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
          <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={props.handleClose}
            variant="contained"
            sx={{
              fontFamily: "Kreon",
              backgroundColor: "grey",
              "&:hover": { backgroundColor: "#00334A" },
            }}
          >
            Continue
          </Button>
          </div>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ImageModal;
