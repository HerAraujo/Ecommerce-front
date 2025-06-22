import { useEffect } from "react";
import "./Checkout.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { brown } from "@mui/material/colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "react-bootstrap";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Checkout() {
  const [firstname, setFirstname] = useState("Firstname");
  const [lastname, setLastname] = useState("Lastname");
  const [email, setEmail] = useState("example@gmail.com");
  const [city, setCity] = useState("Example city");
  const [street, setStreet] = useState("Example street");
  const [portNumber, setPortNumber] = useState("1122");
  const [apartamentNumber, setApartamentNumber] = useState("1");
  const [cardName, setCardName] = useState("Example card name");
  const [cardNumber, setCardNumber] = useState("1112 1112 2232");
  const [expirationDate, setExpirationDate] = useState("12/12/2025");
  const [cvv, setCvv] = useState("123");

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const store = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(store.cart);
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/orders`,
        headers: {
          Authorization: `Bearer ${store.user.token}`,
        },
        data: {
          products: store.cart,
          address: {
            city,
            street,
            portNumber,
            apartamentNumber,
          },
        },
      });

      setSuccess(true);

      setLoading(false);

      dispatch({ type: "REMOVE_ALL_ITEMS" });
      setTimeout(() => {
        navigate("/thanks");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let totalPrice = 0;
    store.cart.map((item) => {
      let price = item.price * item.quantity;
      return (totalPrice = totalPrice + price);
    });
    return setTotal(totalPrice);
  }, [store.cart]);
  if (success) {
    return (
      <div className="h-100 align-items-center d-flex justify-content-center">
        <div>
          <CheckCircleOutlineIcon className="fs-1" />
          <p className="fs-1">Successful purchase</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {!loading && (
        <main>
          <div className="container py-4 text-start">
            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="">Your cart</span>
                </h4>
                <ul id="cart-list" className="list-group mb-3">
                  {store.cart &&
                    store.cart.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between lh-condensed"
                      >
                        <div>
                          <h6 className="my-0">{item.name}</h6>
                          <small className="">x{item.quantity}</small>
                        </div>
                        <span className="">U$S {item.price}</span>
                      </li>
                    ))}

                  <li className="list-group-item d-flex justify-content-between">
                    <strong className="fs-5">Total</strong>
                    <strong>U$S {total.toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Billing address</h4>
                <hr className="mt-4 mb-4" />
                <form onSubmit={onSubmit} className="needs-validation">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">First name</label>
                      <input
                        onChange={(event) => setFirstname(event.target.value)}
                        value={firstname}
                        type="text"
                        className="form-control"
                        id="firstName"
                        required
                      />
                      <div className="invalid-feedback">Valid first name is required.</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Last name</label>
                      <input
                        onChange={(event) => setLastname(event.target.value)}
                        value={lastname}
                        type="text"
                        className="form-control"
                        id="lastName"
                        required
                      />
                      <div className="invalid-feedback">Valid last name is required.</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                      type="email"
                      className="form-control"
                      id="email"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="city">City</label>
                      <input
                        onChange={(event) => setCity(event.target.value)}
                        value={city}
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">Please enter your city.</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="street">Street</label>
                      <input
                        onChange={(event) => setStreet(event.target.value)}
                        value={street}
                        type="text"
                        className="form-control"
                        id="street"
                        required
                      />
                      <div className="invalid-feedback">Please enter your street.</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="portNumber">Port number</label>
                      <input
                        onChange={(event) => setPortNumber(event.target.value)}
                        value={portNumber}
                        type="number"
                        min={0}
                        className="form-control"
                        id="portNumber"
                        required
                      />
                      <div className="invalid-feedback">Please enter your port number.</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="apartamentNumber">Apartament number</label>
                      <input
                        onChange={(event) => setApartamentNumber(event.target.value)}
                        value={apartamentNumber}
                        type="number"
                        min={0}
                        className="form-control"
                        id="apartamentNumber"
                      />
                    </div>
                  </div>

                  <hr className="mt-4 mb-4" />

                  <div className="text-start mb-3">
                    <img src="../../assets/pm.svg" className="payment-logo" alt="" />
                  </div>
                  <h4>Payment</h4>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="credit"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="credit"
                        control={
                          <Radio
                            {...controlProps("credit")}
                            sx={{
                              color: brown[800],
                              "&.Mui-checked": {
                                color: brown[600],
                              },
                            }}
                          />
                        }
                        label="Credit"
                      />
                      <FormControlLabel
                        value="debit"
                        control={
                          <Radio
                            {...controlProps("debit")}
                            sx={{
                              color: brown[800],
                              "&.Mui-checked": {
                                color: brown[600],
                              },
                            }}
                          />
                        }
                        label="Debit"
                      />
                      <FormControlLabel
                        value="paypal"
                        control={
                          <Radio
                            {...controlProps("paypal")}
                            sx={{
                              color: brown[800],
                              "&.Mui-checked": {
                                color: brown[600],
                              },
                            }}
                          />
                        }
                        label="PayPal"
                      />
                    </RadioGroup>
                  </FormControl>
                  <hr className="mt-4 mb-4" />
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-name">Name on card</label>
                      <input
                        onChange={(ev) => setCardName(ev.target.value)}
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder=""
                        value={cardName}
                        required
                      />

                      <div className="invalid-feedback">Name on card is required</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-number">Credit card number</label>
                      <input
                        onChange={(ev) => setCardNumber(ev.target.value)}
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder=""
                        value={cardNumber}
                        required
                      />
                      <div className="invalid-feedback">Credit card number is required</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-expiration">Expiration</label>
                      <input
                        onChange={(ev) => setExpirationDate(ev.target.value)}
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder=""
                        value={expirationDate}
                        required
                      />
                      <div className="invalid-feedback">Expiration date required</div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-cvv">CVV</label>
                      <input
                        type="text"
                        onChange={(ev) => setCvv(ev.target.value)}
                        className="form-control"
                        id="cc-cvv"
                        placeholder=""
                        value={cvv}
                        required
                      />
                      <div className="invalid-feedback">Security code required</div>
                    </div>
                  </div>

                  <button className="btn btn-confirm-purchase mt-3" type="submit">
                    Confirm purchase
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
      {loading && (
        <div className="h-100 align-items-center d-flex justify-content-center">
          <div>
            <Spinner animation="border" role="status" />
            <p>Processing payment</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
