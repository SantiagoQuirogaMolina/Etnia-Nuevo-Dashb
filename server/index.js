const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const express = require("express");
const prendas = require("./src/controllers/savedInDB");
const cloudinary = require("cloudinary").v2;
const app = express();

cloudinary.config({
  cloud_name: "dauvht6ky",
  api_key: "864773466771315",
  api_secret: "tDiz5YwUPgG1cWN15m96Qh-_0tg",
});


app.use(express.json());
const PORT = process.env.PORT || 3001;

conn
  .sync({ force: true })
  .then(() => {
    prendas();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
