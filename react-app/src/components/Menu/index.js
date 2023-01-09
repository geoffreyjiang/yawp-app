import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../../store/menu";
const MenuItems = () => {
    const { bizId } = useParams();
    const menu = useSelector((store) => {
        return Object.values(store.menu);
    });
    // console.log(menu);
    // console.log(bizId, "LINE 12");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMenu(bizId));
    }, [dispatch, bizId]);
    return <></>;
};

export default MenuItems;
