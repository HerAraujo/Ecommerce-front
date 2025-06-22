import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/tokens`,
        method: "POST",
        data: {
          email: email,
          password: password,
        },
      });

      dispatch({
        type: "LOGIN",
        payload: response.data,
      });

      navigate("/");
    } catch (err) {
      err.response.status === 400 ? alert("Incorrect email or password") : alert(err.response);
    }
  };
  return (
    <>
      <section className="text-start text-lg-start">
        <link rel="stylesheet" href="./Login.css" />

        <div className="container">
          <div className="row g-0 align-items-center py-4">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div
                className="card cascading-right"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <div className="card-body p-5 shadow-5 ">
                  <h2 className="fw-bold mb-4 text-center">Login</h2>
                  <form onSubmit={(ev) => handleSubmit(ev)}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        className="form-control"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-login btn-block mb-4">
                      Login
                    </button>

                    <div className="text-center">
                      <ul id="register-reset" className="list-unstyled">
                        <li>
                          <Link className="text-decoration-none" to={"/register"}>
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link className="text-decoration-none" to={"/reset-password"}>
                            {" "}
                            Reset password
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 img-fluid">
              <img
                src="./assets/login.jpg"
                className="w-100 rounded-4 shadow-4 custom-login-image"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
