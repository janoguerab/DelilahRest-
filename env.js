const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${NODE_ENV}`,
});

module.exports = NODE_ENV;
