import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [installment, setInstallment] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loanCategories = [
    { title: "Wedding Loans", maxLoan: 500000, period: 3 },
    { title: "Home Construction Loans", maxLoan: 1000000, period: 5 },
    { title: "Business Startup Loans", maxLoan: 1000000, period: 5 },
    { title: "Education Loans", maxLoan: 800000, period: 4 },
  ];

  useEffect(() => {
    // Fetching loan applications logic
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      const fetchApplications = async () => {
        try {
          const response = await fetch("/api/user/loan-applications");
          const data = await response.json();
          setLoanApplications(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching loan applications:", error);
          setLoading(false);
        }
      };

      fetchApplications();
    }
  }, [navigate]);

  const calculateInstallment = () => {
    if (!selectedCategory || !loanAmount || !loanPeriod || !initialDeposit) {
      setError("Please fill in all the fields.");
      return;
    }

    const selected = loanCategories.find(
      (cat) => cat.title === selectedCategory
    );

    if (parseFloat(loanAmount) > selected.maxLoan) {
      setError(
        `Loan amount cannot exceed PKR ${selected.maxLoan.toLocaleString()}`
      );
      return;
    }

    if (parseInt(loanPeriod) > selected.period) {
      setError(`Loan period cannot exceed ${selected.period} years.`);
      return;
    }

    if (parseFloat(initialDeposit) >= parseFloat(loanAmount)) {
      setError(
        "Initial deposit cannot be equal to or greater than the loan amount."
      );
      return;
    }

    setError("");
    const adjustedLoanAmount =
      parseFloat(loanAmount) - parseFloat(initialDeposit);
    const monthlyInstallment = (
      adjustedLoanAmount /
      (parseInt(loanPeriod) * 12)
    ).toFixed(2);
    setInstallment(monthlyInstallment);
  };

  const handleSlipDownload = (tokenNumber) => {
    alert(`Slip downloaded for token: ${tokenNumber}`);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        backgroundColor: "#f4f9ff",
        borderRadius: 4,
        p: 4,
        boxShadow: 10,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#003366", textAlign: "center" }}
      >
        User Dashboard
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ color: "#00509e", textAlign: "center", mb: 3 }}
      >
        View your loan applications and download slips.
      </Typography>

      {/* Loan Calculator Section */}
      <Box
        sx={{ mt: 4, bgcolor: "white", p: 4, borderRadius: 2, boxShadow: 10 }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          gutterBottom
          textAlign="center"
        >
          Loan Calculator
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Loan Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setLoanAmount("");
              setLoanPeriod("");
              setInitialDeposit("");
              setInstallment(null);
              setError("");
            }}
          >
            {loanCategories.map((category, index) => (
              <MenuItem key={index} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Loan Amount (PKR)"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Initial Deposit (PKR)"
          type="number"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Loan Period (Years)"
          type="number"
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={calculateInstallment}
          disabled={!selectedCategory}
          sx={{
            background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0, #4fc3f7)",
            },
          }}
        >
          Calculate
        </Button>

        {error && (
          <Typography variant="body2" color="error" textAlign="center" mt={3}>
            {error}
          </Typography>
        )}

        {installment !== null && !error && (
          <Typography variant="h6" color="secondary" textAlign="center" mt={3}>
            Your Monthly Installment: <strong>PKR {installment}</strong>
          </Typography>
        )}
      </Box>

      {/* Loan Applications Table */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : loanApplications.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f4ff" }}>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Token Number
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Loan Category
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Loan Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanApplications.map((application) => (
                <TableRow key={application.tokenNumber}>
                  <TableCell>{application.tokenNumber}</TableCell>
                  <TableCell>{application.loanCategory}</TableCell>
                  <TableCell>PKR {application.loanAmount}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          handleSlipDownload(application.tokenNumber)
                        }
                        sx={{
                          backgroundColor: "#00509e",
                          color: "#ffffff",
                          "&:hover": { backgroundColor: "#003366" },
                        }}
                      >
                        Download Slip
                      </Button>
                    </motion.div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "#00509e" }}
          >
            No loan applications found.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            sx={{
              background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #4fc3f7)",
              },
            }}
          >
            Signout
          </Button>
        </>
      )}
    </Container>
  );
};

export default UserDashboard;
