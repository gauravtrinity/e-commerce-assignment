import {
  Box,
  Card,
  Column,
  Heading,
  Icon,
  Image,
  SearchField,
  Spinner,
  Text
} from "gestalt";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { strapiService } from "../utils/service";

import "./App.css";

const App = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async function getBrands() {
      setLoading(true);
      try {
        const { data } = await strapiService.request("POST", "/graphql", {
          data: {
            query: `
          query {
            brands{
              _id
              name
              description
              image{
                name
                url
              }
            }
          }
          `
          }
        });
        setBrands(data.brands);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(`error`, error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setSearchText(e.value);
  };

  const filter = (searchText, brands) => {
    return brands.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  return (
    <Box padding={12}>
      <Box display="flex" direction="row" paddingY={2}>
        <Column span={4}>
          <Box padding={1}>
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Heading color="midnight" size="sm">
                Filter
              </Heading>
            </Box>
            <Box display="flex" justifyContent="center" marginTop={4}>
              <SearchField
                id="search"
                accessibilityLabel="Brand search"
                value={searchText}
                onChange={handleChange}
                placeholder="Search Brands"
              />
              <Box margin={2}>
                <Icon
                  icon="filter"
                  color={searchText ? "orange" : "gray"}
                  size={20}
                  accessibilityLabel="filter"
                />
              </Box>
            </Box>
          </Box>
        </Column>
        <Column span={8}>
          <Box padding={1}>
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Heading color="midnight" size="md">
                Brew Brands
              </Heading>
            </Box>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: "#d6c8ec"
                }
              }}
              wrap
              display="flex"
              justifyContent="around"
            >
              {filter(searchText, brands).map((brand) => (
                <Box paddingY={4} margin={2} width={200} key={brand._id}>
                  <Card
                    image={
                      <Box width={200} height={200}>
                        <Image
                          fit="cover"
                          alt="Brand"
                          naturalWidth={1}
                          naturalHeight={1}
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
                      <Text bold size="xl">
                        {brand.name}
                      </Text>
                      <Text> {brand.description}</Text>
                      <Text bold size="xl">
                        <Link to={`/${brand._id}`}>See Brews</Link>
                      </Text>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Column>
      </Box>

      <Spinner show={loading} accessibilityLabel="spinner" />
    </Box>
  );
};

export default App;
