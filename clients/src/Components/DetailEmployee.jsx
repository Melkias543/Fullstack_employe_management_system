import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function DetailEmployee() {
  const [employe, setEmployee] = useState([]) 
  const navigate=useNavigate()  
  const {id}=useParams()
  // console.log(id)
  // console.log(employe);
useEffect(()=>{

SingleEmployee()
  
},[])
const SingleEmployee=async()=>{
  try {
    const res = await axios.get(
      `http://localhost:1234/employee/detail_emp/${id}`
    );
    console.log(res.data.result[0])
    if(res.data.status){
      setEmployee(res.data.result);
    };
  } catch (error) {
   console.log(error) 
  }

}
  // console.log(id)



  const handleLogout=async()=>{
    try {
      const res = await axios.get("http://localhost:1234/employee/logout");
      // console.log(res)
      if(res.data.status){
        navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=" container-fluid">
      <div className="row flex-nowrap">
        <div className=" p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow ">
            <h4>Employees Detail</h4>
          </div>
          <div className="d-flex justify-content-center mt-5  align-items-center gap-1">
            {
              // employe.map
              employe?.map((employe, i) => {
                return (
                  <div
                    className="d-flex justify-content-center flex-column  align-items-center gap-1"
                    key={employe.id || i}
                  >
                    <div className="d-flex justify-content-center flex-column  align-items-center  ">
                      <img
                        className=" mb-5 border-5 w-50  rounded-circle   "
                        src={`http://localhost:1234/image/${employe.image}`}
                        alt=""
                      />
                    </div>
                    <div className=" bg-light-subtle  d-flex justify-align-align-content-center   flex-column  align-align-items-start    ">
                      <h1>
                        <strong>Name:</strong> {employe.name}
                      </h1>
                      <h1>
                        <strong>Email:</strong> {employe.email}
                      </h1>
                      <h1>
                        <strong>Adress:</strong> {employe.address}
                      </h1>

                      <h1>
                        <strong>Salary:</strong> {employe.salary}
                      </h1>
                      <br /><br />
                      <button onClick={handleLogout} className=" btn btn-danger  w-25 btn-lg">Logout</button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEmployee
