import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate();
  axios.defaults.withCredentials=true
  useEffect(()=>{
    verfiy();
  },[])
  const verfiy=async()=>{
    try {
      const res = await axios.get("http://localhost:4500/verify");
      // console.log(res.data.role)
      // console.log(res.data.status)
      console.log(res.data);
     if (res.data.status) {
       if (res.data.role === "employee") {
        navigate("/detail_Employe/:id");
       }
        else if (res.data.role === "admin") {
     navigate("/dashboard")
        }

        else{
          navigate("/")
        }
     }
    } catch (error) {
      console.log(error)
    }
  }
 return (
   <div className="d-flex  w-100 justify-content-center align-items-center vh-100 gap-3 bg-light ">
     <div className="rounded justify-content-center align-items-center  w-25 border  flex-column   p-3 ">
       <h2 className=" d-flex justify-content-center  ">Login As</h2>

       <div>
         <div className="d-flex justify-content-evenly justify-content-center align-items-center  ">
           <Link to="/loginAdmin">
             <button className="btn btn-primary">Admin</button>
           </Link>
           <Link to="/employe_login">
             <button className="btn btn-success m-2">Employe</button>
           </Link>
         </div>
       </div>
     </div>
   </div>
 );
}

export default Start
