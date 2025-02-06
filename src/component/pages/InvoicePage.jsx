import React, { useState } from 'react';
import { TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const InvoicePage = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    patientName: '',
    phone: '',
    email: '',
    patientAddress: '',
    clinicName: '',
    clinicAddress: '',
    treatments: [
      { id: 1, treatmentName: '', price: '', quantity: 1, discount: 0, amount: 0 }
    ],
    subtotal: 0,
    discount: 0,
    tax: 0,
    grandTotal: 0,
    amountPaid: 0,
    modeOfPayment: ''
  });

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    if (field === 'treatment') {
      const treatments = [...invoice.treatments];
      treatments[index].treatmentName = value;
      setInvoice({ ...invoice, treatments });
    } else {
      setInvoice({ ...invoice, [field]: value });
    }
  };

  const handleTreatmentChange = (e, index, field) => {
    const value = e.target.value;
    const treatments = [...invoice.treatments];
    treatments[index][field] = value;
    treatments[index].amount = treatments[index].price * treatments[index].quantity - treatments[index].discount;
    setInvoice({ ...invoice, treatments });
    calculateTotals(treatments);
  };

  const calculateTotals = (treatments) => {
    let subtotal = 0;
    treatments.forEach(treatment => {
      subtotal += treatment.amount;
    });
    const discount = (subtotal * invoice.discount) / 100;
    const tax = (subtotal * invoice.tax) / 100;
    const grandTotal = subtotal - discount + tax;
    setInvoice({
      ...invoice,
      treatments,
      subtotal,
      discount,
      tax,
      grandTotal
    });
  };

  const addTreatment = () => {
    const treatments = [...invoice.treatments, { id: invoice.treatments.length + 1, treatmentName: '', price: '', quantity: 1, discount: 0, amount: 0 }];
    setInvoice({ ...invoice, treatments });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Invoice</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Invoice Number"
            variant="outlined"
            value={invoice.invoiceNumber}
            onChange={(e) => handleInputChange(e, null, 'invoiceNumber')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginTop: '1px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Patient Name"
            variant="outlined"
            value={invoice.patientName}
            onChange={(e) => handleInputChange(e, null, 'patientName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={invoice.phone}
            onChange={(e) => handleInputChange(e, null, 'phone')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginTop: '1px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={invoice.email}
            onChange={(e) => handleInputChange(e, null, 'email')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Patient Address"
            variant="outlined"
            multiline
            rows={4}
            value={invoice.patientAddress}
            onChange={(e) => handleInputChange(e, null, 'patientAddress')}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginTop: '10px' }}>Treatment Details</Typography>
      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>S.No</strong></TableCell>
              <TableCell><strong>Treatment Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Discount</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.treatments.map((treatment, index) => (
              <TableRow key={treatment.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    
                    onChange={(e) => handleTreatmentChange(e, index, 'treatment')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={treatment.price}
                    onChange={(e) => handleTreatmentChange(e, index, 'price')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={treatment.quantity}
                    onChange={(e) => handleTreatmentChange(e, index, 'quantity')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={treatment.discount}
                    onChange={(e) => handleTreatmentChange(e, index, 'discount')}
                  />
                </TableCell>
                <TableCell>{treatment.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" color="primary" style={{ marginTop: '10px' }} onClick={addTreatment}>Add Treatment</Button>

      <Grid container spacing={1} style={{ marginTop: '10px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Subtotal"
            variant="outlined"
            value={invoice.subtotal}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Discount (%)"
            variant="outlined"
            value={invoice.discount}
            onChange={(e) => handleInputChange(e, null, 'discount')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginTop: '1px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tax (%)"
            variant="outlined"
            value={invoice.tax}
            onChange={(e) => handleInputChange(e, null, 'tax')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Grand Total"
            variant="outlined"
            value={invoice.grandTotal}
            disabled
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginTop: '1px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount Paid"
            variant="outlined"
            value={invoice.amountPaid}
            onChange={(e) => handleInputChange(e, null, 'amountPaid')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mode of Payment"
            variant="outlined"
            value={invoice.modeOfPayment}
            onChange={(e) => handleInputChange(e, null, 'modeOfPayment')}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => alert('Invoice Saved')}>Save Invoice</Button>
        <Button variant="outlined" color="secondary" onClick={() => alert('Invoice Cancelled')}>Cancel</Button>
      </div>
    </div>
  );
};

export default InvoicePage;
