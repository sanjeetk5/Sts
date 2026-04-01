import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipments } from "../features/shipment/shipmentSlice";

import { Paper, Typography, Box, Chip, CircularProgress } from "@mui/material";

import { motion } from "framer-motion";

const ShipmentHistory = () => {
  const dispatch = useDispatch();
  const { shipments, loading } = useSelector((state) => state.shipment);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 10 }} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Paper sx={{ p: 4, mt: 5, borderRadius: 4 }}>
        {shipments.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography>No shipment history found 🚫</Typography>
          </Box>
        ) : (
          shipments.map((s) => (
            <Box
              key={s._id}
              sx={{
                p: 3,
                mb: 2,
                borderRadius: 3,
                background: "#f4f6fa",
              }}
            >
              <Typography variant="subtitle1">Tracking Id -  {s.trackingId}</Typography>

              <Typography variant="body2">
                {s.origin} ➝ {s.destination}
              </Typography>

              <Chip
                label={s.status}
                color={
                  s.status === "Delivered"
                    ? "success"
                    : s.status === "In Transit"
                      ? "warning"
                      : "default"
                }
                sx={{ mt: 1 }}
              />

              {/* History Timeline */}
              <Box sx={{ mt: 2 }}>
                {s.history.map((h, i) => (
                  <Typography key={i} variant="caption" display="block">
                    📍 {h.location} - {h.status}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))
        )}
      </Paper>
    </motion.div>
  );
};

export default ShipmentHistory;
