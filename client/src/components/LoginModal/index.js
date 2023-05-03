import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function LoginModal(props) {
  const { open, handleClose } = props;

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

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
          <IconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={require("../../assets/logo/storyMakerAI_logo.png")}
            alt="icon"
            style={{ height: "60px" }}
          ></img>
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <Stack>
              <TextField
                id="email"
                label="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                fullWidth
                autoFocus
                sx={{ margin: 2 }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
                fullWidth
                sx={{ margin: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    margin: 1,
                    backgroundColor: "grey",
                    "&:hover": { backgroundColor: "darkgrey" },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
}

export default LoginModal;
