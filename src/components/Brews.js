import {
  Box,
  Button,
  Card,
  Column,
  Heading,
  IconButton,
  Image,
  Mask,
  Spinner,
  Text
} from "gestalt";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { calculatePrice, getCart, setCart } from "../utils/cartActions";
import { strapiService } from "../utils/service";

const Brews = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState("");
  const [brews, setBrews] = useState([]);
  const [cartItems, setCartItems] = useState(getCart());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function getBrews() {
      setLoading(true);
      try {
        const { data } = await strapiService.request("POST", "/graphql", {
          data: {
            query: `
            query {
                brand(id: "${id}") {
                  name
                  description
                  image {
                    name
                    url
                  }
                  brews {
                    _id
                    name
                    price
                    description
                    image {
                      name
                      url
                    }
                  }
                }
              }
              
              `
          }
        });
        setBrews(data.brand.brews);
        setBrand(data.brand.name);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(`error`, error);
      }
    })();
  }, []);

  const addToCart = (brew) => {
    const alreadyInCart = cartItems.findIndex((item) => item._id === brew._id);

    if (alreadyInCart === -1) {
      const updatedItems = cartItems.concat({
        ...brew,
        quantity: 1
      });
      setCartItems(updatedItems);
      setCart(updatedItems);
    } else {
      const updatedItems = [...cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      setCartItems(updatedItems);
      setCart(updatedItems);
    }
  };

  const deleteItemFromCart = (itemToDeleteId) => {
    const filteredItems = cartItems.filter(
      (item) => item._id !== itemToDeleteId
    );
    setCartItems(filteredItems);
    setCart(filteredItems);
  };

  if (loading) return <Spinner show accessibilityLabel="spinner" />;

  return (
    <Box padding={12}>
      <Box display="flex" direction="row" paddingY={2}>
        <Column span={8}>
          <Box padding={1}>
            {/* Brews Section */}
            <Box display="flex" direction="column" alignItems="center">
              {/* Brews Heading */}
              <Box margin={2}>
                <Heading color="orchid">{brand}</Heading>
              </Box>
              {/* Brews */}
              <Box
                wrap
                shape="rounded"
                display="flex"
                justifyContent="center"
                padding={4}
              >
                {brews.map((brew) => (
                  <Box paddingY={4} margin={2} width={210} key={brew._id}>
                    <Card
                      image={
                        <Box height={250} width={200}>
                          <Image
                            fit="cover"
                            alt="Brand"
                            naturalHeight={1}
                            naturalWidth={1}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Homebrew_logo.svg/1200px-Homebrew_logo.svg.png"
                          />
                        </Box>
                      }
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                      >
                        <Box marginBottom={2}>
                          <Text bold size="xl">
                            {brew.name}
                          </Text>
                        </Box>
                        <Text>{brew.description}</Text>
                        <Text color="orchid">${brew.price}</Text>
                        <Box marginTop={2}>
                          <Text bold size="xl">
                            <Button
                              onClick={() => addToCart(brew)}
                              color="blue"
                              text="Add to Cart"
                            />
                          </Text>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                ))}
                {!brews.length && "No Brews available"}
              </Box>
            </Box>
          </Box>
        </Column>
        <Column span={4}>
          <Box padding={1}>
            {/* User Cart */}
            <Box alignSelf="end" marginTop={2} marginLeft={8}>
              <Mask shape="rounded" wash>
                <Box
                  display="flex"
                  direction="column"
                  alignItems="center"
                  padding={2}
                >
                  {/* User Cart Heading */}
                  <Heading align="center" size="sm">
                    Your Cart
                  </Heading>
                  <Text color="gray" italic>
                    {cartItems.length} items selected
                  </Text>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <Box key={item._id} display="flex" alignItems="center">
                      <Text>
                        {item.name} x {item.quantity} - $
                        {(item.quantity * item.price).toFixed(2)}
                      </Text>
                      <IconButton
                        accessibilityLabel="Delete Item"
                        icon="cancel"
                        size="sm"
                        iconColor="red"
                        onClick={() => deleteItemFromCart(item._id)}
                      />
                    </Box>
                  ))}

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Box margin={2}>
                      {cartItems.length === 0 && (
                        <Text color="red">Please select some items</Text>
                      )}
                    </Box>
                    <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                    <Text>
                      <Link to="/checkout">Checkout</Link>
                    </Text>
                  </Box>
                </Box>
              </Mask>
            </Box>
          </Box>
        </Column>
      </Box>
    </Box>
  );
};

export default Brews;
