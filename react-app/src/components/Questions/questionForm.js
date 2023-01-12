import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postQuestion } from "../../store/questions";

const AskQuestion = () => {
    const user = useSelector((state) => state.session.user);
    // console.log(user);
    const { bizId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [body, setBody] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }
        const data = {
            userId: user.id,
            businessId: bizId,
            body,
        };
        let newQuestion = dispatch(postQuestion(bizId, data));
        if (newQuestion) {
            history.push(`/biz/${bizId}`);
            setBody("");
        }
    };
    return (
        <>
            <div className="create-question-container">
                <form className="question-form" onSubmit={handleSubmit}>
                    <h2>Ask a question</h2>
                    <textarea
                        type="text"
                        value={body}
                        name="question"
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <div>
                        <button className="submitBtn" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AskQuestion;
