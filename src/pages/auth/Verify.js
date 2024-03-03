// Verify.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Verify() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();

    // Make API request to verify the token
    try {
      const response = await fetch('https://mostafaben.bsite.net/api/Users/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        // Verification successful, navigate to the dashboard
        navigate('/dashboard');
      } else {
        // Handle error scenarios if needed
        console.error('Verification failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during verification:', error);
    }
  };

  return (
    <div className="reset-password">
      <p>Enter code to verify your account</p>
      <form onSubmit={handleVerification}>
        <div className="form-group">
          <label>
            Verification Code<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="f"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button style={{ backgroundColor: "#5AC3B0" }} type="submit" className="resetbtn">
          Verify and Move to Dashboard
        </button>
      </form>
    </div>
  );
}

export default Verify;
