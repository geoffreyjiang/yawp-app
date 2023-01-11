import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./nav.css";
const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);

    let session;

    if (sessionUser) {
        session = (
            <ul>
                <li className="list-item">
                    <NavLink className="list-nav" to="/" exact={true}>
                        Home
                    </NavLink>
                </li>
                <li className="list-item">
                    <NavLink className="list-nav" to="/" exact={true}>
                        <i class="fa-solid fa-plus"></i>{" "}
                    </NavLink>
                </li>
                <li className="list-item">
                    <LogoutButton />
                </li>
            </ul>
        );
    } else {
        session = (
            <ul>
                <li className="list-item">
                    <NavLink to="/" className="list-nav" exact={true}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" exact={true} className="list-item">
                        Users
                    </NavLink>
                </li>
                <li className="list-item">
                    <NavLink to="/login" exact={true} className="list-nav">
                        Login
                    </NavLink>
                    {" | "}
                    <NavLink to="/sign-up" exact={true} className="list-nav">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className="nav-bar-container">
            <i class="fa-brands fa-yelp">YAWP</i>
            {session}
        </nav>
    );
};

export default NavBar;
