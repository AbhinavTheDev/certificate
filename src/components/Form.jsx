import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Stack, Card as MuiCard } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled Card component
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  marginTop: '0',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

// Styled container for the form page
const FormContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 80vh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function CertificateForm({ setCertificateData }) {
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
    setFormData({ ...formData, [name]: value });

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
    <FormContainer justifyContent="center" alignItems="center">
      <Card>
        <Typography variant='h4' style={{ marginTop: '20px', textAlign: 'center' }} gutterBottom>
          Certificate Generator
        </Typography>
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
            inputProps={{ maxLength: 12 }}
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
      </Card>
    </FormContainer>
  );
}

export default CertificateForm;
