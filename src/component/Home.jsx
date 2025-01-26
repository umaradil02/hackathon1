import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
} from "@mui/material";
import { RegisterWithDetails } from "../api/apifunc";

const Home = () => {
  const loanCategories = [
    {
      title: "Wedding Loans",
      maxLoan: 500000,
      period: 3,
      subcategories: ["Venue", "Catering", "Decoration"],
    },
    {
      title: "Home Construction Loans",
      maxLoan: 1000000,
      period: 5,
      subcategories: ["Materials", "Labor", "Furnishing"],
    },
    {
      title: "Business Startup Loans",
      maxLoan: 1000000,
      period: 5,
      subcategories: ["Equipment", "Office Space", "Marketing"],
    },
    {
      title: "Education Loans",
      maxLoan: 800000,
      period: 4,
      subcategories: ["Tuition", "Books", "Accommodation"],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [installment, setInstallment] = useState(null);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCnic, setUserCnic] = useState("");
  const [modalError, setModalError] = useState("");

  const calculateInstallment = () => {
    if (
      !selectedCategory ||
      !loanAmount ||
      !loanPeriod ||
      !initialDeposit ||
      !selectedSubcategory
    ) {
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
      setError(
        `Loan period cannot exceed ${selected.period} years for ${selectedCategory}.`
      );
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

  const handleModalClose = () => {
    setOpenModal(false);
    setUserName("");
    setUserEmail("");
    setUserCnic("");
    setModalError("");
  };

  const handleProceed = () => {
    // Check if name is provided
    if (!userName.trim()) {
      setModalError("Name is required.");
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setModalError("Please enter a valid email address.");
      return;
    }

    // Check if CNIC is exactly 13 digits
    if (!userCnic || userCnic.length !== 13 || !/^\d+$/.test(userCnic)) {
      setModalError("CNIC must be exactly 13 numeric characters.");
      return;
    }

    // If all validations pass, proceed
    alert(`Name: ${userName}, Email: ${userEmail}, CNIC: ${userCnic}`);
    handleModalClose();
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Saylani Microfinance App
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Empowering you through interest-free loans
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {loanCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="secondary"
                    gutterBottom
                  >
                    {category.title}
                  </Typography>
                  <Typography variant="body1" color="textPrimary" mt={2}>
                    <strong>Maximum Loan:</strong> PKR{" "}
                    {category.maxLoan.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" color="textPrimary" mb={2}>
                    <strong>Loan Period:</strong> {category.period} years
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={8} p={4} borderRadius={2} boxShadow={3} bgcolor="white">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
            textAlign="center"
          >
            Loan Calculator
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Loan Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    const selected = loanCategories.find(
                      (cat) => cat.title === e.target.value
                    );
                    setSelectedCategory(selected.title);
                    setSelectedSubcategory("");
                    setLoanPeriod("");
                    setLoanAmount("");
                    setInitialDeposit("");
                    setError("");
                  }}
                  label="Select Loan Category"
                >
                  {loanCategories.map((category, index) => (
                    <MenuItem key={index} value={category.title}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Select Subcategory</InputLabel>
                <Select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  label="Select Subcategory"
                  disabled={!selectedCategory}
                >
                  {selectedCategory &&
                    loanCategories
                      .find((cat) => cat.title === selectedCategory)
                      .subcategories.map((subcat, index) => (
                        <MenuItem key={index} value={subcat}>
                          {subcat}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount (PKR)"
                type="number"
                value={loanAmount}
                onChange={(e) => {
                  const amount = e.target.value;
                  setLoanAmount(amount);
                  const selected = loanCategories.find(
                    (cat) => cat.title === selectedCategory
                  );
                  if (amount > selected.maxLoan) {
                    setError(
                      `Loan amount cannot exceed PKR ${selected.maxLoan.toLocaleString()}`
                    );
                  } else {
                    setError("");
                  }
                }}
                variant="outlined"
                disabled={!selectedCategory}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Initial Deposit (PKR)"
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                variant="outlined"
                disabled={!selectedCategory}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Period (Years)"
                type="number"
                value={loanPeriod}
                onChange={(e) => {
                  const period = e.target.value;
                  setLoanPeriod(period);
                  const selected = loanCategories.find(
                    (cat) => cat.title === selectedCategory
                  );
                  if (period > selected.period) {
                    setError(
                      `Loan period cannot exceed ${selected.period} years.`
                    );
                  } else {
                    setError("");
                  }
                }}
                variant="outlined"
                disabled={!selectedCategory}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={calculateInstallment}
                sx={{ px: 4, py: 1.5 }}
                disabled={!selectedCategory || !selectedSubcategory}
              >
                Calculate
              </Button>
            </Grid>
          </Grid>

          {error && (
            <Typography variant="body2" color="error" textAlign="center" mt={3}>
              {error}
            </Typography>
          )}
          {installment !== null && !error && (
            <>
              <Box mt={4} textAlign="center">
                <Typography variant="h6" color="secondary">
                  Your Monthly Installment: <strong>PKR {installment}</strong>
                </Typography>
              </Box>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModal(true)}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Proceed
                </Button>
              </Grid>
            </>
          )}
        </Box>

        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="proceed-modal-title"
          aria-describedby="proceed-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography
              id="proceed-modal-title"
              variant="h6"
              textAlign="center"
              mb={3}
            >
              Enter Your Details
            </Typography>
            <TextField
              fullWidth
              label="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="CNIC"
              type="number"
              value={userCnic}
              onChange={(e) => setUserCnic(e.target.value)}
              sx={{ mb: 2 }}
            />
            {modalError && (
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                mb={2}
              >
                {modalError}
              </Typography>
            )}
            <Box textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  RegisterWithDetails(userCnic, userName, userEmail)
                }
                sx={{ px: 4, py: 1.5, mr: 2 }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={handleModalClose}
                sx={{ px: 4, py: 1.5 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>

      <Box textAlign="center" mt={6} pt={4} borderTop="1px solid #ddd">
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Saylani Welfare. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
