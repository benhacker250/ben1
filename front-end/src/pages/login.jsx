import { useState } from "react";
import axios from "axios";

function Login() {

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");

 const login = async () => {
   if (!username || !password) {
     return alert('Please enter both username and password.');
   }

   try {
     const response = await axios.post(
       "http://localhost:4000/api/auth/login",
       {
         Username: username,
         Password: password,
       }
     );

     localStorage.setItem("token", response.data.token);
     window.location = "/dashboard";
   } catch (error) {
     console.error("Login failed:", error);
     const message = error.response?.data?.message || "Network error. Please check the backend server.";
     alert(message);
   }
 };

 return(
   <div className="container mt-5">

      <div className="card p-4">

         <h2>HRMS Login</h2>

         <input
           className="form-control mb-2"
           placeholder="Username"
           onChange={(e)=>setUsername(e.target.value)}
         />

         <input
           type="password"
           className="form-control mb-2"
           placeholder="Password"
           onChange={(e)=>setPassword(e.target.value)}
         />

         <button
            className="btn btn-primary"
            onClick={login}
         >
            Login
         </button>

      </div>

   </div>
 );
}

export default Login;