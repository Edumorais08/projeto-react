import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("session");
    setCurrentUser(null);
    alert("Logout realizado com sucesso!");
  };

  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((user) => user.email !== currentUser.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    handleLogout();
    alert("Conta excluída com sucesso!");
  };

  const isHomePage = location.pathname === "/";
  const isFavoritePage = location.pathname === "/favorites";

  return (
    <div>
      <nav className="header">
        <h2>
          <Link to="/" className="page-title">OrcMDB</Link>
        </h2>

        <div className="header-links">
          {isHomePage && (
            <>
              <a href="#nos-cinemas" className="header-link">Nos Cinemas</a>
              <a href="#em-breve" className="header-link">Em Breve</a>
            </>
          )}
          {isFavoritePage && (
            <>
              <a href="../#nos-cinemas" className="header-link">Nos Cinemas</a>
              <a href="../#em-breve" className="header-link">Em Breve</a>
            </>
          )}
          <Link to="/favorites" className="header-link">Favoritos</Link>
          {currentUser ? (
            <div className="dropdown">
              <button className="dropdown-button">
                Olá, {currentUser.name} ▼
              </button>
              <div className="dropdown-content">
                <Link to="/EditProfile" className="dropdown-link">Editar Perfil</Link>
                <button className="dropdown-link" onClick={handleDeleteAccount}>
                  Excluir Conta
                </button>
                <button className="dropdown-link" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="header-link">Login</Link>
              <Link to="/register" className="header-link">Registrar</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
