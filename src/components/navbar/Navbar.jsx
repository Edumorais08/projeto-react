import { Link } from "react-router-dom"

import "./Navbar.css"

const navbar = () => {
  return (
    <div>
        <nav className="cabecalho">
            <h2 >
                <Link to="/" className="cabecalho-link">ReactAPI</Link>
            </h2>
            <Link to="/movie/1" className="cabecalho-link">Filme</Link>
        </nav>
    </div>
  )
}

export default navbar