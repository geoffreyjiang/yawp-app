import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import React from 'react'
import { getSelectedBizReviews } from '../../store/reviews'

function Reviews() {

    const dispatch = useDispatch()
    const { bizId } = useParams()
    const allReviews = useSelector(state => state.reviews)
    const reviews = Object.values(allReviews)
    useEffect(() => {
        dispatch(getSelectedBizReviews(bizId))
    }, [dispatch])

    return (
        <div className="reviewHolder">
            {reviews?.map((review) => {
                return (
                    <div class="reviews" key={review?.id}>
                        <p className='reviewBody'>{review?.body}</p>
                        <h4 className='reviewUser'>{review?.User?.username}</h4>
                    </div>
                )
            })}
        </div>
    )
}
export default Reviews
