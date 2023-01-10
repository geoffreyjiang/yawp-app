import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBusinesses, getBusinessId } from "../../store/business";
import { getQuestions } from "../../store/questions";
import { getSelectedBizReviews } from "../../store/reviews";
import ReviewForm from "../ReviewForm";
import "./index.css";
const AllBiz = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const business = useSelector((store) => {
        return Object.values(store.business);
    });

    useEffect(() => {
        dispatch(getBusinesses());
    }, [dispatch]);

    return (
        <>
            <div className="biz-preview">
                {business.map((biz) => (
                    <div className="biz-container">
                        <div className="image-container">
                            <img src={biz.image} alt={biz.name} />
                        </div>
                        <div className="biz-content">
                            <div className="bizName">{biz.name}</div>
                            <div>
                                Location: {biz.city}, {biz.state}{" "}
                            </div>
                            <div className="review-details">
                                <div>Average Review: {biz.averageRating}</div>
                                <div>
                                    Number of Reviews: {biz.numberOfReviews}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    history.push(`/biz/${biz.id}`);
                                    // dispatch(getBusinessId(biz.id));
                                    // dispatch(getSelectedBizReviews(biz.id));
                                    <ReviewForm />
                                    // dispatch(getQuestions(biz.id));
                                }}
                            >
                                View Business
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllBiz;
