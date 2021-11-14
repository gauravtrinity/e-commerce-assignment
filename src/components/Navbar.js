import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { NavLink, useHistory } from "react-router-dom";

import { clearCart } from "../utils/cartActions";
import { getToken, clearToken } from "../utils/authUtils";

const Navbar = () => {
  const history = useHistory();
  const handleSignout = () => {
    clearToken();
    clearCart();
    history.push("/");
    window.location.reload();
  };

  return getToken() !== null ? (
    <AuthNav handleSignout={handleSignout} />
  ) : (
    <UnAuthNav />
  );
};

const AuthNav = ({ handleSignout }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    {/* Checkout Link */}
    <NavLink activeClassName="active" to="/checkout">
      <Text size="xl" color="white">
        Checkout
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="BrewHaha Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.svg"
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewHaha
        </Heading>
      </Box>
    </NavLink>

    {/* Signout Button */}
    <Button
      onClick={handleSignout}
      color="transparent"
      text="Sign Out"
      inline
      size="md"
    />
  </Box>
);

const UnAuthNav = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    {/* Sign In Link */}
    <NavLink activeClassName="active" to="/signin">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="BrewHaha Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.svg"
          />
        </Box>
        <Heading size="xs" color="orange">
          BrewHaha
        </Heading>
      </Box>
    </NavLink>

    {/* Sign Up Link */}
    <NavLink activeClassName="active" to="/signup">
      <Text size="xl" color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default Navbar;
