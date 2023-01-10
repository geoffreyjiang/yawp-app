import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../../store/menu";
import "./menu.css";

const AddMenuItem = () => {
    const { bizId } = useParams();
    const m = useSelector((store) => {
        return Object.values(store.menu);
    });
    // console.log(menu);
    // console.log(bizId, "LINE 12");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMenu(bizId));
    }, [dispatch, bizId]);
    const items = m.map((item) => {
        return (
            <div className="menu-item-container">
                <h4>
                    {item.name}, $ {item.price}
                </h4>
            </div>
        );
    });

    return (
        <>
            <div className="menu-container">
                <h3>Menu</h3>
                <Link to={`/biz/${bizId}/menu`}>Add Menu Item</Link>
                {items}
            </div>
        </>
    );
};

export default AddMenuItem;