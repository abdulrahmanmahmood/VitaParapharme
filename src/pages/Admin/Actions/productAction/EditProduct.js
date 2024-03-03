import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditProduct = ({ match, history }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({
    Title: '',
    Descreption: '',
    Price: '',
    Rate: '',
    Poster: null,
    CategoryId: '',
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, Poster: file });
  };


  const updateProduct = () => {
    axios
      .put(`https://mostafaben.bsite.net/api/Products/${params.productId}`, {
        Title : product.Title,
        Price : product.Price,
        Rate : product.Rate,
        Poster : product.Poster,
        CategoryId : product.CategoryId
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('product updated successfully:', res.data);
        navigate('/product');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Edit product</h4>
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
            <label htmlFor="name">Title</label>
            <input
              value={product.Title}
              onChange={(e) => setProduct({ ...product, Title: e.target.value })}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
    
         

          <div className="mb-3">
            <label htmlFor="Price">Price</label>
            <input
              value={product.Price}
              onChange={(e) => setProduct({ ...product, Price: e.target.value })}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="rate">Rate</label>
            <input
              value={product.Rate}
              onChange={(e) => setProduct({ ...product, Rate: e.target.value })}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="CategoryId">CategoryId</label>
            <input
              value={product.CategoryId}
              onChange={(e) => setProduct({ ...product, CategoryId: e.target.value })}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          
          <div className="mb-3">
            <button type="button" onClick={updateProduct} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
