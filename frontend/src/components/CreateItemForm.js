import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ethers } from "ethers";
import axios from "axios";
import { Box } from "@mui/material";

const CreateItemForm = ({ CCRManagerAddress, CCRManagerABI }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to backend or handle it accordingly
    console.log({ uid, tag, priceInMatic, payWithMatic, videoLink });
    alert("Make allow some amount of tokens first");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CCRManagerAddress,
      CCRManagerABI,
      signer
    );
    const newCourse = await contract.createCourse(
      Number(uid),
      2,
      1,
      videoLink, // Added video link parameter
      false // Added bo
    );

    console.log(newCourse);
  };

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
      console.log(res.data.res.link);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        margin: "100px",
      }}
    >
      <TextField
        type="file"
        inputProps={{ accept: "video/*" }}
        onChange={handleFileChange}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      >
        <label htmlFor="video-file-input">
          <Button variant="outlined" component="span" onClick={uploadVideo}>
            Upload Video
          </Button>
        </label>
        {videoFile && <span>{videoFile.name}</span>}
      </div>
      <TextField
        label="UID"
        variant="outlined"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        fullWidth
      />
      <TextField
        label="Tag"
        variant="outlined"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        fullWidth
      />
      <TextField
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
    </Box>
  );
};

export default CreateItemForm;
