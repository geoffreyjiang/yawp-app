import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewReview } from "../../store/reviews";

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
                <form className="make-new-review" onSubmit={handleSubmit}>
                    <h3 className="newReview">New Review</h3>
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
                        Post Review
                    </button>
                </form>

            </section>
        </>
    )
}

export default PostReview