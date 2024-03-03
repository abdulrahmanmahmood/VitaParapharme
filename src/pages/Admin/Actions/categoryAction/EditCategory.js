import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditCategory = ({ match, history }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });



  const updateCategory = () => {
    axios
      .put(`https://mostafaben.bsite.net/api/Categories/${params.CategoryId}`, {
        name: category.name,
        description: category.description,
      })
      .then((res) => {
        console.log('category updated successfully:', res.data);
        navigate('/categories');
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Edit category</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
    
          <div className="mb-3">
            <label htmlFor="email">Description</label>
            <input
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          
          <div className="mb-3">
            <button type="button" onClick={updateCategory} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
