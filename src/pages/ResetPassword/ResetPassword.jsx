import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");
  const [apiStatus, setApiStatus] = React.useState();

  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      await axios({
        url: `${process.env.REACT_APP_API_URL}/users`,
        method: "PATCH",
        data: {
          email,
          password,
          newPassword,
        },
      });

      navigate("/login");
    } catch (err) {
      setApiStatus(err.response.status);
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
                  <h2 className="fw-bold mb-4 text-center">Register</h2>
                  <form onSubmit={(ev) => handleSubmit(ev)}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                      />
                      {apiStatus === 409 && (
                        <h4 className="text-danger fw-bold mt-1 small">Wrong email or password.</h4>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                      />
                      {apiStatus === 409 && (
                        <h4 className="text-danger fw-bold mt-1 small">Wrong email or password.</h4>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="newPassword">
                        New password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control"
                        value={newPassword}
                        onChange={(ev) => setnewPassword(ev.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-register btn-block mb-4">
                      Change password
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src="./assets/login.jpg" className="w-100 rounded-4 shadow-4" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
