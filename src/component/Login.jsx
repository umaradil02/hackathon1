import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "../api/apifunc";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const textFieldStyles = {
    containerBg: "#f4f9ff", // Light blue/white background
    textFieldBg: "#ffffff", // Pure white for input fields
    textColor: "#003366", // Dark blue text
    labelColor: "#00509e", // Medium blue for labels
    buttonBg: "#00509e", // Primary blue for buttons
    buttonTextColor: "#ffffff", // White text on buttons
    hoverBg: "#003366", // Darker blue for hover state
    linkColor: "#00509e", // Blue for links
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing in...");

    try {
      const response = await signInWithEmailAndPassword(
        formData.email,
        formData.password
      );
      toast.success("Signed in successfully!", { id: loadingToast });
      console.log(response);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.message.includes("auth/wrong-password")) {
        toast.error("Incorrect password. Please try again.");
      } else if (error.message.includes("auth/user-not-found")) {
        toast.error("No user found with this email. Please sign up first.");
      } else if (error.message.includes("auth/invalid-email")) {
        toast.error("Invalid email address. Please check and try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: textFieldStyles.containerBg,
          borderRadius: 4,
          boxShadow: 5,
          p: 4,
          textAlign: "center",
          color: textFieldStyles.textColor,
          mt: 12,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: textFieldStyles.textColor }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: textFieldStyles.labelColor }}
        >
          Login to your account
        </Typography>
        <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              sx={{
                backgroundColor: textFieldStyles.textFieldBg,
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: textFieldStyles.textColor,
                },
                "& .MuiInputLabel-root": {
                  color: textFieldStyles.labelColor,
                },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              sx={{
                backgroundColor: textFieldStyles.textFieldBg,
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: textFieldStyles.textColor,
                },
                "& .MuiInputLabel-root": {
                  color: textFieldStyles.labelColor,
                },
              }}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                backgroundColor: textFieldStyles.buttonBg,
                color: textFieldStyles.buttonTextColor,
                "&:hover": {
                  backgroundColor: textFieldStyles.hoverBg,
                },
              }}
            >
              Login
            </Button>
          </motion.div>
        </form>
      </Container>
    </>
  );
};

export default Login;
