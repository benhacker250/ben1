import { useEffect,useState } from "react";
import axios from "axios";

function LeaveReport(){

 const [report,setReport] = useState([]);

 useEffect(()=>{
   loadReport();
 },[]);

 const loadReport = async () => {
   try {
     const response = await axios.get("http://localhost:4000/api/reports");
     setReport(response.data);
   } catch (error) {
     console.error("Error loading leave report:", error);
     alert("Failed to load report. Make sure backend is running on http://localhost:4000.");
   }
 };

 return(

   <div className="container mt-4">

      <h2>Employees On Leave Report</h2>

      <table className="table table-striped">

         <thead>
           <tr>
             <th>Department</th>
             <th>Employee</th>
             <th>Position</th>
             <th>Status</th>
           </tr>
         </thead>

         <tbody>

           {report.map((item,index)=>(

             <tr key={index}>

               <td>{item.DepartmentName}</td>

               <td>{item.EmployeeName}</td>

               <td>{item.PostName}</td>

               <td>{item.EmpStatus}</td>

             </tr>

           ))}

         </tbody>

      </table>

   </div>
 );
}

export default LeaveReport;