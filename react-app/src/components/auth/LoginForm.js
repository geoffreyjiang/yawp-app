import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    // console.log(typeof email);
    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form className="user-form" onSubmit={onLogin}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label className="user-input" htmlFor="email">
                    Email
                </label>
                <input
                    name="email"
                    required
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                />
            </div>
            <div>
                <label className="user-input" htmlFor="password">
                    Password
                </label>
                <input
                    className="user-input"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                />
                <button className="login-btn" type="submit">
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
