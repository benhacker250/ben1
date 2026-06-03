import { Link } from "react-router-dom";

function Navbar(){

 return(

  <nav className="navbar navbar-dark bg-dark">

    <div className="container">

      <Link
        className="navbar-brand"
        to="/dashboard"
      >
        HRMS
      </Link>

      <div>

        <Link
          className="btn btn-light me-2"
          to="/employees"
        >
          Employees
        </Link>

        <Link
          className="btn btn-light me-2"
          to="/departments"
        >
          Departments
        </Link>

        <Link
          className="btn btn-light me-2"
          to="/positions"
        >
          Positions
        </Link>

        <Link
          className="btn btn-light"
          to="/leave-report"
        >
          Reports
        </Link>

      </div>

    </div>

  </nav>
 );
}

export default Navbar;