import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewReview } from "../../store/reviews";
import "./CreateReview.css"
import Rating from "../Home/Rating";

function PostReview() {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(1)
    const [userId, setUserId] = useState(sessionUser.id)
    const { bizId } = useParams()
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
        const createdReview = dispatch(addNewReview(bizId, payload))
        console.log(createdReview, "<=== REVIEW")
        if (createdReview) {
            alert("Review successfully added!")
            setBody("")
            setRating(0)
            history.push(`/biz/${bizId}`)
        }
    }
    return (
        <>
            <section className="new-review">
                <form class="make-new-review" className="make-new-review" onSubmit={handleSubmit}>
                    <h3 className="review-element">New Review</h3>
                    <input
                        class="review-element"
                        type="range"
                        name="rating"
                        value={rating}
                        min="0"
                        max="5"
                        onChange={(e) => setRating(e.target.value)}>
                    </input>
                    <label class="review-element">{rating}</label>

                    <input
                        class="review-element"
                        type="textarea"
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}>
                    </input>
                    <button className="review-element" type=" submit">
                        Post Review
                    </button>
                </form>

            </section>
        </>
    )
}

export default PostReview
