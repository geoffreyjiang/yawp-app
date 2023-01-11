import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addReview } from "../../store/reviews";
import { getBusinesses } from "../../store/business";

function EditReview({ user }) {
    const dispatch = useDispatch()
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(1)
    const [userId, setUserId] = useState(user?.id)
    const { bizId } = useParams()

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user) {
            setUserId(user?.id)
        }

        const payload = {
            bizId,
            userId,
            body
        }
        const createdReview = dispatch(addNewReview(bizId, payload))
        if (createdReview) {
            alert("Comment successfully added!")
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
                </form>

            </section>
        </>
    )
}

export default EditReview
