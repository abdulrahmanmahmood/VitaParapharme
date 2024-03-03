import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import DeleteDialog from './Actions/DeleteDialog';
import './dashboard.css';


const BlogAdmin = () => {

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const handleAddProClick = () => {
    navigate('/blog/add');
  };


  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setBlogToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDelete = () => {
    if (blogToDelete) {
      axios
        .delete(`https://mostafaben.bsite.net/api/Blogs/${blogToDelete.id}`)
        .then((res) => {
          console.log('blog deleted successfully:', res.data);
          getBlogs(); // Call getBlogs to update the table after deletion
        })
        .catch((error) => {
          console.error('Error deleting blog:', error);
        });

        setBlogToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    axios
      .get('https://mostafaben.bsite.net/api/Blogs')
      .then((res) => {
        setBlogs(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  };


  return (
    <div className="container">
      <div className="card-table">
        <div className="card-header">
          <h4>
          blogs
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
                <th>image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td>
                    {blog.poster && (
  
    
    <img
      src={`data:image/png;base64,${blog.poster}`}
      alt="blog image"
      style={{ maxWidth: '100px', maxHeight: '100px' }}
      onError={(e) => console.error('Error loading image:', e)}
    />
  
)}
</td>
                    
                    <td>{blog.title}</td>
                    <td >{blog.descreption}</td>
                    <td>
                      <button className="action-button edit-button">
                        <Link to={`/blog/details/${blog.id}`}>
                          <FaEye size={20} color="red" />
                        </Link>
                      </button>
                      <button className="action-button edit-button">
                        <Link to={`/blog/edit/${blog.id}`}>
                          <FaEdit size={20} color="green" />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(blog)}
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

export default BlogAdmin;