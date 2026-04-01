import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  trackShipment,
  clearShipment,
} from "../features/shipment/shipmentSlice";

const steps = ["Pending", "In Transit", "Delivered"];

const TrackShipment = () => {
  const dispatch = useDispatch();
  const { shipment, loading } = useSelector((state) => state.shipment);

  const [trackingId, setTrackingId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(trackShipment(trackingId));
  };

  const getActiveStep = () => {
    if (!shipment) return 0;
    return steps.indexOf(shipment.status);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Paper
        sx={{
          p: 4,
          maxWidth: 600,
          mx: "auto",
          mt: 8,
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          🔍 Track Shipment
        </Typography>

        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            label="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button fullWidth variant="contained" type="submit">
            Track
          </Button>
        </form>

        {/* Loader */}
        {loading && (
          <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />
        )}

        {/* Shipment Result */}
        {shipment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Typography sx={{ mt: 3 }}>
              📦 Tracking ID: {shipment.trackingId}
            </Typography>

            <Typography>Status: {shipment.status}</Typography>
            <Typography>From: {shipment.origin}</Typography>
            <Typography>To: {shipment.destination}</Typography>

            {/* Stepper */}
            <Stepper activeStep={getActiveStep()} sx={{ mt: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
};

export default TrackShipment;