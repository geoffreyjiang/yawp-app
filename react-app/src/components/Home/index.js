import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBusinesses } from "../../store/business";
import { getSelectedBizReviews } from "../../store/reviews";

const AllBiz = () => {
    const biz = useSelector((store) => console.log(store));
    console.log(biz);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBusinesses());
    });
    return <h1>we are here</h1>;
};

export default AllBiz;
