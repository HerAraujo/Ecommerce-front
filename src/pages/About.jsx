import React, { useState } from "react";
import "./About.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

function About() {
  const [apiStatus, setApiStatus] = useState();
  const [reset, setReset] = useState(false);

  const handleClick = async () => {
    setReset(true);

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/resets/all`,
      });
      setApiStatus(response.status);
      setReset(false);
    } catch (err) {
      setApiStatus(err.response.status);
      setReset(false);
    }

    apiStatus === 200 &&
      toast.success("Successful reset", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "success",
      });

    apiStatus > 400 &&
      toast.error("An error has ocurred", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  return (
    <>
      <div className=" mb-4 team-cards">
        <h1 className="mb-5">Our Team</h1>
        <div className="d-md-flex flex-md-row">
          <div className="col">
            <img
              className="img-rounded"
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
              src={`${process.env.REACT_APP_BUCKET_URL}/german-profile.png`}
              alt="Germán Araújo"
            />
            <p className="fs-4 fw-bold mb-0">Germán Araújo</p>
            <p className="fs-6">Full Stack Developer</p>
            <a href="https://www.linkedin.com/in/german-araujo95/" target="_blank" rel="noreferrer">
              <i class="fa-brands fa-linkedin icon-size me-3"></i>
            </a>
            <a href="https://github.com/Geraraujo" target="_blank" rel="noreferrer">
              <i class="fa-brands fa-github icon-size"></i>
            </a>
          </div>
          <div className="col">
            <img
              className="img-rounded"
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
              src={`${process.env.REACT_APP_BUCKET_URL}/stephanie-profile.png`}
              alt="Stephanie Esquire"
            />
            <p className="fs-4 fw-bold mb-0">Stephanie Esquire</p>
            <p className="fs-6">Full Stack Developer</p>
            <a
              href="https://www.linkedin.com/in/stephanieesquire/"
              target="_blank"
              rel="noreferrer"
            >
              <i class="fa-brands fa-linkedin icon-size me-3"></i>
            </a>
            <a href="https://github.com/stephanieesquire" target="_blank" rel="noreferrer">
              <i class="fa-brands fa-github icon-size"></i>
            </a>
          </div>
          <div className="col">
            <img
              className="img-rounded"
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
              src={`${process.env.REACT_APP_BUCKET_URL}/hernan-profile.jpg`}
              alt="Hernán Araújo"
            />
            <p className="fs-4 fw-bold mb-0">Hernán Araújo</p>
            <p className="fs-6">Full Stack Developer</p>
            <a href="https://www.linkedin.com/in/hernan-araujo99/" target="_blank" rel="noreferrer">
              <i class="fa-brands fa-linkedin icon-size me-3"></i>
            </a>
            <a href="https://github.com/HerAraujo" target="_blank" rel="noreferrer">
              <i class="fa-brands fa-github icon-size"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="container ">
        <hr />
        <h2 className="fw-bold">About this project</h2>
        <p className="about-text">
          This project was performed with the target of fulfilling all the requirements of the final
          project of the Hack Academy 2022 Coding Bootcamp, which consisted in the creation of an
          E-commerce, in a period of time of three weeks.
          <p>
            In this project we built the back end to use our own API and database, that are deployed
            in Supabase and Vercel.
            <p>
              We always managed hashed passwords, using the Bcrypt library, and took all security
              measures to prevent hacking attacks both in the front end and in the back end.
              <p>
                The development methodology that we used was Scrum, using Trello to divide tasks.
              </p>
            </p>
          </p>
        </p>

        <p>
          We used Bootstrap templates as the basis of the project, and the technologies applied
          were:
        </p>
        <div className="d-flex flex-row justify-content-center">
          <ul className="ul-list">
            <li>
              {" "}
              <img src="https://img.icons8.com/windows/30/000000/node-js.png" alt="Node logo" />
            </li>
            <li>
              {" "}
              <img
                src="https://img.icons8.com/external-tal-revivo-light-tal-revivo/24/000000/external-mysql-an-open-source-relational-database-management-system-logo-light-tal-revivo.png"
                alt="MySQL logo"
              />
            </li>
            <li>
              <svg
                className="text-dark fs-4 "
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                role="img"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title></title>
                <path d="M12.0264 0 1.5947 5.9922v12.0156L12.0264 24l10.3789-5.9922V5.9922L12.0264 0zm-.0274 3.4844 7.4297 4.2266v8.5781l-7.4297 4.2266-7.3476-4.1817-.0801-8.623 7.4277-4.2266zm.0489.5898c-.9765.5627-1.9519 1.1274-2.9277 1.6914v.2539l2.6074 1.5234v.4824c.1355-.0781.2616-.1511.4023-.2324l.2559.1504v-.3359c.8844-.5068 1.8073-1.0412 2.5684-1.4805.0035-.1232.0027-.2534.0039-.373-.9703-.5596-1.9403-1.1197-2.9102-1.6797zM8.335 6.1387c-.9705.553-1.9312 1.1228-2.8926 1.6914v3.4023c.965.5553 1.9287 1.1127 2.8926 1.6699l.4023-.2324v-2.916c.8561-.4945 1.7522-1.0126 2.4902-1.4395v-.4843L8.335 6.1387zm7.4433.0879-2.8926 1.6699v.3379l2.6367 1.541v3.0664c.0854.0494.1705.0991.2559.1484l2.8926-1.6699V7.918l-2.8926-1.6914zm-3.6484 2.1445c-.9636.5584-1.9281 1.1151-2.8926 1.6719v3.4238c.965.5553 1.9287 1.1127 2.8926 1.6699l2.8926-1.6719v-3.4023l-2.8926-1.6914zm-6.1973 3.7227c-.1627.0962-.3275.1889-.4902.2852v3.4023c.9643.5571 1.9284 1.1145 2.8926 1.6719l.4023-.2324v-2.918c.1625-.0939.3086-.1787.4727-.2734-.1629-.0945-.3047-.1763-.4727-.2734v-.508l-.4023.2325c-.8251-.4771-1.6902-.976-2.4024-1.3867zm12.2481.0859-2.4023 1.3887c-.088-.0509-.1672-.0972-.2559-.1484v.334l-.4922.2852.4922.2871v3.0664c.0854.0494.1705.0991.2559.1484l2.8926-1.6719v-3.4023l-.4903-.2872zm-8.4688 2.1387c-.1581.0913-.3165.1821-.4746.2734v3.4238c.9637.5575 1.9282 1.1136 2.8926 1.6699l2.8926-1.6699v-3.4023l-.4902-.2871-2.4023 1.3887c-.8307-.4804-1.7013-.9829-2.4181-1.3965z"></path>
              </svg>
            </li>
            <li>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/react.png" alt="React logo" />
            </li>
            <li>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/000000/triangle.png"
                alt="Vercel logo"
              />
            </li>
            <li>
              <img
                src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-thunder-weather-kmg-design-glyph-kmg-design.png"
                alt="Supabase logo"
              />
            </li>
          </ul>

          <ul className="ul-list">
            <li className="pb-1 node">Node Js</li>
            <li className="pb-1 mysql">MySQL</li>
            <li className="pb-1 ms-2">Sequelize</li>
            <li className="pb-1">React Js</li>
            <li className="pb-1 vercel">Vercel</li>
            <li className="pb-1 ms-2">Supabase</li>
          </ul>
        </div>

        <p className="about-text mt-5">
          In addition to having created the sections within the site, we implemented a{" "}
          <a href="https://crafters-admin.vercel.app/" target="_blank" rel="noreferrer">
            dashboard
          </a>{" "}
          where it is possible to perform administrator actions. <link></link>
        </p>

        <p className="fw-bold mt-3">Use these credentials to login:</p>

        <div className="row">
          <div className="col">
            <h4>Login:</h4>
            <ul className="ul-list">
              <li>E-mail: user@gmail.com</li>
              <li>Password: user</li>
            </ul>
          </div>
          <div className="col">
            <h4>Admin page:</h4>
            <ul className="ul-list">
              <li>E-mail: admin@gmail.com</li>
              <li>Password: admin</li>
              <a href="https://crafters-admin.vercel.app/" target="_blank" rel="noreferrer">
                Go to admin website
              </a>{" "}
            </ul>
          </div>
        </div>

        <div>
          {!reset && (
            <>
              <p className="fw-bold mt-2">To reset database:</p>
              <button type="submit" className="btn btn-reset mb-3" onClick={() => handleClick()}>
                Reset
              </button>
            </>
          )}

          {reset && (
            <>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading</span>
              </Spinner>
            </>
          )}
        </div>

        <hr className="mb-0" />
      </div>
    </>
  );
}

export default About;
