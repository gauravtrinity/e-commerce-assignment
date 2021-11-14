import React, { useState } from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";

import { strapiService } from "../utils/service";
import { setToken } from "../utils/authUtils";

import ToastMessage from "./ToastMessage";

const Signup = ({ history }) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    toast: false,
    toastMessage: "",
    loading: false
  });

  const handleChange = ({ event, value }) => {
    event.persist();
    setState({ ...state, [event.target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = state;

    if (isFormEmpty(state)) {
      showToast("Fill in all fields");
      return;
    }

    // Sign up user
    try {
      setState({ ...state, loading: true });
      const response = await strapiService.register(username, email, password);
      setState({ ...state, loading: false });
      setToken(response.jwt);
      redirectUser("/");
      window.location.reload();
    } catch (err) {
      setState({ ...state, loading: false });
      showToast("Some error occured!");
    }
  };

  const redirectUser = (path) => history.push(path);

  const isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
  };

  const showToast = (toastMessage) => {
    setState({ ...state, toast: true, toastMessage });
    setTimeout(
      () => setState({ ...state, toast: false, toastMessage: "" }),
      5000
    );
  };

  const { toastMessage, toast, loading } = state;

  return (
    <Container>
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: "#ebe2da"
          }
        }}
        margin={4}
        padding={4}
        shape="rounded"
        display="flex"
        justifyContent="center"
      >
        {/* Sign Up Form */}
        <form
          style={{
            display: "inlineBlock",
            textAlign: "center",
            maxWidth: 450
          }}
          onSubmit={handleSubmit}
        >
          {/* Sign Up Form Heading */}
          <Box
            marginBottom={2}
            display="flex"
            direction="column"
            alignItems="center"
          >
            <Heading color="midnight">Let's Get Started</Heading>
            <Text italic color="orchid">
              Sign up to order some brews!
            </Text>
          </Box>
          {/* Username Input */}
          <TextField
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          {/* Email Address Input */}
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          {/* Password Input */}
          <TextField
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button
            inline
            disabled={loading}
            color="blue"
            text="Submit"
            type="submit"
          />
        </form>
      </Box>
      <ToastMessage show={toast} message={toastMessage} />
    </Container>
  );
};

export default Signup;
