import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import UserDb from "./pages/UserDb";
import NewProduct from "./components/NewProduct";
import ShopDb from "./pages/ShopDb";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Review from "./components/Review";
import Orders from "./components/Orders";
import OrderHistory from "./components/OrderHistory";
import EditProduct from "./components/EditProduct";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
      <ToastContainer
        position="top-center"
        // autoClose={3000}
        // margin={200}
        // hideProgressBar={true}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
      />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="userdb" element={<UserDb />} />
            <Route path="shopdb" element={<ShopDb />} />
            <Route path="newProduct" element={<NewProduct />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<OrderHistory />} />
            <Route path="review/:userId/:productId" element={<Review />} />
            <Route path="editProduct/:id" element={<EditProduct />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
