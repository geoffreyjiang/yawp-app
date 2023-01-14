import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import businessReducer, { getBusinessId } from "../../store/business";
import { getSelectedBizReviews } from "../../store/reviews";
import PostReview from "./CreateReview";

import "./index.css";
import Rating from "../Home/Rating";

const ReviewForm = () => {
    const [userHasReview, setUserHasReview] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { bizId } = useParams();
    const biz = useSelector((state) => state.business);
    const sessionUser = useSelector((state) => state.session.user);
    console.log(biz, "<=== Biz");
    const bizReviews = useSelector((state) => {
        return Object.values(state.reviews);
    });
    const userReview = bizReviews?.filter(
        (review) => review?.userId === sessionUser?.id
    );

    useEffect(() => {
        dispatch(getBusinessId(bizId));
        dispatch(getSelectedBizReviews(bizId));
    }, [dispatch, bizId]);

    console.log(bizReviews[0], "review");
    console.log(userReview, "<==== USER REVIEW");
    return (
        <div>
            <h1>Reviews</h1>
            {userReview.length ? (
                <button
                    onClick={() => {
                        history.push(
                            `/biz/${bizId}/reviews/${userReview[0].id}`
                        );
                    }}
                >
                    Update Review
                </button>
            ) : (
                <button
                    onClick={() => {
                        history.push(`/biz/${bizId}/reviews`);
                        <PostReview user={sessionUser} />;
                    }}
                >
                    Create Review
                </button>
            )}
            {/* {bizReviews?.map((review) => {
                if (review?.userId === sessionUser?.id) {
                    return (
                        <button>
                            Update Review
                        </button>
                    )
                }
                else {
                    return (
                        <button
                            onClick={() => {
                                history.push(`/biz/${bizId}/reviews`);
                            }}
                        >
                            Write A Review
                        </button>
                    )
                }
            })} */}
            <div className="reviewsHolder">
                {bizReviews?.map((review) => {
                    return (
                        <div class="reviews" key={review?.id}>
                            <p className="reviewBody">{review?.body}</p>
                            <h2 className="rating">{review?.rating}</h2>
                            <h4 className="reviewUser">{review?.firstName}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewForm;
