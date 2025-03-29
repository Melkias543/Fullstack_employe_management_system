import Category from "./Components/Category";
import Dashboard from "./Components/Dashboard";
import Employee from "./Components/Employee";
import Home from "./Components/Home";
import Login from "./Components/Login"
import {Routes, Route} from 'react-router-dom'
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import UpdateEmployee from "./Components/UpdateEmployee";
import Start from "./Components/Start";
import EmployeLogin from "./Components/EmployeLogin";
import DetailEmployee from "./Components/DetailEmployee";
import Private from "./Components/Private";

function App() {
 

  return (
    <div>
      <Routes>
        <Route path="/loginAdmin" element={<Login />}></Route>
        <Route path="/detail_Employe/:id" element={<DetailEmployee />}></Route>
        <Route path="/" element={<Start />}></Route>
        <Route path="/employe_login" element={<EmployeLogin />}></Route>

        <Route
          path="/dashboard"
          element={
            // <Private>
            <Dashboard />
            // </Private>
          }
        >
          <Route path="" index element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>

          <Route path="/dashboard/category" element={<Category />}></Route>

          <Route
            path="/dashboard/add_catagory"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_catagory/:id"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/update_employee/:id"
            element={<UpdateEmployee />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App
