// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
        <Link to="/tasks" style={{ marginRight: "10px" }}>Tasks</Link>
      </div>

      <div>
        {!token ? (
          <>
            <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              background: "#dc3545",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
