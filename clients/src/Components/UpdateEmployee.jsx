import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  const [employee, setEmployees] = useState({
    name: "",
    email: "",
    adress: "",
    category_id: null,
    salary: null,
    image: null,
  });

console.log("employe",employee);


  const [err, seterr] = useState("");
  const { id } = useParams();

  console.log("id", id);
  // console.log(employee.category_id);

  const navigate = useNavigate();
  // FormData= new FormData();
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);

    formData.append("address", employee.adress);
    formData.append("category_id", employee.category_id);
    formData.append("salary", employee.salary);

    if (employee.image) {
      formData.append("image", employee.image);
    }

    try {
      const res = await axios.put(
        `http://localhost:4500/auth/update/${id}`,
        formData
      );
      console.log(res.data);
      console.log(res.data.err);
      if (res.data.status) {
        navigate("/dashboard/employee");
      }
    } catch (error) {
      console.log("here", error);
      // console.log(error.response.data.err);

      // seterr(error.response.data.err);
    }
  };

  console.log(err);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    CatagoryList();
  }, []);

  const CatagoryList = async () => {
    try {
      const res = await axios.get("http://localhost:4500/auth/catagory_list");
      // console.log(res);
      if (res.data.status) {
        // console.log(res.data.result);
        setCategory(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [list, setList] = useState([]);
  // console.log("look",employee.id)
  useEffect(() => {
    handleEmploye();
  }, [id]);
  // console.log(list[0]?.name); // Using optional chaining to safely access name property
  // console.log(list);

  const handleEmploye = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4500/auth/get_employe/${id}`
      );
      setList(res.data.result);
      // setList(res.data.result);
      const data = res.data.result[0];
      console.log("data", data);
      setEmployees({
        name: data.name || "",
        email: data.email || "",
        adress: data.address || "",
        category_id: data.category_id || "",
        salary: data.salary || "",
        image: null,
      });

    } catch (error) {
      console.log("from getting by id", error);
    }
  };

  // console.log(employee);
  return (
    <div className="d-flex  w-100 justify-content-center align-items-center vh-100 gap-3 bg-light ">
      <div className="rounded justify-content-center align-items-center  w-50 border  flex-column   p-3 ">
        <h2 className=" justify-content-center   ">Update Employee</h2>

        {err && <span className=" btn btn-danger h1">{err}</span>}
        <form onSubmit={handleUpdate} action="">
          <div>
            <label htmlFor="name">
              <strong>Emplyee Name:</strong>
            </label>
            <br />
            <input
              type="text"
              value={employee.name}
              name="name"
              placeholder="Enter Name"
              className="form-conrol p-1 rounded-0 "
              onChange={(e) =>
                setEmployees({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <br />
            <input
              type="email"
              value={employee.email}
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-conrol p-1 rounded-0"
              onChange={(e) =>
                setEmployees({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="adress">
              <strong>Adress:</strong>
            </label>
            <br />
            <input
              value={employee.address}
              type="text"
              name="adress"
              placeholder="Enter Adress"
              className="form-conrol p-1 rounded-0"
              onChange={(e) =>
                setEmployees({ ...employee, adress: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="adress">
              <strong>Salary:</strong>
            </label>
            <br />
            <input
              type="text"
              value={employee.salary}
              name="salary"
              placeholder="Enter Salary"
              className="form-conrol p-1 rounded-0"
              onChange={(e) =>
                setEmployees({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="catagory">
              <strong>Category:</strong>
            </label>
            <br />
            <select
              onChange={(e) =>
                setEmployees({ ...employee, category_id: e.target.value })
              }
              className=" w-25"
              name=""
              id=""
            >
              {category.map((data, i) => {
                return (
                  <option key={i} value={data.id}>
                    {data.cat_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <br />
            <input
              type="file"
              name="image"
              id="inputGroupFile01"
              className="form-conrol p-1 rounded-0"
              onChange={(e) =>
                setEmployees({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-success rounded-2 w-25 p-2 mt-3   justify-content-center"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
