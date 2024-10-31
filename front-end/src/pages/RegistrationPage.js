import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { TextField, Button, Container, Typography } from '@mui/material';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role_id: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegistrationPage;
