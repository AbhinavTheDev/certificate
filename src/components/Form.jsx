import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

function CertificateForm({ setCertificateData  }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    certificateID: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    certificateID: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set form data
    
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate Certificate ID length
    if (name === 'certificateID' && value.length > 12) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        certificateID: 'Certificate ID must be 12 characters or less',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        certificateID: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.certificateID) {
      navigate('/certificate', setCertificateData(formData)); // Only submit if no errors
    }
  };

  return (
    <Container>
      <Typography variant='h4' style={{ marginTop: '20px' }} gutterBottom>Certificate Generator</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Certificate ID"
          name="certificateID"
          value={formData.certificateID}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.certificateID}
          helperText={errors.certificateID}
        />
        <TextField
          label="Date *"
          name="date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={formData.date}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!!errors.certificateID || !formData.name || !formData.description || !formData.date}
          style={{ marginTop: '20px' }}
        >
          Generate Certificate
        </Button>
      </form>
    </Container>
  );
}

export default CertificateForm;
