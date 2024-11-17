import { NavLink } from 'react-router-dom';


const ToolBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink to="/"><span className="navbar-brand mb-0 text-white fs-2">Contacts App</span></NavLink>


          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Contacts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/newContact">New Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default ToolBar;