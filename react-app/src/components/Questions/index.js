import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getBusinesses } from "../../store/business";
import { getQuestions } from "../../store/questions";
import { getMenu } from "../../store/menu";
const AllQuestions = () => {
    const q = useSelector((store) => console.log(store));
    console.log(q);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuestions());
        dispatch(getMenu());
    });
    return <h1>yo</h1>;
};

export default AllQuestions;
