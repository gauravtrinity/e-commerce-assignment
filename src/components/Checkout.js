import React, { useEffect } from "react";
import { Box } from "gestalt";
import { Link } from "react-router-dom";

import { clearCart } from "../utils/cartActions";

const Checkout = () => {
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Box padding={12}>
      <Box display="flex" direction="row" justifyContent="center" paddingY={2}>
        Thanks for buying!
      </Box>
      <Box display="flex" direction="row" justifyContent="center" paddingY={2}>
        Buy some more? <Link to="/"> Click Here</Link>
      </Box>
    </Box>
  );
};

export default Checkout;
