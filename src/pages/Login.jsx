import { TextField, Button, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );

    // ✅ Agar login successful
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin"); // redirect to dashboard
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" gutterBottom>
         Admin Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          sx={{ mb: 2 }}
        />

        <Button fullWidth variant="contained" type="submit">
          Login
        </Button>
        <Typography mt={5} >
            admin email - admin@gmail.com
        </Typography>
        <Typography>
            admin pass - admin123
        </Typography>
      </form>

    </Paper>
  );
};

export default Login;