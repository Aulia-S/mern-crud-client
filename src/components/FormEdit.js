import React, { useState, Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//api
import { getStuff, editStuff } from "../api/stuff";
// components
import showLoading from "./Loading";
import { showSuccessMsg, showErrorMsg } from "./Message";

const FormEdit = () => {
  /******************
   * STATE
   ******************/
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
  });

  const { name, price, qty } = formData;

  let history = useHistory();
  let { stuffId } = useParams();

  /******************
   * LIFECYCLE
   ******************/
  useEffect(() => {
    getStuff(stuffId)
      .then((res) => {
        setFormData(res.data.stuff);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stuffId]);

  /******************
   * EVENT HANDLER
   ******************/
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    editStuff(formData, stuffId)
      .then((res) => {
        setLoading(false);
        setSuccessMsg(res.data.successMessage);
        setFormData({
          ...formData,
          name: "",
          price: "",
          qty: "",
        });
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.response.data.errorMessage);
      });
  };

  const handleFormClick = (e) => {
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const handleClickClose = () => {
    history.push("/");
  };
  /******************
   * RENDER
   ******************/
  return (
    <div className="home min-vh-100 pt-5">
      <div className="modal-dialog mt-0">
        <div className="modal-content">
          <form onSubmit={handleFormSubmit} onClick={handleFormClick}>
            <div className="modal-header">
              <h5 className="modal-title fw-bold text-secondary">Edit Stuff</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClickClose}
              ></button>
            </div>
            <div className="modal-body text-start">
              {successMsg && showSuccessMsg(successMsg)}
              {errorMsg && showErrorMsg(errorMsg)}

              {loading ? (
                showLoading()
              ) : (
                <Fragment>
                  {/* name field input */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={handleFormChange}
                      value={name}
                    />
                  </div>
                  {/* price field input */}
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      onChange={handleFormChange}
                      value={price}
                    />
                  </div>
                  {/* quantity field input */}
                  <div className="mb-3">
                    <label htmlFor="qty" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="qty"
                      name="qty"
                      onChange={handleFormChange}
                      value={qty}
                    />
                  </div>
                </Fragment>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fw-bold"
                onClick={handleClickClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary fw-bold">
                Update!
              </button>
            </div>
            {/* {JSON.stringify(formData)} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEdit;
