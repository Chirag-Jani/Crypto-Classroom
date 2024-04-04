import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";
import { join } from "path";
import fileUpload from "express-fileupload";

const app = express();
const PORT = 8080;

app.use(express.json({ extend: true }));
app.use(cors());
app.use(fileUpload());

app.use("/", apiRoutes);

app.use(express.static(join(__dirname, "./public")));

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server running on port: ${PORT}`);
  } else {
    console.log("Error running server: ", err);
  }
});
