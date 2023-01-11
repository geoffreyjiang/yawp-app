import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { getBusinesses, getBusinessId } from "../../store/business";
import { getQuestions } from "../../store/questions";
import { getSelectedBizReviews } from "../../store/reviews";
import "./index.css";
const AllBiz = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const business = useSelector((store) => {
        return Object.values(store.business);
    });

    // business.map((biz) => {
    //     console.log(
    //         biz?.reviews[0]?.body,
    //         biz?.reviews[0]?.rating,
    //         "WHAT IS THIS"
    //     );
    // });
    const navToCreateBiz = () => {
        history.push("/biz");
    };
    useEffect(() => {
        dispatch(getBusinesses());
    }, [dispatch]);

    return (
        <>
            <div className="biz-preview">
                {business?.map((biz) => (
                    <div className="biz-container">
                        <div>{biz?.reviews[0]?.firstName}</div>
                        <div>Wrote a review</div>
                        <div className="image-container">
                            <img src={biz?.image} alt={biz?.name} />
                        </div>
                        <div className="biz-content">
                            <div className="biz-name">
                                <NavLink
                                    to={`/biz/$biz.id`}
                                    onClick={() => {
                                        dispatch(getBusinessId(biz.id));
                                        dispatch(getSelectedBizReviews(biz.id));
                                        dispatch(getQuestions(biz.id));
                                    }}
                                >
                                    {biz?.name}
                                </NavLink>
                            </div>
                            {/* <div>
                                Location: {biz?.city}, {biz?.state}{" "}
                            </div>
                            <div className="review-details">
                                <div>Average Review: {biz?.averageRating}</div>
                                <div>
                                    Number of Reviews: {biz?.numberOfReviews}
                                </div>
                            </div> */}
                            <div>
                                {biz?.reviews[0]?.firstName}'s Review: {"\n"}
                            </div>
                            <div>{biz?.reviews[0]?.body}</div>
                            <div className="card--stats">
                                {/* <img src={star} className="card--star" /> */}
                                <div> Average Rating: {biz.averageRating}</div>
                                <div className="gray">
                                    Number of Reviews: {biz.numberOfReviews}
                                </div>
                                <div>
                                    Location: {biz?.city}, {biz?.state}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="create_biz_button">
                <button onClick={navToCreateBiz}>Register A Business</button>
            </div>
        </>
    );
};

export default AllBiz;
