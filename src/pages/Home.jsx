// pages/Home.jsx

import { Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h3" gutterBottom>
          Track Your Shipments in Real-Time 
        </Typography>

        <Typography variant="h6" sx={{ mb: 4 }}>
          Fast • Reliable • Secure Logistics Tracking
        </Typography>

        <Button component={Link} to="/admin" variant="contained" size="large">
          Get Started
        </Button>
      </motion.div>
    </Container>
  );
};

export default Home;