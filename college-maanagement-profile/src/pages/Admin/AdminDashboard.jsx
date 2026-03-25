import Layout from "../../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function AdminDashboard() {

  const { user } = useContext(AuthContext);

  return (
    <Layout>

      <h2>Admin Dashboard</h2>

      <div className="card">
        <p>Welcome {user?.email}</p>
        <p>Use sidebar to manage system</p>
      </div>

    </Layout>
  );
}

export default AdminDashboard;