import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import DeleteDialog from './Actions/DeleteDialog';
import './dashboard.css';


const Category = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleAddCatClick = () => {
    navigate('/category/add');
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      axios
        .delete(`https://mostafaben.bsite.net/api/Categories/${categoryToDelete.id}`)
        .then((res) => {
          console.log('Category deleted successfully:', res.data);
          getCategories(); 
        })
        .catch((error) => {
          console.error('Error deleting category:', error);
        });

      setCategoryToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get('https://mostafaben.bsite.net/api/Categories')
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

 

  return (
    <div className="container">
      <div className="card-table">
        <div className="card-header">
          <h4>
            Categories
            <div className='addadmin' onClick={handleAddCatClick}>
              <FaPlus size={30} color="green" style={{ marginRight: '5px' }} />
            </div>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
         
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      
                      <button className="action-button edit-button">
                        <Link to={`/category/edit/${category.id}`}>
                          <FaEdit size={20} color="green" />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
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

export default Category;

