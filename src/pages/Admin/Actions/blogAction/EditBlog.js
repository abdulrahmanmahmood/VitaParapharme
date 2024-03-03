import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditBlog = ({ match, history }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState({
    Title: '',
    Description: '',
    Poster: null,
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, Image: file });
  };


  const updateBlog = () => {
    const formData = new FormData();
    formData.append('Title', blog.Title);
    formData.append('Description', blog.Description);
    formData.append('Image', blog.Image);
  
    axios
      .put(`https://mostafaben.bsite.net/api/Blogs/${params.blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('blog updated successfully:', res.data);
        navigate('/admin/blog');
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
      });
  };
  

  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Edit blog</h4>
        </div>
        <div className="card-body">

        <div className="mb-3">
            <label htmlFor="Image">Image</label>
            
            <input
              id="Image"
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name">Title</label>
            <input
              value={blog.Title}
              onChange={(e) => setBlog({ ...blog, Title: e.target.value })}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">Description</label>
            <input
              value={blog.Description}
              onChange={(e) => setBlog({ ...blog, Description: e.target.value })}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          
          
          
          <div className="mb-3">
            <button type="button" onClick={updateBlog} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
