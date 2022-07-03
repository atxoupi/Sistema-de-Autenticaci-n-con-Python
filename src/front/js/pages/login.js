import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const { store, actions } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password1) {
      actions.login(email, password);
    } else alert("Passwords do not match");
  };

  return (
    <>
      {store.auth === true ? (
        <Navigate to="/demo" />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="exampleInputPassword2" className="form-label">
              Retype-Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/signup" className="btn btn-primary">
              SignUp
            </Link>
          </div>
        </form>
      )}
    </>
  );
};
