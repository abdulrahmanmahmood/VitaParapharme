import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    Title: '',
    Descreption: '', // Change to match the backend DTO
    Price: '',
    Rate: '',
    Poster: null,
    CategoryId: '',
  });

  const saveProduct = () => {
    const formData = new FormData();
    formData.append('Title', product.Title);
    formData.append('Descreption', product.Descreption); // Change to match the backend model
    formData.append('Price', product.Price);
    formData.append('Rate', product.Rate);
    formData.append('Poster', product.Poster);
    formData.append('CategoryId', product.CategoryId);

    axios
      .post('https://mostafaben.bsite.net/api/Products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        navigate('/product');
        setProduct({
          Title: '',
          Descreption: '', // Change to match the backend DTO
          Price: '',
          Rate: '',
          Poster: null,
          CategoryId: '',
        });
      })
      .catch((error) => {
        console.error('Error saving product:', error);
      });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, Poster: file });
  };


  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Add Product</h4>
        </div>
        <div className="card-body">

        <div className="mb-3">
            <label htmlFor="Poster">Poster</label>
            <input
              id="Poster"
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Title">Title</label>
            <input
              id="Title"
              type="text"
              className="form-control"
              value={product.Title}
              onChange={(e) => setProduct({ ...product, Title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Descreption">Descreption</label>
            <input
              id="Descreption"
              type="text"
              className="form-control"
              value={product.Descreption}
              onChange={(e) => setProduct({ ...product, Descreption: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Price">Price</label>
            <input
              id="Price"
              type="text"
              className="form-control"
              value={product.Price}
              onChange={(e) => setProduct({ ...product, Price: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Rate">Rate</label>
            <input
              id="Rate"
              type="text"
              className="form-control"
              value={product.Rate}
              onChange={(e) => setProduct({ ...product, Rate: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="CategoryId">CategoryId</label>
            <input
              id="CategoryId"
              type="text"
              className="form-control"
              value={product.CategoryId}
              onChange={(e) => setProduct({ ...product, CategoryId: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <button type="button" onClick={saveProduct} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
