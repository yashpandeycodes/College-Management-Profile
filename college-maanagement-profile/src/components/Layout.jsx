import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="layout">

      <Navbar />

      <div className="main">

        <Sidebar />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;