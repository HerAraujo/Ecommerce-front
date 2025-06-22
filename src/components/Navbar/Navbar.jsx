import { useState, useEffect } from "react";
import "./Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

function NavbarMenu() {
  const userStore = useSelector((state) => state.user);
  const cartStore = useSelector((state) => state.cart);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [categories, setCategories] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/categories`,
        });

        setCategories(response.data);
      } catch (err) {
        err.response.status === 404 && navigate("../*");
      }
    };

    getCategories();
  }, []);

  const handleClick = () => {
    dispatch({
      type: "LOGOUT",
      payload: "",
    });

    navigate("/");
  };

  useEffect(() => {
    let totalQuantity = 0;
    cartStore.map((item) => {
      let quantity = item.quantity;
      return (totalQuantity = totalQuantity + quantity);
    });
    setTotalQuantity(totalQuantity);
  }, [cartStore]);
  return (
    <>
      <Navbar id="navbar" className="navbar navbar-expand-lg" expand="lg">
        <Container>
          <Link className="navbar-brand fw-bold" id="navbar-brand" to="/">
            CRAFTERS
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-start">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>

              <NavDropdown className="dropMenu" title="Categories" id="basic-nav-dropdown">
                {categories &&
                  categories.map((category) => (
                    <>
                      <Link
                        key={category.id}
                        className="nav-link text-start p-0 d-flex justify-content-around"
                        to={`/category/${category.slug}`}
                      >
                        <span className="navbar-dd-span">{category.name}</span>
                        <SportsBarIcon fontSize="small" />
                      </Link>
                      <NavDropdown.Divider />
                    </>
                  ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Link to="/cart">
            <button id="navbar-cart" className="btn btn-navbar" type="submit">
              <ShoppingCartIcon className="cart-icon"></ShoppingCartIcon>
              <span className="badge ms-1 navbar-badge">{totalQuantity}</span>
            </button>
          </Link>

          {!userStore && (
            <Link to={"/login"}>
              <button id="navbar-login" className="btn btn-navbar" type="submit">
                <LoginIcon className="login-icon"></LoginIcon>
                <span className="badge ms-1 navbar-badge">Login</span>
              </button>
            </Link>
          )}

          {userStore && (
            <button id="navbar-logout" className="btn btn-navbar ms-3" onClick={handleClick}>
              <LogoutIcon className="logout-icon"></LogoutIcon>
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMenu;
