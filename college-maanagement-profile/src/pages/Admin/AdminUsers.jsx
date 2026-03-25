import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { AuthContext } from "../../context/AuthProvider";

function AdminUsers() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student"
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/users", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFormData({
        name: "",
        email: "",
        role: "student"
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Failed to add user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to delete user");
    }
  };

  return (
    <Layout>
      <h2 className="page-title">Manage Users</h2>

      <div className="card">
        <h3>Add User</h3>
        <form className="form-grid" onSubmit={handleAddUser}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn-primary" type="submit">Add User</button>
        </form>
      </div>

      <div className="card">
        <h3>All Users</h3>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((u) => (
            <div key={u._id} className="item-card">
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> {u.role}</p>
              <button className="btn-danger" onClick={() => handleDeleteUser(u._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default AdminUsers;