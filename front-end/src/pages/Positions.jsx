import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/positions";

function Positions() {
  const [positions, setPositions] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    PositionID: "",
    PostName: "",
    RequiredQualification: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const res = await axios.get(API_URL);
      setPositions(res.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(
          `${API_URL}/${formData.PositionID}`,
          formData
        );
      } else {
        await axios.post(API_URL, formData);
      }

      resetForm();
      fetchPositions();
    } catch (error) {
      console.error("Error saving position:", error);
    }
  };

  const handleEdit = (position) => {
    setFormData(position);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchPositions();
      } catch (error) {
        console.error("Error deleting position:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      PositionID: "",
      PostName: "",
      RequiredQualification: "",
    });
    setIsEditing(false);
  };

  const filteredPositions = positions.filter(
    (position) =>
      position.PostName?.toLowerCase().includes(search.toLowerCase()) ||
      position.RequiredQualification
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Position Management</h2>

      {/* Form */}
      <div className="card mb-4">
        <div className="card-header">
          {isEditing ? "Edit Position" : "Add Position"}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label className="form-label">Post Name</label>
                <input
                  type="text"
                  name="PostName"
                  className="form-control"
                  value={formData.PostName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-5 mb-3">
                <label className="form-label">
                  Required Qualification
                </label>
                <input
                  type="text"
                  name="RequiredQualification"
                  className="form-control"
                  value={formData.RequiredQualification}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 d-flex align-items-end mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>

            {isEditing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Post Name</th>
            <th>Required Qualification</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPositions.length > 0 ? (
            filteredPositions.map((position) => (
              <tr key={position.PositionID}>
                <td>{position.PositionID}</td>
                <td>{position.PostName}</td>
                <td>{position.RequiredQualification}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(position)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(position.PositionID)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No positions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Positions;