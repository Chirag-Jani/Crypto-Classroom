import React, { useState } from "react";
import axios from "axios";

const CourseUpload = () => {
  const [selectedFile, setselectedFile] = useState(null);
  const [videoLink, setVideoLink] = useState("");

  const upload = async () => {
    try {
      // Check if a file is selected
      if (!selectedFile) {
        console.log("Please select a file.");
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("photo", selectedFile);

      // Make POST request with FormData
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVideoLink(response.data.res.link);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setselectedFile(e.target.files[0]);
        }}
      />
      <button onClick={upload}>Upload</button>

      <video src={videoLink} width={"500"} height={"auto"}></video>
    </div>
  );
};

export default CourseUpload;
