import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Redux se auth state lo
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // redux clear
    navigate("/login"); // redirect
  };

  return (
    <AppBar
      position="static"
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Shipment Tracker
        </Typography>

        <Button component={Link} to="/track" color="inherit">
          Track
        </Button>

        <Button component={Link} to="/admin" color="inherit">
          Dashboard
        </Button>

        {/* 🔐 Conditional Rendering */}
        {!isAuthenticated ? (
          // ❌ Not logged in → show Dashboard button
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        ) : (
          // ✅ Logged in → show Logout button
          <Button color="white" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
