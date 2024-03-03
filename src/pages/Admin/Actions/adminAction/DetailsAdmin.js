import React from 'react';
import { useNavigate } from 'react-router-dom';
import './actionAdmin.css';

function DetailsAdmin() {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
      navigate('/dashboard');
    };

  return (
    <div className="containerEdit">
  <div className="card-action">
    
    <div className="card-body">
    <div className="profile-details-container">
      <div className="profile-info">
        <h2>safa</h2>
        <p>Email: safa@gmail.com</p>
        <p>phone :011111111111111111</p>
      </div>
    </div>
      <div className="">
        <div className="">
          <button type="button" className="btn btn-primary" onClick={handleBackButtonClick}>
            back
          </button>
        </div>
      </div>
    </div>
  </div>

</div>

  );
}

export default DetailsAdmin;
