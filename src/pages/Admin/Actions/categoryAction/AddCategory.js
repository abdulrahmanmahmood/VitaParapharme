
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCatrgory] = useState({
    name: '',
    description: '',
  });

  const saveCategory = () => {
    
    axios.post('https://mostafaben.bsite.net/api/Categories', category)
      .then(res => {
      
        setCatrgory({
          name: '',
          description: '',
        });
       
        navigate('/categories');
  
      })
      .catch(error => {
        console.error('Error saving category:', error);
      });
  };


  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Add Categories</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={category.name}
              onChange={(e) => setCatrgory({ ...category, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              className="form-control"
              value={category.description}
              onChange={(e) => setCatrgory({ ...category, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <button type="button" onClick={saveCategory} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;