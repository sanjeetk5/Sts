import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createShipment } from "../features/shipment/shipmentSlice";

const CreateShipment = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.shipment);

  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    origin: "",
    destination: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createShipment(form));

    setOpen(true);

    setForm({
      sender: "",
      receiver: "",
      origin: "",
      destination: "",
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Paper
        elevation={8}
        sx={{
          p: 5,
          maxWidth: 700,
          mx: "auto",
          mt: 8,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          🚚 Create Shipment
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sender Name"
              name="sender"
              value={form.sender}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Receiver Name"
              name="receiver"
              value={form.receiver}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Origin"
              name="origin"
              value={form.origin}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              value={form.destination}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 4, py: 1.5, borderRadius: 3 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Shipment"}
        </Button>
      </Paper>

      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success">Shipment Created Successfully 🎉</Alert>
      </Snackbar>
    </motion.div>
  );
};

export default CreateShipment;