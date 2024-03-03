import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    Title: '',
    Description: '',
    Poster: null,
  });

  const saveBlog = () => {
    const formData = new FormData();
    formData.append('Title', blog.Title);
    formData.append('Description', blog.Description);
    formData.append('Image', blog.Image);

    axios
      .post('https://mostafaben.bsite.net/api/Blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        navigate('/admin/blog');
        setBlog({
          Title: '',
          Description: '',
          Image: null,
        });
        
      })
      .catch((error) => {
        console.error('Error saving blog:', error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, Image: file });
  };


  return (
    <div className="container mt-5">
      <div className="card-action">
        <div className="card-header">
          <h4>Add blog</h4>
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
            <label htmlFor="Title">Title</label>
            <input
              id="Title"
              type="text"
              className="form-control"
              value={blog.Title}
              onChange={(e) => setBlog({ ...blog, Title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description">Description</label>
            <input
              id="Description"
              type="text"
              className="form-control"
              value={blog.Description}
              onChange={(e) => setBlog({ ...blog, Description: e.target.value })}
            />
          </div>
          
          <div className="mb-3">
            <button type="button" onClick={saveBlog} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
