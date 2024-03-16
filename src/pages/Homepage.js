import { Box } from "@mui/material"
import { Grid } from '@mui/material';
import CourseItem from "../components/CourseItem";
import cover from "./../images/bg_img.jpg";

const courses = [
    {
        title: 'Blockchain Fundamentals',
        author: 'Jane Doe',
        rating: 4.5,
        image: cover,
        price: '0.01 MATIC / 50 CCR'
    },
    {
        title: 'Introduction to Cryptocurrency',
        author: 'John Smith',
        rating: 4.7,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Advanced Smart Contracts',
        author: 'Alice Johnson',
        rating: 4.8,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Ethereum and Solidity',
        author: 'Mike Brown',
        rating: 4.6,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Decentralized Applications',
        author: 'Samantha Davis',
        rating: 4.9,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Crypto Trading Strategies',
        author: 'Chris Wilson',
        rating: 4.4,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Blockchain for Business',
        author: 'Emma White',
        rating: 4.3,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Security in Blockchain',
        author: 'David Johnson',
        rating: 4.7,
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'The Future of Finance',
        author: 'Sarah Miller',
        rating: 4.8,
        image: 'https://via.placeholder.com/150'
    }
];

const Homepage = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                {courses.map((course, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CourseItem course={course} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Homepage