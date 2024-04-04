const { Router } = require("express");
const { storeAsSync, castToStorage } = require("../helper");

const router = Router();

router.post("/upload", async (req, res) => {
  try {
    let response = {};

    let imagePath = storeAsSync(
      "uploads",
      req.files.photo.data,
      req.files.photo.mimetype
    );

    console.log(req.files.photo);
    let link = castToStorage(imagePath);
    console.log(imagePath);
    console.log(link);

    response.link = link;

    res.status(200).json({
      success: true,
      res: response,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      error: e,
    });
  }
});

router.get("/", (req, res) => {
  res.send("Ok");
});

module.exports = router;
