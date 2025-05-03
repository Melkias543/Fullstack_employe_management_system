import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeLogin() {
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1234/employee/get_Employe",
        employee
      );
      console.log("empl login",res);
      //.loginStatus
      if (res.data.loginStatus) {
        // console.log(res.data.result.id);
        navigate(`/detail_Employe/${res?.data?.result[0].id}`);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.err);
    }
  };
  return (
    <div className="d-flex  w-100 justify-content-center align-items-center vh-100 gap-3 bg-light ">
      <div className="rounded justify-content-center align-items-center  w-50 border  flex-column   p-3 ">
        <h2 className="d-flex align-items-center justify-content-center   ">
          Login Page
        </h2>
        <form
          action=""
          className="d-flex flex-column justify-content-center align-items-center "
          onSubmit={handleSubmit}
        >
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
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
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
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>

          <br />
          {error && <span className=" text-center text-danger ">{error}</span>}

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

export default EmployeLogin;
