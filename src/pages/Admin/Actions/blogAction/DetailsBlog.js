import { useEffect, useState } from "react";
import myImg from '../../../../images/pharmacy2.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function DetailsBlog() {

  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, Poster: file });
  };

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    axios
      .get(`https://mostafaben.bsite.net/api/Blogs/${params.blogId}`)
      .then((res) => {
        setBlog(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

 return(
    <div className="product-details-container">
    <div className="product-image">
    {blog.poster && (
  <img
    src={`data:image/png;base64,${blog.poster}`}
    alt="blog poster"
   
    onError={(e) => console.error('Error loading image:', e)}
  />)}

    </div>
    <div className="product-info">
    <h2>{blog.title}</h2>
    <h2>{blog.descreption}</h2>
    </div>
  </div>
 )
}

export default DetailsBlog;