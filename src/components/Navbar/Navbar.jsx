import { Link, useLocation } from "react-router-dom"

import "./Navbar.css"

const Navbar = () => {

  const location = useLocation(); 

  const isHomePage = location.pathname === "/";

  return (
    <div>
        <nav className="header">
            <h2 >
                <Link to="/" className="page-title">OrcMDB</Link>
            </h2>

            
            {isHomePage && (
            <>
              <a href="#nos-cinemas" className="header-link">Nos Cinemas</a>
              <a href="#em-breve" className="header-link">Em Breve</a>
            </>
            )}
        </nav>
    </div>
  )
}

export default Navbar;