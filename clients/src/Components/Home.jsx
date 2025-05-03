import React, { useEffect, useState } from 'react'
import axios from "axios"
function Home() {
  const [admin , setAdmin]=useState()
  const [employe , setEmployee]=useState()
  const [salary , setSalary]=useState()
  const [adminList, setAdminList] = useState([]);
console.log("list",adminList);

  useEffect(()=>{
TotalAdmin();
TotalEmployee();
TotalSalary();
getAdmin();
  }, [])

  const TotalEmployee=async()=>{
try {
  const res = await axios.get("http://localhost:1234/auth/employee_count");
  console.log(res.data.result[0].employee); 
  setEmployee(res.data.result[0].employee);
} catch (error) {
  console.log(err)
}
  }

   const TotalAdmin = async () => {
     try {
       const res = await axios.get("http://localhost:1234/auth/admin_count");
       console.log(res.data.result[0].admin);
       setAdmin(res.data.result[0].admin);
     } catch (error) {
       console.log(err);
     }
   };

    const TotalSalary = async () => {
      try {
        const res = await axios.get("http://localhost:1234/auth/salary_count");
        console.log(res.data.result[0].admin);
       
        setSalary(res.data.result[0].salary);
      } catch (error) {
        console.log(err);
      }
    };

const getAdmin=async()=>{
  try {
    const res = await axios.get("http://localhost:1234/auth/get_admins");
    console.log(res.data.result);
     setAdminList(res.data.result);
  } catch (error) {
    
  }
}


  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pb-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <div className="text-center d-flex justify-content-around">
            <h5>Total:</h5>
            <h5>{admin}</h5>
          </div>
        </div>

        <div className="px-3 pb-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <div className="d-flex text-center justify-content-around">
            <h5>Total</h5>
            <h5>{employe}</h5>
          </div>
        </div>

        <div className="px-3 pb-3 pt-2 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <div className="d-flex justify-content-around text-center">
            <h5>Total</h5>
            <h5>{salary}</h5>
          </div>
        </div>
      </div>

      <div>
        <h1 className=" d-flex mt-3 justify-content-center">Admin Lists</h1>
        <table className="table m-lg-1">
          <thead>
            <tr>
              <th>
                <strong>Email</strong>
              </th>
              <th>
                <strong>Action</strong>
              </th>
            </tr>
          </thead>
          <tbody>{
          adminList.map((admin,i)=>{
            return (
              <tr key={admin.id ||i }>
                <td>{admin.email}</td>
                <td className='d-flex gap-4'>
                  <button className='btn btn-success btn-sm'>Edit</button>
                  <button className='btn btn-danger btn-sm'>Delete</button>
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

export default Home
