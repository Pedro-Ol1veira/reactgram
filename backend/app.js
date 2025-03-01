require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;

const app = express();

// config JSON and form data response

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors
//upload directory
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// db conections
require("./config/db");
//routes  
const router = require('./routes/Router');
app.use(router);

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`);
});
