import { useEffect,useState } from "react";
import axios from "axios";

function Employees() {

 const [employees,setEmployees] = useState([]);

 useEffect(()=>{

   loadEmployees();

 },[]);

 const loadEmployees = async () => {
   try {
     const result = await axios.get("http://localhost:4000/api/employees");
     setEmployees(result.data);
   } catch (error) {
     console.error("Error loading employees:", error);
     alert("Failed to load employees. Make sure backend is running on http://localhost:4000.");
   }
 };

 return(

   <div className="container mt-4">

      <h2>Employee Management</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Employee..."
      />

      <table className="table table-bordered">

         <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
         </thead>

         <tbody>

         {employees.map((emp)=>(
            <tr key={emp.EmpID}>

               <td>{emp.EmpID}</td>

               <td>
                  {emp.EmpFirstName}
                  {" "}
                  {emp.EmpLastName}
               </td>

               <td>{emp.DepartmentName}</td>

               <td>{emp.PostName}</td>

               <td>{emp.EmpStatus}</td>

               <td>

                  <button className="btn btn-warning btn-sm">
                     Edit
                  </button>

                  <button className="btn btn-danger btn-sm ms-2">
                     Delete
                  </button>

               </td>

            </tr>
         ))}

         </tbody>

      </table>

   </div>
 );
}

export default Employees;