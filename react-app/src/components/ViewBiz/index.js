import React, { useState, useEffect } from "react";

import {
    getBusinessId,
    getBusinesses,
    removeBusiness,
} from "../../store/business";
import { getSelectedBizReviews } from "../../store/reviews";
import { getQuestions } from "../../store/questions";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
const ViewBiz = () => {
    const dispatch = useDispatch();
    const { bizId } = useParams();
    const history = useHistory();

    const biz = useSelector((store) => store.business);
    const store = useSelector((store) => console.log(store, "STORE"));
    const reviews = useSelector((store) => Object.values(store.reviews));
    // console.log(store, "store");
    const questions = useSelector((store) => Object.values(store.questions));

    const editListingOnClick = (bizId) => {
        // console.log(bizId, "EDIT CLICK");
        history.push(`/biz/${bizId}/edit`);
    };

    const deleteListingOnClick = (bizId) => {
        // console.log(bizId, "DELETE CLICK");
        dispatch(removeBusiness(bizId));
        history.push("/");
    };

    // to get the user session data
    const user = useSelector((state) => state.session.user);
    // console.log(biz.userId, "BIG");

    // console.log(biz.id, user.id, "USER");
    // const handleDelete = () => dispatch(removeBusiness(biz.id, user.id));

    useEffect(() => {
        dispatch(getBusinessId(bizId));
        dispatch(getSelectedBizReviews(bizId));
        dispatch(getQuestions(bizId));
    }, [dispatch]);
    // console.log(bizId, "line 54 SINGLE BIZ");
    return (
        <>
            {/* <h1 className="biz-detail">Biz Details</h1> */}
            <h2 className="biz-detail">{biz.name}</h2>
            <h3 className="biz-detail">{biz.username}</h3>
            <h2 className="biz-detail">
                {user.id == biz.userId ? (
                    <>
                        <button onClick={() => editListingOnClick(biz.id)}>
                            Edit Biz Details
                        </button>
                        <button onClick={() => deleteListingOnClick(biz.id)}>
                            Delete Button
                        </button>
                    </>
                ) : null}
            </h2>
            <div className="biz-detail">
                <h4>
                    <img className="biz-img" src={biz.image}></img>
                </h4>
            </div>
            <div className="biz-detail">
                <h3>
                    Location: {biz.address1}, {biz.city}, {biz.state}
                </h3>
            </div>
        </>
    );
};

export default ViewBiz;
