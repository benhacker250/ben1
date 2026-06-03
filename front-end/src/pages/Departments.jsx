import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/departments";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    DepartmentID: "",
    DepartmentName: "",
    Description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(API_URL);
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.DepartmentID}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      resetForm();
      fetchDepartments();
    } catch (err) {
      console.error("Error saving department:", err);
    }
  };

  const handleEdit = (dept) => {
    setFormData(dept);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  const resetForm = () => {
    setFormData({ DepartmentID: "", DepartmentName: "", Description: "" });
    setIsEditing(false);
  };

  const filtered = departments.filter(
    (d) =>
      d.DepartmentName?.toLowerCase().includes(search.toLowerCase()) ||
      d.Description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Department Management</h2>

      <div className="card mb-4">
        <div className="card-header">{isEditing ? "Edit Department" : "Add Department"}</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label className="form-label">Department Name</label>
                <input
                  name="DepartmentName"
                  className="form-control"
                  value={formData.DepartmentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="form-label">Description</label>
                <input
                  name="Description"
                  className="form-control"
                  value={formData.Description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 d-flex align-items-end mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>

            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Description</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length ? (
            filtered.map((d) => (
              <tr key={d.DepartmentID}>
                <td>{d.DepartmentID}</td>
                <td>{d.DepartmentName}</td>
                <td>{d.Description}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(d)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d.DepartmentID)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No departments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;