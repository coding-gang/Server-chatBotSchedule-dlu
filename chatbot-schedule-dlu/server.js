const express = require("express");
const dotenv = require("dotenv").config();
const app = require('./app');

const port = process.env.PORT || 8000
  
const server = app.listen( port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});