import { useState } from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

  return (
    <header>
      {/* Sidebar */}
      <nav
        id="sidebarMenu"
        className={`d-lg-block sidebar ${isOpenMenu && "collapse"} bg-white`}
      >
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <NavLink
              to="/"
              aria-current="true"
              className={({ isActive }) =>
                `list-group-item list-group-item-action py-2 ${
                  isActive && "active"
                }`
              }
            >
              <i className="fas fa-house me-3"></i>
              <span>Дом</span>
            </NavLink>
            <NavLink
              to="/pages/category"
              className={({ isActive }) =>
                `list-group-item list-group-item-action py-2 ${
                  isActive && "active"
                }`
              }
            >
              <i className="fas fa-tags me-3"></i>
              <span>Категории</span>
            </NavLink>
            <NavLink
              to="/pages/course"
              className={({ isActive }) =>
                `list-group-item list-group-item-action py-2 ${
                  isActive && "active"
                }`
              }
            >
              <i className="fas fa-school me-3"></i>
              <span>Курсы</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpenMenu((prevState) => !prevState)}
            data-mdb-toggle="collapse"
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <a className="navbar-brand d-none d-sm-flex text-warning" href="#">
            Браин груп
          </a>
          <form className="d-flex d-md-flex input-group w-auto my-auto">
            <input
              autoComplete="off"
              type="search"
              className="form-control rounded"
              placeholder="Поиск"
              style={{ minWidth: "225px" }}
            />
          </form>
          <ul className="navbar-nav ms-auto d-flex flex-row">
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-earth-americas"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="united kingdom flag"></i>Eng
                    <i className="fa fa-check text-success"></i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="russia flag"></i>Rus
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="uz flag"></i>Uz
                  </a>
                </li>
              </ul>
            </li> */}
            {token ? (
              <MDBDropdown>
                <MDBDropdownToggle>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                    className="rounded-circle shadow-4 me-1"
                    style={{ width: "30px" }}
                    alt="Avatar"
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/pages/profile">
                    <MDBDropdownItem link>Profile</MDBDropdownItem>
                  </Link>
                  <Link to="/pages/login">
                    <MDBDropdownItem link>Logout</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            ) : (
              <li className="nav-item">
                <a
                  id="navbarDropdown"
                  href="./login.html"
                  className="nav-link me-3 me-lg-0 hidden-arrow"
                >
                  <i className="fas fa-right-to-bracket"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
