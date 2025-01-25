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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";

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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

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

  const handleProceed = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setCnic("");
    setEmail("");
    setFormError("");
  };

  const handleSubmit = () => {
    if (!name || !cnic || !email) {
      setFormError("All fields are required.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setFormError("Name must only contain letters and spaces.");
      return;
    }

    if (!/^\d{13}$/.test(cnic)) {
      setFormError("CNIC must be 13 digits long.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    alert(`Name: ${name}, CNIC: ${cnic}, Email: ${email}`);
    handleClose();
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 5 }}>
      <Container>
        <Typography variant="h3" align="center" color="primary" gutterBottom>
          Saylani Microfinance
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Simplifying loans for your needs
        </Typography>

        <Grid container spacing={4} sx={{ mt: 3 }}>
          {loanCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Max Loan: PKR {category.maxLoan.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Period: {category.period} years
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 2,
            bgcolor: "#ffffff",
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Loan Calculator
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Loan Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Loan Category"
                >
                  {loanCategories.map((cat, index) => (
                    <MenuItem value={cat.title} key={index}>
                      {cat.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  label="Subcategory"
                  disabled={!selectedCategory}
                >
                  {selectedCategory &&
                    loanCategories
                      .find((cat) => cat.title === selectedCategory)
                      .subcategories.map((sub, index) => (
                        <MenuItem value={sub} key={index}>
                          {sub}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                disabled={!selectedCategory}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Initial Deposit"
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                disabled={!selectedCategory}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Loan Period (Years)"
                type="number"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(e.target.value)}
                disabled={!selectedCategory}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={calculateInstallment}
              >
                Calculate Installment
              </Button>
            </Grid>
          </Grid>

          {error && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {installment && (
            <Box
              sx={{ mt: 4, p: 3, border: "1px solid #d1d1d1", borderRadius: 2 }}
            >
              <Typography variant="h6" color="primary">
                Monthly Installment: PKR {installment}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleProceed}
              >
                Proceed
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Enter Your Details</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
          />

          {formError && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {formError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
