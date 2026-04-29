import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #ddd",
        marginBottom: "24px",
      }}
    >
      <div>
        <Link to="/projects" style={{ marginRight: "16px" }}>
          Projects
        </Link>

        <Link to="/my-tasks">My Tasks</Link>
      </div>

      <div>
        <span style={{ marginRight: "16px" }}>{name || email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;