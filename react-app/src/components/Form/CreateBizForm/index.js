import React, { useState } from "react";
import "./index.css";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBusiness, getBusinesses } from "../../../store/business";

// import { addNewSpot } from "../../../store/spotsReducer";

const CreateBiz = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBiz = {
            name,
            address1,
            address2,
            city,
            state,
            image,
        };

        dispatch(createBusiness(newBiz));
        dispatch(getBusinesses());
        history.push("/");
    };

    return (
        <div>
            <div className="container">
                <div className="title">Add Your Business Details</div>

                <form method="POST" onSubmit={handleSubmit}>
                    <div className="biz-details">
                        <div className="input-box">
                            <span className="details">Business Name</span>
                            <input
                                type="text"
                                placeholder="Enter Business Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Address 1</span>
                            <input
                                type="text"
                                placeholder="Enter Andress 1"
                                required
                                onChange={(e) => setAddress1(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Address 2</span>
                            <input
                                type="text"
                                placeholder="Enter Andress 2"
                                onChange={(e) => setAddress2(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">City</span>
                            <input
                                type="text"
                                placeholder="Enter City"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">State</span>
                            <input
                                type="text"
                                placeholder="Enter State"
                                required
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Business Image URL</span>
                            <input
                                type="input"
                                placeholder="Enter Business Image"
                                // required
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="button">
                            Add Business
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBiz;
