import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import DeleteDialog from './Actions/DeleteDialog';
import './dashboard.css';


const Products = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddProClick = () => {
    navigate('/product/add');
  };

  const handleEditCatClick = () => {
    navigate('/product/edit');
  };

  const handledetailsCatClick = () => {
    navigate('/product/details');
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      axios
        .delete(`https://mostafaben.bsite.net/api/Products/${productToDelete.id}`)
        .then((res) => {
          console.log('product deleted successfully:', res.data);
          getProducts(); // Call getProducts to update the table after deletion
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });

      setProductToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get('https://mostafaben.bsite.net/api/Products')
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

 

  return (
    <div className="container">
      <div className="card-table">
        <div className="card-header">
          <h4>
            products
            <div className='addadmin' onClick={handleAddProClick}>
              <FaPlus size={30} color="green" style={{ marginRight: '5px' }} />
            </div>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
         
            <thead>
              <tr>
                <th>ID</th>
                <th>Poster</th>
                <th>Title</th>
                <th>Price</th>
                <th>Rate</th>
                <th>CategoryId</th>
                <th>description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                    {product.poster && (
  
    
    <img
      src={`data:image/png;base64,${product.poster}`}
      alt="Product poster"
      style={{ maxWidth: '100px', maxHeight: '100px' }}
      onError={(e) => console.error('Error loading image:', e)}
    />
  
)}
</td>
                    
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.rate}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.descreption}</td>

                    <td>
                      <button className="action-button edit-button">
                        <Link to={`/product/details/${product.id}`}>
                          <FaEye size={20} color="red" />
                        </Link>
                      </button>
                      <button className="action-button edit-button">
                        <Link to={`/product/edit/${product.id}`}>
                          <FaEdit size={20} color="green" />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="action-button edit-button"
                      >
                        <FaTrash size={20} color="red" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteDialog
        isOpen={deleteConfirmationOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      
    </div>
  );
};

export default Products;