import React, { useState, useEffect } from "react";

import {
    getBusinessId,
    getBusinesses,
    removeBusiness,
} from "../../store/business";
import { getSelectedBizReviews } from "../../store/reviews";
import { getQuestions } from "../../store/questions";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
const ViewBiz = () => {
    const dispatch = useDispatch();
    const { bizId } = useParams();
    const history = useHistory();
    const [showEdit, setShowEdit] = useState(false);
    const [editListingModal, setEditListingModal] = useState(false);
    const [selectedEditSpot, setSelectedEditModal] = useState();
    const biz = useSelector((store) => store.business);
    const store = useSelector((store) => console.log(store, "STORE"));
    const reviews = useSelector((store) => Object.values(store.reviews));

    const questions = useSelector((store) => Object.values(store.questions));

    const editListingOnClick = (bizId) => {
        console.log(bizId, "EDIT CLICK");
        setEditListingModal((editListingModal) => !editListingModal);
    };

    const deleteListingOnClick = (bizId) => {
        console.log(bizId, "DELETE CLICK");
        dispatch(removeBusiness(bizId));
        history.push("/");
        // window.location.reload();
    };

    // to get the user session data
    const user = useSelector((state) => state.session.user);
    // console.log(biz.userId, "BIG");

    // console.log(biz.id, user.id, "USER");
    // const handleDelete = () => dispatch(removeBusiness(biz.id, user.id));

    useEffect(() => {
        dispatch(getBusinessId(bizId));
        dispatch(getSelectedBizReviews(bizId));
        dispatch(getQuestions(bizId));
    }, [dispatch]);
    // console.log(bizId, "line 54 SINGLE BIZ");
    return (
        <>
            <div>
                <h1>Biz Details</h1>
                <h3>{biz.name}</h3>
                <h3>{biz.username}</h3>
                {user.id == biz.userId ? (
                    <>
                        <button>Edit Biz Details</button>
                        <button>Delete Button</button>
                    </>
                ) : null}

                {/* <div>
                    <EditListingFormModal
                        showModal={editListingModal}
                        setShowModal={() => editListingModal}
                        // nameInitialValue={initialNameValue}
                        id={biz.id}
                    />
                </div> */}
                <h4>
                    <img className="biz-img" src={biz.image}></img>
                </h4>
                <h2>
                    Location: {biz.address1}, {biz.city}, {biz.state}
                </h2>
            </div>
        </>
    );
};

export default ViewBiz;
