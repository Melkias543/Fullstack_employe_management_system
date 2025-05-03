import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Category() {
  const [category, setCategory]= useState([]);
useEffect(()=>{
CatagoryList()
},[])

const CatagoryList=async()=>{
try {
  const res = await axios.get("http://localhost:1234/auth/catagory_list");
  // console.log(res) 
  if(res.data.status){
    // console.log(res.data.result)
    setCategory(res.data.result);
  }
} catch (error) {
  console.log(error)
}

}

const handleDelete = async (id) => {
  // console.log(id);
  try {
     const res = await axios.delete(
       `http://localhost:1234/auth/delete_cat/${id}`
     );
    //  console.log(res.data.status);

     if (res.data.status) {
     window.location.reload()
     }
  } catch (error) {
    console.log(error)
  }
};
  return (
    <div className="px-5 mt-3 ">
      <div className="d-flex justify-content-center ">
        <h3>Category List</h3>
      </div>
      <Link to="/dashboard/add_catagory" className="btn btn-success">
        Add Catagory
      </Link>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>
                <strong>List</strong>
              </td>
              <td>
                <strong>Catagory Name</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            {category.map((data, i) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.cat_name}</td>
                  <td>
                   
                      
                   
                      <button className='btn btn-danger ' onClick={() => handleDelete(data.id)}>
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

export default Category
