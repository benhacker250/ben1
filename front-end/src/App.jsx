import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/employees";
import Departments from "./pages/Departments";
import Positions from "./pages/Positions";
import LeaveReport from "./pages/LeaveReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/employees"
          element={<Employees />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/positions"
          element={<Positions />}
        />

        <Route
          path="/leave-report"
          element={<LeaveReport />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;