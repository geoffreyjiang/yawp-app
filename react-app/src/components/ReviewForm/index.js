import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import businessReducer, { getBusinessId } from '../../store/business'
import { getSelectedBizReviews } from '../../store/reviews'
const ReviewForm = () => {
    const dispatch = useDispatch()
    const { bizId } = useParams();
    const biz = useSelector((state) => state.business)
    const sessionUser = useSelector(state => state.session.user)
    console.log(biz, "<=== Biz")
    const bizReviews = useSelector((state) => {
        return Object.values(state.reviews)
    })

    useEffect(() => {
        dispatch(getBusinessId(bizId))
        dispatch(getSelectedBizReviews(bizId))
    }, [dispatch, bizId])

    console.log(bizReviews[0]?.User?.username, "review")
    return (
        <div>
            <h1>Reviews</h1>
            {bizReviews?.map((review) => {
                if (review?.userId === sessionUser?.id) {
                    return (
                        <button>
                            Update Review
                        </button>
                    )
                }
                else {
                    return (
                        <button>
                            Create Review
                        </button>
                    )
                }
            })}
            <div className="reviewsHolder">
                {
                    bizReviews?.map((review) => {
                        return (
                            <div class="reviews" key={review?.id}>
                                <p className="reviewBody">{review?.body}</p>
                                <h4 className="reviewUser">{review?.User?.username}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>


    )
}

export default ReviewForm;
