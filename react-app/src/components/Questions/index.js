import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getQuestions } from "../../store/questions";

import "./questions.css";
const AllQuestions = () => {
    const { bizId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const q = useSelector((store) => {
        return Object.values(store.questions);
    });
    useEffect(() => {
        dispatch(getQuestions(bizId));
    }, [dispatch, bizId]);

    // console.log(q);
    const allQuestions = q.map((questions) => {
        return (
            <div className="question-item">
                <h4>
                    {questions.body} - {questions.username}
                </h4>
                <div to={`/question/${questions.id}`}>
                    Answer this question (Coming Soon)
                </div>
            </div>
        );
    });
    return (
        <>
            <h3>
                Questions
                <button onClick={() => history.push(`/biz/${bizId}/questions`)}>
                    Ask a question
                </button>
            </h3>
            <div className="questions-container">{allQuestions}</div>
        </>
    );
};

export default AllQuestions;
