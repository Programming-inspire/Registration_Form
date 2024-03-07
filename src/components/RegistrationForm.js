import React, { useState } from 'react';
import './RegistrationForm.css'; 

const RegistrationForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    comment: '',
    gender: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      alert('Form submitted successfully! Refresh the Page');
      
      setFormData({
        name: '',
        country: '',
        comment: '',
        gender: '',
        terms: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit data');
    }
  };
  
  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="US">US</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label htmlFor="male">
              <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
              Male
            </label>
            <label htmlFor="female">
              <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} required />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
