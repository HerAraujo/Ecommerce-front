import "./App.css";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import Product from "./pages/Product/Product";
import Thanks from "./pages/Thanks/Thanks";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/PrivateRoute";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { Link } from "react-router-dom";

function App() {
  const location = useLocation();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <div className="App d-flex flex-column h-100">
      <Link to="/about">
        <button class="btn-about bg-white ">About this project</button>
      </Link>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/reset-password" && <Navbar />}

      <>
        <Modal backdrop="static" show={show} onHide={handleClose}>
          <Modal.Header className="d-flex justify-content-center">
            <Modal.Title className="navbar-brand fw-bold modalTitle">CRAFTERS</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please, confirm you're over 18 to continue looking for your beer</Modal.Body>
          <Modal.Footer>
            <Button className="modalColor">No</Button>
            <Button variant="success" onClick={handleClose}>
              Yes, I am
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
        <Route path="/about" element={<About />} />
        <Route path="/thanks" element={<PrivateRoute element={<Thanks />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/reset-password" && <Footer />}
    </div>
  );
}

export default App;
