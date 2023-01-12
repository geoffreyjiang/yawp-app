import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addReview } from "../../store/reviews";
import { getBusinesses } from "../../store/business";
import { editMyReview } from "../../store/reviews";
import { deleteMyReview } from "../../store/reviews";

function EditReview() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const { bizId } = useParams()
    const { reviewId } = useParams()
    const review = useSelector((state) => state.reviews[reviewId])
    const [body, setBody] = useState(review.body)
    const [rating, setRating] = useState(review.rating)
    const [userId, setUserId] = useState(sessionUser?.id)

    const deleteReview = (e) => {
        e.preventDefault();
        dispatch(deleteMyReview(review.id))
        alert("Review successfully removed!")
        history.push('/')
    }
    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (sessionUser) {
            setUserId(sessionUser?.id)
        }

        const payload = {
            userId: userId,
            businessId: bizId,
            body: body,
            rating: rating,
            image: null
        }
        console.log(payload, "<== EDIT PAYLOAD")
        const editedReview = dispatch(editMyReview(reviewId, payload))
        if (editedReview) {
            alert("Review successfully updated!")
            setBody("")
            history.push(`/biz/${bizId}`)
        }
    }
    return (
        <>
            <section className="edit-review">
                <form className="edit-review" onSubmit={handleSubmit}>
                    <h3 className="editReview">New Review</h3>
                    <input
                        type="range"
                        name="rating"
                        value={rating}
                        min="0"
                        max="5"
                        onChange={(e) => setRating(e.target.value)}>
                    </input>
                    <input
                        type="textarea"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}>
                    </input>
                    <button className="button-1" type=" submit">
                        Update Review
                    </button>
                    <button className="button-1" onClick={(e) => deleteReview(e)}>
                        Delete Review
                    </button>
                </form>

            </section>
        </>
    )
}

export default EditReview
