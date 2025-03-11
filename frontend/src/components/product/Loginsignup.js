import React, { useState } from 'react';
import axios from 'axios';

export default function Loginsignup () {

  console.log("ok")
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signUp', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  return (
    <div className='row'>
      <div className='col-4'>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">SignIn</button>
        </form>
      </div>
      
      <div className='col-4'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="rePwd" name="rePwd" placeholder="Re-enter Password" value={formData.rePwd} onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

// export default Loginsignup;
