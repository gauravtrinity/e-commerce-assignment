import Strapi from "strapi-sdk-javascript/build/main";

export const apiURL =
  process.env.REACT_APP_API_URL || "https://tranquil-taiga-57282.herokuapp.com";

export const strapiService = new Strapi(apiURL);
