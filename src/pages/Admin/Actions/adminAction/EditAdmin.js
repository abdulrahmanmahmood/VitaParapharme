import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditAdmin = ({ match, history }) => {
  const navigate = useNavigate();
  const params = useParams();
  const {id} = useParams();
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
  });



  const updateStudent = () => {
    axios
      .put(`https://mostafaben.bsite.net/api/Admins/${params.adminId}`, {
        name: admin.name,
        email: admin.email,
        password: admin.password,
      })
      .then((res) => {
        console.log('Student updated successfully:', res.data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error updating admin:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Edit Admin</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              value={admin.name}
              onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
    
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              type="text"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">password</label>
            <input
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              type="text"
              className="form-control"
              id="password"
            />
          </div>
          <div className="mb-3">
            <button type="button" onClick={updateStudent} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;

