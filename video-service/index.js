const express = require('express');
const uploadService = require("express-fileupload");
const cors = require("cors");

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.get("/", async (req, res)=>{
  console.log(req.body);
  res.send("Response from the api");
})

app.listen(PORT, (err) => {
  if(!err) {
    console.log(`Server running on port: ${PORT}`);
  }
  else {
    console.log("Error running server: ", err);
  }
})

