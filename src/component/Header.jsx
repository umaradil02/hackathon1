import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #673ab7, #512da8)",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          paddingX: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            Saylani Welfare Microfinance App
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {[
            { to: "/home", label: "Home" },
            { to: "/", label: "Login" },
            { to: "/admin-dashboard", label: "Admin Dashboard" },
            { to: "/dashboard", label: "User Dashboard" },
          ].map((item) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={item.to}
            >
              <Button
                component={Link}
                to={item.to}
                sx={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  paddingX: 3,
                  paddingY: 1,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
