import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
 
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4500/auth/getAdmin", values)
      .then((res) => {
        console.log(res);

        if (res.data.loginStatus) {
          navigate("/");
        } else {
          setError(res.data.msg);
        }
      })
      .catch((err) => {
        setError("Something went wrong!");
        console.log(err);
      });
  };

  // console.log(error);
  return (
    <div className="d-flex  w-100 justify-content-center align-items-center vh-100 gap-3 bg-light ">
      <div className="rounded justify-content-center align-items-center  w-50 border  flex-column   p-3 ">
        <h2 className=" justify-content-center   ">Login Page</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-conrol p-1 rounded-0 "
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="off"
              className="form-conrol p-1 rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <input type="checkbox" name="" id="" />
          <span>Do you agree whith our terms </span>
          <br />
          {error && <span className=" text-center text-danger ">{error}</span>}
          <br />
          <button
            type="submit"
            className="btn btn-success rounded-2 w-25 p-2 mt-3   justify-content-center"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
