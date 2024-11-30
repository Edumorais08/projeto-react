import { Link } from "react-router-dom"

import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
        <nav className="header">
            <h2 >
                <Link to="/" className="page-title">OrcMDB</Link>
            </h2>
            <a href="#nos-cinemas" className="header-link">Nos Cinemas</a>
            <a href="#em-breve" className="header-link">Em Breve</a>
        </nav>
    </div>
  )
}

export default Navbar