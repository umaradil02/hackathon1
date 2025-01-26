import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import QRCode from "react-qr-code";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([
    {
      _id: "1",
      name: "John Doe",
      loanCategory: "Wedding Loans",
      amount: "500,000 PKR",
      tokenNumber: "",
    },
    {
      _id: "2",
      name: "Jane Smith",
      loanCategory: "Home Construction Loans",
      amount: "1,200,000 PKR",
      tokenNumber: "",
    },
    {
      _id: "3",
      name: "Mark Lee",
      loanCategory: "Business Startup Loans",
      amount: "900,000 PKR",
      tokenNumber: "",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [tokenNumber, setTokenNumber] = useState("");

  const handleShowModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTokenNumber("");
  };

  const handleAddToken = () => {
    const updatedApplications = applications.map((app) =>
      app._id === selectedApplication._id
        ? { ...app, tokenNumber: tokenNumber }
        : app
    );
    setApplications(updatedApplications);
    setShowModal(false);
    setTokenNumber("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
        padding: 3,
        color: "white",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1e88e5, #1976d2)",
          marginBottom: 3,
        }}
      >
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Paper
        sx={{
          marginTop: 3,
          boxShadow: 10,
          borderRadius: 2,
          overflow: "hidden",
          padding: 3,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{
            background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
            color: "white",
            padding: 2,
            borderRadius: 1,
          }}
        >
          Applications Management
        </Typography>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f4ff" }}>
                <TableCell>Token Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Loan Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    {application.tokenNumber || "Not assigned"}
                  </TableCell>
                  <TableCell>{application.name}</TableCell>
                  <TableCell>{application.loanCategory}</TableCell>
                  <TableCell>{application.amount}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
                        color: "white",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #1565c0, #4fc3f7)",
                        },
                      }}
                      onClick={() => handleShowModal(application)}
                    >
                      Assign Token
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 4,
            maxWidth: 400,
            margin: "auto",
            marginTop: 10,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 10,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            sx={{ color: "#1976d2" }}
          >
            Assign Token to Application
          </Typography>
          <TextField
            label="Token Number"
            variant="outlined"
            fullWidth
            value={tokenNumber}
            onChange={(e) => setTokenNumber(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #4fc3f7)",
              },
            }}
            onClick={handleAddToken}
          >
            Add Token
          </Button>
        </Box>
      </Modal>

      {selectedApplication && selectedApplication.tokenNumber && (
        <Box
          sx={{
            marginTop: 5,
            textAlign: "center",
            padding: 3,
            background: "white",
            borderRadius: 2,
            boxShadow: 10,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginBottom: 2, color: "#1976d2" }}
          >
            Generated QR Code for Token
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
