//! action types
const ADD_REVIEW = "biz/ADD_REVIEW";
const GET_BIZ_REVIEWS = "biz/GET_BIZ_REVIEWS";
const DELETE_REVIEW = "biz/DELETE_REVIEW";
const EDIT_REVIEW = "biz/EDIT_REVIEW";
// working now
//! action creators
export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review,
    };
};

export const getBizReviews = (bizReviews) => {
    return {
        type: GET_BIZ_REVIEWS,
        bizReviews,
    };
};

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review,
    };
};

export const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review,
    };
};

//! thunk creators
//  Create a Review for a Business based on the Business's id
export const addNewReview = (bizId, reviewData) => async (dispatch) => {
    const response = await fetch(`/api/biz/${bizId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(addReview(review));
    }
};

// Get all reviews for the business by the business's id
export const getSelectedBizReviews = (bizId) => async (dispatch) => {
    const response = await fetch(`/api/biz/${bizId}/reviews`);
    const bizReviews = await response.json();

    dispatch(getBizReviews(bizReviews));
};
// Delete a Review
export const deleteMyReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview(data));
    }
};

// Edit a Review
export const editMyReview =
    (reviewId, editedReviewData) => async (dispatch) => {
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedReviewData),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(editReview(data));
        }
    };

//! Biz Reducer
const reviewsReducer = (state = {}, action) => {
    const newState = { ...state };
    switch (action.type) {
        case ADD_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case GET_BIZ_REVIEWS:
            return action.bizReviews;
        case DELETE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case EDIT_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
