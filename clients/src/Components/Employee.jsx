import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,  useParams } from "react-router-dom";

function Employee() {
  const [employee, setEmployee] = useState([]);
 
console.log("look",employee.id)
  useEffect(() => {
    handleEmploye();
  }, []);

  const handleEmploye = async () => {
    try {
      const res = await axios.get("http://localhost:4500/auth/get_Employee");

      console.log(res);
      console.log(res.data.result);
      setEmployee(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };




const handleDelete=async(id)=>{
  // const {id}=useParams()
  console.log(id) 
  
  try {
    
const res= await axios.delete(`http://localhost:4500/auth/delete_employe/${id}`);
// console.log(res)
alert(res.data.msg)

  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className="px-5 mt-3 ">
      <div className="d-flex justify-content-center ">
        <h3>Employee Lists</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div>
        <table className="table">
          <thead>
            <tr>
              
              <td>
                <strong>Name</strong>
              </td>
              <td>
                <strong>image</strong>
              </td>

              <td>
                <strong>Email</strong>
              </td>
              <td>
                <strong>Address</strong>
              </td>
              <td>
                <strong>Salary</strong>
              </td>
             
              <td>
                <strong>Action</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {employee.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>
                    <img
                      className=" imagebtn "
                      src={
                        data.image &&
                        `http://localhost:4500/image/${data.image}`
                      }
                      alt="employees"
                    />
                  </td>

                  <td>{data.email}</td>

                  <td>{data.address}</td>

                  <td>{data.salary}</td>
                  
                  <td className="d-flex h-0">
                    <Link to={`/dashboard/update_employee/${data.id}`}>
                      <button className="btn m-1 btn-success btn-sm rounded">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(data.id)}
                      className="btn btn-danger btn-sm m-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
