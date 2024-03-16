import React from 'react';
import { useParams } from 'react-router-dom';
// import { getCourseById } from './courseDataService'; // This is a hypothetical function
import { Box, Typography, Rating } from '@mui/material';

const ProductDetails = () => {
    let { id, title } = useParams();
    // const course = getCourseById(id); // Fetch course data based on the ID

    console.log("id::;", id);

    return (
        <Box sx={{ p: 3 }}>
            <iframe
                width="100%"
                height="315"
                // src={`https://www.youtube.com/embed/${course.videoId}`} // Replace with your video link
                src={`https://www.youtube.com/watch?v=BTRVFZVZTP8`} // Replace with your video link
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            <Typography variant="h4" sx={{ mt: 2 }}>
                {/* {course.title} */} ABCkdjkjf
            </Typography>
            <Typography variant="subtitle1">
                {/* by {course.author} */} by kdnfkjsn
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                {/* {course.description} */} jndfjkkjsnf dfjn
            </Typography>
            <Rating name="read-only" value={4} readOnly sx={{ mt: 1 }} />
        </Box>
    );
};

export default ProductDetails;
