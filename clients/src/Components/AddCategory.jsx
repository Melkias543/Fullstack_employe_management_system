import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"

function AddCategory() {
  const [category, setCategory] = useState()
// console.log(category)



// console.log("from Catagory",id)
// console.log("from Catagory", useParams().id);

const navigate = useNavigate()
const handleSubmit=async(e)=>{
e.preventDefault();



try {
 
 
    // Adding a new category
   const res = await axios.post(
     "http://localhost:1234/auth/add_category",
     category
   );
   console.log(res)
    if (res.data.message === "Category added successfully") {
      navigate("/dashboard/category");
    }
  

  console.log(res.data.message);
} catch (error) {
  console.error("Error:", error);
}

}

 return (
   <div className="d-flex mt-3  justify-content-center  vh-75 align-items-center  ">
     <div className="rounded justify-content-center align-items-center  w-50 border  flex-column   p-3 ">
       <h2 className=" justify-content-center   "> Add category</h2>
       <form
         className="d-flex justify-content-center flex-column"
         onSubmit={handleSubmit}
       >
         <div className="">
           <label htmlFor="category">
             <strong>Category:</strong>
           </label>
           <br />
           <input
             type="text"
             name="category"
             placeholder="Enter Category"
             className="form-conrol p-1 w-auto rounded-0 "
             onChange={(e) =>
               setCategory({ ...category, category: e.target.value })
             }
           />
         </div>
         
           <button
             type="submit"
             className="btn btn-success w-25 h1 rounded-2 p-2 mt-3   justify-content-center"
           >
             Add Category
           </button>
        
         {/* <button
           type="submit"
           className="btn btn-success w-25 h1 rounded-2 p-2 mt-3   justify-content-center"
         >
           Add Category
         </button> */}
       </form>
     </div>
   </div>
 );
}

export default AddCategory
