import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import CourseItem from "../components/CourseItem";
import cover from "./../images/bg_img.jpg";

const useStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    maxWidth: 600,
    padding: "1rem",
  },
  avatar: {
    width: "6rem",
    height: "6rem",
    marginRight: "1rem",
  },
};

const courses = [
  {
    title: "Blockchain Fundamentals",
    author: "Jane Doe",
    rating: 4.5,
    image: cover,
    price: "0.01 MATIC / 50 CCR",
  },
  {
    title: "Introduction to Cryptocurrency",
    author: "John Smith",
    rating: 4.7,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Advanced Smart Contracts",
    author: "Alice Johnson",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Ethereum and Solidity",
    author: "Mike Brown",
    rating: 4.6,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Decentralized Applications",
    author: "Samantha Davis",
    rating: 4.9,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Crypto Trading Strategies",
    author: "Chris Wilson",
    rating: 4.4,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Blockchain for Business",
    author: "Emma White",
    rating: 4.3,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Security in Blockchain",
    author: "David Johnson",
    rating: 4.7,
    image: "https://via.placeholder.com/150",
  },
  {
    title: "The Future of Finance",
    author: "Sarah Miller",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
  },
];

const ProfilePage = () => {
  const user = {
    name: "John Doe",
    address: "1234 Main St, City, Country",
    type: "Regular User",
    memberSince: 1636228800000, // Sample timestamp (UNIX timestamp in milliseconds)
    // Add more user data properties as needed
  };

  const calculateMemberDuration = (timestamp) => {
    const joinDate = new Date(timestamp);
    const currentDate = new Date();
    const diffMonths =
      (currentDate.getFullYear() - joinDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      joinDate.getMonth();
    if (diffMonths < 12) {
      return `${diffMonths} months`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;
      if (remainingMonths === 0) {
        return `${years} years`;
      } else {
        return `${years} years, ${remainingMonths} months`;
      }
    }
  };

  return (
    <Box sx={useStyles.root}>
      <Paper sx={useStyles.paper} elevation={3}>
        {/* Left side: Avatar */}
        <Avatar sx={useStyles.avatar}>
          {/* You can replace the placeholder avatar with the user's actual avatar */}
          {user.name && user.name.charAt(0).toUpperCase()}
        </Avatar>

        {/* Right side: User information */}
        <div>
          <Typography variant="h6" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Address: {user.address}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Type: {user.type}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Member Since: {calculateMemberDuration(user.memberSince)} ago
          </Typography>
          {/* Add more user information fields as needed */}
        </div>
      </Paper>

      <Box>
        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CourseItem course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;
