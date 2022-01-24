import { Link } from "react-router-dom";

import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container justify-content-between">
        <div>
          <Link className="navbar-brand" to="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-nav flex-row gap-3">
          <Link className="nav-item nav-link" to="/">New Article</Link>
          <Link className="nav-item nav-link" to="/existing-aticles">Existing</Link>
        </div>
      </div>
    </nav>
  );
}
