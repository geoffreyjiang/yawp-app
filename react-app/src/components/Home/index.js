import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getBusinesses, getBusinessId } from "../../store/business";
import { getQuestions } from "../../store/questions";
import { getSelectedBizReviews } from "../../store/reviews";
import Rating from "./Rating";
import ImageSlider from "./ImageSlider";
import NavBar from "../NavBar/NavBar";
import "./index.css";
const AllBiz = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const business = useSelector((store) => {
        return Object.values(store.business);
    });
    let test;
    // business.map((biz) => {
    //     console.log(biz.reviews[biz.reviews.length - 1], "TESTING ARRAY FUNC");
    // });
    const navToCreateBiz = () => {
        history.push("/biz");
    };
    useEffect(() => {
        dispatch(getBusinesses());
    }, [dispatch]);
    console.log(business, "BUSINESS");
    return (
        <>
            <ImageSlider />
            {/* <NavBar /> */}
            <h1 className="header">Yawp's Recommended Restaurants</h1>
            <div className="biz-preview">
                {business?.map((biz) => (
                    <div className="biz-container">
                        {biz.reviews != undefined && (
                            <>
                                {biz.reviews.length > 0 ? (
                                    <>
                                        <header className="header-card">
                                            <div>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {" "}
                                                    {
                                                        biz?.reviews[
                                                            biz.reviews.length -
                                                                1
                                                        ]?.firstName
                                                    }{" "}
                                                    {""}
                                                    {
                                                        biz?.reviews[
                                                            biz.reviews.length -
                                                                1
                                                        ]?.lastName
                                                    }{" "}
                                                </span>
                                            </div>
                                            <div>Wrote a review</div>
                                        </header>
                                        <div className="image-container">
                                            <img
                                                src={biz?.image}
                                                alt={biz?.name}
                                            />
                                        </div>
                                        <div className="biz-content">
                                            <div className="biz-info">
                                                <div className="biz-name">
                                                    <NavLink
                                                        to={`/biz/${biz.id}`}
                                                        onClick={() => {
                                                            dispatch(
                                                                getSelectedBizReviews(
                                                                    biz.id
                                                                )
                                                            );
                                                            dispatch(
                                                                getBusinessId(
                                                                    biz.id
                                                                )
                                                            );

                                                            dispatch(
                                                                getQuestions(
                                                                    biz.id
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {biz?.name}
                                                    </NavLink>
                                                </div>
                                            </div>

                                            <div className="review-info">
                                                <div
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Latest Review: {"\n"}
                                                </div>
                                                <div>
                                                    <Rating
                                                        value={
                                                            biz.reviews[
                                                                biz.reviews
                                                                    .length - 1
                                                            ].rating
                                                        }
                                                    />
                                                </div>
                                                <div className="actual-review">
                                                    {
                                                        biz?.reviews[
                                                            biz.reviews.length -
                                                                1
                                                        ]?.body
                                                    }
                                                </div>
                                                <div>
                                                    <h4 className="biz-review-info">
                                                        Biz Review Info
                                                    </h4>
                                                    <div className="reviews">
                                                        {/* <div>
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Total Reviews:{" "}
                                                            </span>
                                                            {
                                                                biz.numberOfReviews
                                                            }
                                                        </div> */}
                                                        <div>
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Biz Avg Review:{" "}
                                                            </span>
                                                            <Rating
                                                                value={
                                                                    biz.averageRating
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card--stats"></div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-review-container">
                                        <div className="image-container-no-review">
                                            <img
                                                src={biz?.image}
                                                alt={biz?.name}
                                            />
                                        </div>
                                        <div className="test-container">
                                            <div className="biz-name-no-review">
                                                <NavLink
                                                    to={`/biz/${biz.id}`}
                                                    onClick={() => {
                                                        dispatch(
                                                            getSelectedBizReviews(
                                                                biz.id
                                                            )
                                                        );
                                                        dispatch(
                                                            getBusinessId(
                                                                biz.id
                                                            )
                                                        );

                                                        dispatch(
                                                            getQuestions(biz.id)
                                                        );
                                                    }}
                                                >
                                                    {biz?.name}
                                                </NavLink>
                                            </div>

                                            <div className="first-review">
                                                Be the first to leave a review
                                                for {biz?.name}!
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllBiz;
