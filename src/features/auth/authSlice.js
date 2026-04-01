// features/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// 🔐 LOGIN
export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await API.post("/auth/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
});

const slice = createSlice({
  name: "auth",

  // 🔥 Initial State upgrade
  initialState: {
    user: null,
    loading: false,
    isAuthenticated: !!localStorage.getItem("token"),
  },

  reducers: {
    // 🚪 LOGOUT
    logout: (state) => {
      localStorage.removeItem("token"); // token delete
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ⏳ Loading
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      // ✅ Success
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload; // optional (agar backend user bhejta hai)
      })

      // ❌ Error
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

// 🔥 export logout action
export const { logout } = slice.actions;

export default slice.reducer;