import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 📦 Fetch All Shipments (with query support)
export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async (query = "", { rejectWithValue }) => {
    try {
      const res = await API.get(`/shipments${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 📦 Create Shipment
export const createShipment = createAsyncThunk(
  "shipment/createShipment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/shipments", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔄 Update Status
export const updateShipmentStatus = createAsyncThunk(
  "shipment/updateStatus",
  async ({ id, status, location }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/shipments/${id}`, {
        status,
        location,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔍 Track Shipment (public)
export const trackShipment = createAsyncThunk(
  "shipment/trackShipment",
  async (trackingId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/shipments/${trackingId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    shipments: [],
    shipment: null, // single shipment (tracking)
    loading: false,
    error: null,
  },

  reducers: {
    clearShipment: (state) => {
      state.shipment = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔄 FETCH
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📦 CREATE
      .addCase(createShipment.fulfilled, (state, action) => {
        state.shipments.unshift(action.payload);
      })

      // 🔄 UPDATE STATUS
      .addCase(updateShipmentStatus.fulfilled, (state, action) => {
        const index = state.shipments.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
      })

      // 🔍 TRACK
      .addCase(trackShipment.pending, (state) => {
        state.loading = true;
      })
      .addCase(trackShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipment = action.payload;
      })
      .addCase(trackShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearShipment } = shipmentSlice.actions;

export default shipmentSlice.reducer;