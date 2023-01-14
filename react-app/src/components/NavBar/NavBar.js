import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

import { useDispatch, useSelector } from "react-redux";
import "./nav.css";
import { login } from "../../store/session";
const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.session.user);

    let session;

    if (sessionUser) {
        session = (
            <ul>
                <li className="list-item">
                    {/* <NavLink className="list-nav" to="/" exact={true}>
                        <i class="fa-solid fa-house fa-2x"></i>

                    </NavLink> */}
                    <button
                        className="icon-btn"
                        onClick={() => history.push("/")}
                    >
                        <i class="fa-solid fa-house fa-2x"></i>
                    </button>
                </li>
                <li className="list-item">
                    {/* <NavLink className="list-nav" to="/biz" exact={true}>
                        <i class="fa-solid fa-plus fa-2x"></i>
                    </NavLink> */}
                    <button
                        className="icon-btn"
                        onClick={() => history.push("/biz")}
                    >
                        <i class="fa-solid fa-plus fa-2x"></i>
                    </button>
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
                    <NavLink to="/" className="demo-btn" exact={true}>
                        <i class="fa-solid fa-house fa-2x"></i>
                    </NavLink>
                </li>
                <li className="list-item">
                    <NavLink to="/login" className="demo-btn">
                        Login
                    </NavLink>
                    {" | "}
                    <NavLink to="/sign-up" className="demo-btn">
                        Sign Up
                    </NavLink>
                    {" | "}
                </li>
                <button
                    onClick={async (e) => {
                        const credential = "gjiang@aa.io";
                        const password = "password";
                        // history.push("/");
                        console.log(credential);
                        const data = await dispatch(
                            login(credential, password)
                        );
                        if (data) history.push("/");
                    }}
                    className="demo-btn"
                >
                    Demo
                </button>
            </ul>
        );
    }

    return (
        <nav className="nav-bar-container">
            <i class="fa-brands fa-yelp fa-2x">YAWP</i>
            {session}
        </nav>
    );
};

export default NavBar;
