import React, { useState, useEffect } from "react";
import AllQuestions from "../Questions";
import ReviewForm from "../ReviewForm";
import MenuItems from "../Menu";
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
import Rating from "../Home/Rating";
const ViewBiz = () => {
    const dispatch = useDispatch();
    const { bizId } = useParams();
    const history = useHistory();

    const biz = useSelector((store) => store.business);
    // const store = useSelector((store) => console.log(store, "STORE"));
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
            <div className="view-biz-container">
                <div className="biz-detail">
                    <div className="biz-img-container">
                        <img className="biz-img" src={biz.image}></img>
                    </div>
                    <div className="biz-info">
                        <h1>{biz.name}</h1>
                        <br></br>
                        <h3>
                            {biz.address1},{biz.city}, {biz.state} <br></br>
                            <Rating value={biz.averageRating} />
                        </h3>
                        <h2>
                            {user.id == biz.userId ? (
                                <div className="biz-user-btns">
                                    <button
                                        className="biz-btn"
                                        onClick={() =>
                                            editListingOnClick(biz.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="biz-btn"
                                        onClick={() =>
                                            deleteListingOnClick(biz.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </h2>
                        {/* <div className="biz-description">
                            <h4>About</h4>
                            <h5>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Debitis odio ipsum non
                                voluptate laboriosam optio laudantium reiciendis
                                necessitatibus nisi quae dolore illo, nobis
                                blanditiis in totam vero natus minus magnam.
                            </h5>
                        </div> */}
                    </div>
                    <h3>{biz.username}</h3>
                </div>
            </div>

            <div className="qrm-container">
                <div className="m-container">
                    <MenuItems />
                </div>
                <div className="q-container">
                    <AllQuestions />
                </div>
            </div>
            <div class="review_view">
                <ReviewForm />
            </div>
        </>
    );
};

export default ViewBiz;
