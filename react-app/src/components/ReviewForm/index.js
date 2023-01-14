import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getBusinessId } from "../../store/business";
import { getSelectedBizReviews } from "../../store/reviews";
import "./index.css";
import Rating from "../Home/Rating";

const ReviewForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { bizId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);

    const bizReviews = useSelector((state) => {
        return Object.values(state.reviews);
    });
    const review = bizReviews.map((item) => {
        return item;
    });

    const user = useSelector((state) => state.session.user);

    const userReview = bizReviews?.filter(
        (review) => review?.userId === sessionUser?.id
    );

    useEffect(() => {
        dispatch(getBusinessId(bizId));
        dispatch(getSelectedBizReviews(bizId));
    }, [dispatch, bizId]);

    return (
        <>
            <div className="header-review">
                <h1>Review Section</h1>

                <div className="review-div">
                    {userReview.length == 0 ? (
                        <button
                            onClick={() => {
                                history.push(`/biz/${bizId}/reviews`);
                            }}
                        >
                            Write A Review
                        </button>
                    ) : null}
                </div>
            </div>
            <section className="reviews">
                <div className="reviews-box-container">
                    {bizReviews?.map((review) => (
                        <>
                            <div className="review-box">
                                <div className="box-top">
                                    <div className="profile">
                                        <div className="name-user">
                                            <strong>
                                                {review.firstName}{" "}
                                                {review.lastName}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="reviewsT">
                                        <i>
                                            <Rating value={review?.rating} />{" "}
                                        </i>
                                    </div>
                                </div>
                                <div className="comment-section">
                                    <div className="client-comment">
                                        <p>{review?.body}</p>
                                    </div>
                                </div>
                                <div>
                                    {user.id == review.userId ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    history.push(
                                                        `/biz/${bizId}/reviews/${userReview[0].id}`
                                                    );
                                                }}
                                            >
                                                Update Review
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </section>
        </>
    );
};

export default ReviewForm;
