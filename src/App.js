/*import './App.css';*/
import SignUpForm from "./pages/auth/SignUpForm";
import Sign from "./pages/auth/Sign";
import {Routes, Route , Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import Category from "./pages/Admin/Category";
import Products from "./pages/Admin/Products";
import EditAdmin from "./pages/Admin/Actions/adminAction/EditAdmin";
import AddAdmin from "./pages/Admin/Actions/adminAction/AddAdmin";
import DetailsAdmin from "./pages/Admin/Actions/adminAction/DetailsAdmin";
import AddCategory from "./pages/Admin/Actions/categoryAction/AddCategory";
import EditCategory from "./pages/Admin/Actions/categoryAction/EditCategory";
import AddProduct from "./pages/Admin/Actions/productAction/AddProduct";
import EditProduct from "./pages/Admin/Actions/productAction/EditProduct";
import DetailsProduct from "./pages/Admin/Actions/productAction/DetailsProduct";
import DetailsCategory from "./pages/Admin/Actions/categoryAction/DetailsCategory";
import Home from "./pages/home";
import ForgetPassword from "./pages/auth/forgetPassword";
import ProductDetails from "./pages/products/ProductDetails";
import Store from "./pages/Store";
import About from "./pages/About";
import Brand from "./pages/brand";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Cart from "./pages/products/Cart";
import WishList from "./pages/WishList";
import ConfirmOrder from "./pages/products/ConfirmOrder";
import BlogAdmin from "./pages/Admin/Blogs";
import AddBlog from "./pages/Admin/Actions/blogAction/AddBlog";
import DetailsBlog from "./pages/Admin/Actions/blogAction/DetailsBlog";
import EditBlog from "./pages/Admin/Actions/blogAction/EditBlog";
import MyOrders from "./pages/MyOrders";
import ProfileInfo from "./pages/ProfileInfo";
import ChangePassword from "./pages/ChangePassword";
import BlogDetails from "./pages/BlogDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Notification from "./pages/Notification";
import { useSelector } from "react-redux";

function App() {
  const direction = useSelector((state) => state.translation.direction);
  return (
    <div className={`flexLanguage ${direction === 'rtl' ? 'rtl' : 'ltr'} App`}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/store" element={<Store />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:blogId" element={<BlogDetails />} />
      <Route path="/order" element={<MyOrders />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/profile" element={<ProfileInfo />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/order/confirm" element={<ConfirmOrder/>} />
      <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/notification" element={<Notification />} />
      <Route
          path="/home/product/:productId"
          element={<ProductDetails /> }  />
      
     
      <Route path="/authentication" element={<Sign />} />
      <Route path="/authentication/forget-password" element={< ForgetPassword/>} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/admin/edit/:adminId"
          element={
            <Sidebar>
              <EditAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/admin/add"
          element={
            <Sidebar>
              <AddAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/admin/details/:adminId"
          element={
            <Sidebar>
              <DetailsAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Dashboard />
            </Sidebar>
          }
        />
        <Route
          path="/categories"
          element={
            <Sidebar>
              <Category />
            </Sidebar>
          }
        />
        <Route
          path="/category/add"
          element={
            <Sidebar>
              <AddCategory />
            </Sidebar>
          }
        />
        <Route
          path="/category/edit/:CategoryId"
          element={
            <Sidebar>
              <EditCategory />
            </Sidebar>
          }
        />
        <Route
          path="/category/details"
          element={
            <Sidebar>
              <DetailsCategory />
            </Sidebar>
          }
        />
        <Route
          path="/product"
          element={
            <Sidebar>
              <Products />
            </Sidebar>
          }
        />
        <Route
          path="/product/add"
          element={
            <Sidebar>
              <AddProduct />
            </Sidebar>
          }
        />
        <Route
          path="/product/edit/:productId"
          element={
            <Sidebar>
              <EditProduct />
            </Sidebar>
          }
        />
        <Route
          path="/product/details/:productId"
          element={
            <Sidebar>
              <DetailsProduct />
            </Sidebar>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <Sidebar>
              <BlogAdmin />
            </Sidebar>
          }
        />
        <Route
          path="/blog/add"
          element={
            <Sidebar>
              <AddBlog />
            </Sidebar>
          }
        />
        <Route
          path="/blog/details/:blogId"
          element={
            <Sidebar>
              <DetailsBlog />
            </Sidebar>
          }
        />
        <Route
          path="/blog/edit/:blogId"
          element={
            <Sidebar>
              <EditBlog />
            </Sidebar>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
