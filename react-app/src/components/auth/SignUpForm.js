import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [businessOwner, setBusinessOwner] = useState(false);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(
                signUp(
                    username,
                    email,
                    firstName,
                    lastName,
                    password,
                    phoneNumber,
                    profilePic,
                    businessOwner
                )
            );
            console.log(data);
            if (data) {
                setErrors(data);
            }
            alert("Signup successful!");
        }
    };
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const updateLastName = (e) => {
        setLastName(e.target.value);
    };
    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label className="user-input">User Name</label>
                <input
                    type="text"
                    name="username"
                    required
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
                <label className="user-input">First Name</label>
                <input
                    type="text"
                    name="first-name"
                    onChange={updateFirstName}
                    required
                    value={firstName}
                ></input>
            </div>
            <div>
                <label className="user-input">Last Name</label>
                <input
                    type="text"
                    name="last-name"
                    onChange={updateLastName}
                    value={lastName}
                    required
                ></input>
            </div>
            <div>
                <label className="user-input">Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={updateEmail}
                    value={email}
                    required
                ></input>
            </div>
            <div>
                <label className="user-input">Password</label>
                <input
                    type="password"
                    required
                    name="password"
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <div >
                <label className="user-input">Repeat Password</label>
                <input
                    className="sign-up-form"
                    type="password"
                    name="repeat_password"
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                ></input>
            </div>
            <button className="sign-up-btn" type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
