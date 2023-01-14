import React, { useEffect, useState } from "react";
import { getBusinessId } from "../../../store/business";
import "./EditListForm.css";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getBusinesses, editBusiness } from "../../../store/business";
import "./EditListForm.css";
const EditListingFormPage = (id) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bizId } = useParams();

    const biz = useSelector((store) => store.business);
    // console.log(bizId, "edit form bizID line 15");
    // console.log(biz.name);

    const [name, setName] = useState(biz.name);
    const [address1, setAddress1] = useState(biz.address1);
    const [address2, setAddress2] = useState(biz.address2);
    const [city, setCity] = useState(biz.city);
    const [state, setState] = useState(biz.state);
    const [image, setImage] = useState(biz.image);

    // let bizId = id;
    useEffect(() => {
        dispatch(getBusinessId(bizId));
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBiz = {
            name,
            address1,
            address2,
            city,
            state,
            image,
            id: parseInt(bizId),
        };
        // console.log("are you here");
        // console.log(bizId, "In the submit form");
        // console.log(updatedBiz, "UPDATED DATA");
        dispatch(editBusiness(bizId, updatedBiz));
        // getBusinesses();

        history.push(`/biz/${bizId}`);
        // console.log(data, "dispatch data");
        // console.log(updatedBiz, "put information");
    };

    return (
        <div className="edit-biz-container">
            <div className="container">
                <div className="title">Edit Your Business</div>

                <form method="POST" onSubmit={handleSubmit}>
                    <div className="biz-details">
                        <div className="input-box">
                            <span className="details">Business Name</span>
                            <input
                                type="text"
                                placeholder="Enter Business Name"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Address 1</span>
                            <input
                                type="text"
                                placeholder="Enter Andress 1"
                                value={address1}
                                required
                                onChange={(e) => setAddress1(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Address 2</span>
                            <input
                                type="text"
                                value={address2}
                                placeholder="Enter Andress 2"
                                onChange={(e) => setAddress2(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">City</span>
                            <input
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">State</span>
                            <input
                                type="text"
                                placeholder="Enter State"
                                value={state}
                                required
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <span className="details">Business Image URL</span>
                            <input
                                type="input"
                                placeholder="Enter Business Image"
                                value={image}
                                required
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="button">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditListingFormPage;
