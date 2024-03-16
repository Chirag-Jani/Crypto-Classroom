import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: 400,
    margin: "auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    color: "white",
  },
  input: {
    display: "none",
  },
  fileInputWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem",
    borderRadius: "4px",
  },
  fileName: {
    marginLeft: "1rem",
  },
});

const CreateItemForm = () => {
  const [uid, setUid] = useState("");
  const [tag, setTag] = useState("");
  const [priceInMatic, setPriceInMatic] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [payWithMatic, setPayWithMatic] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend or handle it accordingly
    console.log({ uid, tag, priceInMatic, payWithMatic, videoLink });
    alert("Contract call here");
  };

  const classes = useStyles();

  const uploadVideo = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", videoFile);

      let res = await axios.post("http://127.0.0.1:8080/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVideoLink(res.data.res.link);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <TextField
        className={classes.input}
        type="file"
        inputProps={{ accept: "video/*" }}
        onChange={handleFileChange}
      />
      <div className={classes.fileInputWrapper}>
        <label htmlFor="video-file-input">
          <Button variant="outlined" component="span" onClick={uploadVideo}>
            Upload Video
          </Button>
        </label>
        {videoFile && (
          <span className={classes.fileName}>{videoFile.name}</span>
        )}
      </div>
      <TextField
        className={classes.input}
        label="UID"
        variant="outlined"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        fullWidth
      />
      <TextField
        className={classes.input}
        label="Tag"
        variant="outlined"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        fullWidth
      />
      <TextField
        className={classes.input}
        label="Price in Matic"
        variant="outlined"
        type="number"
        value={priceInMatic}
        onChange={(e) => setPriceInMatic(e.target.value)}
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox color="primary" />}
        label="Pay with Matic"
        checked={payWithMatic}
        onChange={(e) => setPayWithMatic(e.target.checked)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Create Item
      </Button>
    </div>
  );
};

export default CreateItemForm;
