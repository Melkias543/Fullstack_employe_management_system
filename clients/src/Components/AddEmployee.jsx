import React, { useEffect, useState } from "react";
import Category from "./Category";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
///saf 8586 2966 3402 1129 //ethio 6648 7227 2238 77
function AddEmployee() {
  const [employee, setEmployees] = useState({
    name: "",
    email: "",
    password: "",
    adress: "",
    category_id:null,
    salary: null,
    image: null,
  });


const [err,seterr]= useState("")

// console.log(employee.category_id);




const navigate= useNavigate()
// FormData= new FormData();
const handleSubmit=async(e)=>{

e.preventDefault();

  const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.adress);
    formData.append("category_id", employee.category_id);
    formData.append("salary", employee.salary);
  
    if (employee.image) {
      formData.append("image", employee.image);
    }

try {
  const res = await axios.post("http://localhost:4500/auth/add_employee", formData);
  console.log(res.data)
    console.log(res.data.err);
  if(res.data.status){
navigate("/dashboard/employee");
  }
} catch (error) {
  console.log("here",error)
  console.log(error.response.data.err)
   
seterr(error.response.data.err)

}
}



console.log(err)













  const [category, setCategory] = useState([]);
  useEffect(() => {
    CatagoryList();
  }, []);

  const CatagoryList = async () => {
    try {
      const res = await axios.get("http://localhost:4500/auth/catagory_list");
      console.log(res);
      if (res.data.status) {
        // console.log(res.data.result);
        setCategory(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(employee);
  return (
    <div className="d-flex  w-100 justify-content-center align-items-center vh-100 gap-3 bg-light ">
      <div className="rounded justify-content-center align-items-center  w-50 border  flex-column   p-3 ">
       
          <h2 className=" justify-content-center   ">Add Employee</h2>
       
        {err && <span className=" btn btn-danger h1">{err}</span>}
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="name">
              <strong>Emplyee Name:</strong>
            </label>
            <br />
            <input
              type="text"
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
                  setEmployees({ ...employee, password: e.target.value })
                }
              />
            </div>
      
          <div>
            <label htmlFor="adress">
              <strong>Adress:</strong>
            </label>
            <br />
            <input
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
                return <option value={data.id}>{data.cat_name}</option>;
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
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
