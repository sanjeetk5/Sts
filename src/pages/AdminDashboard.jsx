import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShipments,
  updateShipmentStatus,
} from "../features/shipment/shipmentSlice";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Select,
  Button,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import ShipmentHistory from "./ShipmentHistory";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shipments, loading } = useSelector((state) => state.shipment);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  // 🔍 Filter Logic
  const filteredData = shipments.filter((s) => {
    return (
      s.trackingId.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? s.status === statusFilter : true)
    );
  });

  // 🔄 Status Update
  const handleStatusChange = (id, status) => {
    dispatch(
      updateShipmentStatus({
        id,
        status,
        location: "Updated by Admin",
      }),
    );
  };

  // 📊 Stats
  const total = shipments.length;
  const delivered = shipments.filter((s) => s.status === "Delivered").length;
  const inTransit = shipments.filter((s) => s.status === "In Transit").length;

  // 📊 DataGrid Columns
  const columns = [
    { field: "trackingId", headerName: "Tracking ID", flex: 1 },
    { field: "origin", headerName: "Origin", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            color:
              params.row.status === "Delivered"
                ? "green"
                : params.row.status === "In Transit"
                  ? "orange"
                  : "gray",
            fontWeight: 500,
          }}
        >
          {params.row.status}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Update",
      flex: 1,
      renderCell: (params) => (
        <Select
          size="small"
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Transit">In Transit</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      ),
    },
  ];


   
  

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ p: 4 }}>
        {/* 🧾 Title */}
        <Typography variant="h4" gutterBottom>
          Shipment Dashboard
        </Typography>

        {/* 🔥 Action Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/create")}
            sx={{ borderRadius: 3 }}
          >
            Create Shipment
          </Button>
        </Box>

        {/* 📦 Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>Total Shipments</Typography>
              <Typography variant="h5">{total}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>Delivered</Typography>
              <Typography variant="h5" color="green">
                {delivered}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography>In Transit</Typography>
              <Typography variant="h5" color="orange">
                {inTransit}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 🔥 Tabs */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="📦 Shipments" />
          <Tab label="📜 Shipment History" />
        </Tabs>

        {/* 🔍 Search + Filter */}
        {tab === 0 && (
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Search Tracking ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />

            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </Box>
        )}

        {/* 📊 TAB 1 → DataGrid */}
        {tab === 0 && (
          <Paper sx={{ height: 500, borderRadius: 3 }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f1f5f9",
                  fontWeight: "bold",
                },
              }}
            />
          </Paper>
        )}

        {/* 📜 TAB 2 → Shipment History */}
        {tab === 1 && <ShipmentHistory />}
      </Box>
    </motion.div>
  );
};

export default AdminDashboard;
