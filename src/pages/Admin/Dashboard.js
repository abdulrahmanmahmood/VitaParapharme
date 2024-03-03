

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { FaEdit, FaEye ,FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from './Actions/DeleteDialog';
import './dashboard.css';


const Dashboard = () => {
    const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const handleAddButtonClick = () => {
    navigate('/admin/add');
  };

  const handleEditButtonClick = () => {
    navigate('/admin/edit');
    
  };

  const handledetailsButtonClick = () => {
      navigate('/admin/details');
    };

    const handleDeleteClick = (admin) => {
      setAdminToDelete(admin);
      setDeleteConfirmationOpen(true);
    };

    const handleCancelDelete = () => {
      setAdminToDelete(null);
      setDeleteConfirmationOpen(false);
    };

    const handleConfirmDelete = () => {
      if (adminToDelete) {
       
        axios
          .delete(`https://mostafaben.bsite.net/api/Admins/${adminToDelete.id}`)
          .then((res) => {
            console.log('Admin deleted successfully:', res.data);
           
            getAdmins();
          })
          .catch((error) => {
            console.error('Error deleting admin:', error);
          });
  
        setAdminToDelete(null);
        setDeleteConfirmationOpen(false);
      }
    };
  

  useEffect(() => {
    getAdmins();
  }, []);

  const getAdmins = () => {
    axios.get('https://mostafaben.bsite.net/api/Admins')
      .then(res => {
        setAdmins(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
      });
  };


  return (
    <div className="container">
      <div className="card-table">
        <div className="card-header">
          <h4>
            Admins
            <div className='addadmin' onClick={handleAddButtonClick} >
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
                <th>Email</th>
                <th>password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.password}</td>
                    <td>
                            
                          
                          <button className="action-button edit-button">
                          <Link to={`/admin/edit/${admin.id}`}>
                          <FaEdit size={20} color="green"/> 
                          </Link>
                      
                           </button>

                           
                          <button onClick={() => handleDeleteClick(admin)} className="action-button edit-button">
                              <FaTrash size={20} color="red"/> 
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

export default Dashboard;
