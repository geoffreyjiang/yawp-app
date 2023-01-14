import React, { useEffect, useState } from "react";
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
        <div onClick={(e) => e.stopPropagation()}>
            <div className="edit-biz-container">
                <form onSubmit={handleSubmit}>
                    <header>Edit Your Listing</header>
                    <div>
                        <label htmlFor="address">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor=" Address1:">Address1:</label>
                        <input
                            type="text"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Address2">Address2:</label>
                        <input
                            type="text"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="State">State:</label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="previewImage">Image URL:</label>
                        <input
                            type="text"
                            name="Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                </form>
                <button className="edit-btn" onClick={(e) => handleSubmit(e)}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditListingFormPage;
