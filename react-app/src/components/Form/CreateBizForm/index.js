import React, { useState } from "react";
// import "./CreateSpot.css";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBusiness } from "../../../store/business";

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

        // console.log("Let's go create a business");
        dispatch(createBusiness(newBiz));
        // console.log("does this dispatch");
        history.push("/");
    };

    return (
        <div>
            <div>
                <button
                    className="back-to-home-button"
                    onClick={() => history.push("/")}
                >
                    Back to Home
                </button>
                <div>
                    <h1>Please fill Business information</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Business Name"
                            // required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Andress 1"
                            required
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Andress 2"
                            // required
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            type="input"
                            placeholder="Business Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />

                        <button
                            className="create-spot-form-button"
                            type="submit"
                        >
                            Submit Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBiz;
