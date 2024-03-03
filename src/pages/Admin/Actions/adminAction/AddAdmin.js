import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    password: '',
  });

  const saveStudent = () => {
    axios.post('https://mostafaben.bsite.net/api/Admins', student)
      .then(res => {
        setStudent({
          name: '',
          email: '',
          password: '',
        });
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error saving student:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Add Admins</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="form-control"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="text"
              className="form-control"
              value={student.password}
              onChange={(e) => setStudent({ ...student, password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <button type="button" onClick={saveStudent} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;

