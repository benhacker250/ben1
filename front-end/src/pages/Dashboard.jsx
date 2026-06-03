import Navbar from "../components/Navbar";

function Dashboard() {

 return(
   <>
      <Navbar />

      <div className="container mt-4">

         <h1>Human Resource Management System</h1>

         <div className="row">

            <div className="col-md-3">

              <div className="card p-3">
                Employees
              </div>

            </div>

            <div className="col-md-3">

              <div className="card p-3">
                Departments
              </div>

            </div>

            <div className="col-md-3">

              <div className="card p-3">
                Positions
              </div>

            </div>

         </div>

      </div>
   </>
 );
}

export default Dashboard;