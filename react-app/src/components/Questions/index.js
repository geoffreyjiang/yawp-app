import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getQuestions } from "../../store/questions";
import "./questions.css";
const AllQuestions = () => {
    const { bizId } = useParams();
    const dispatch = useDispatch();
    const q = useSelector((store) => {
        return Object.values(store.questions);
    });
    useEffect(() => {
        dispatch(getQuestions(bizId));
    }, [dispatch, bizId]);

    console.log(q);
    const allQuestions = q.map((questions) => {
        return (
            <div className="question-item">
                <div className="question-body-container">
                    <h4>{questions.body}</h4>
                </div>
            </div>
        );
    });
    // console.log(biz.id, "QUESTIONS COMPONENT");
    return (
        <>
            <div className="questions-container">{allQuestions}</div>
        </>
    );
};

export default AllQuestions;
