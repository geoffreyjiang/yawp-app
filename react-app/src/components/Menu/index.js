import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../../store/menu";
import { getBusinessId } from "../../store/business";
import "./menu.css";

const AddMenuItem = () => {
    const { bizId } = useParams();
    const user = useSelector((state) => state.session.user);
    const bizUser = useSelector((state) => state.business.userId);
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
                    {item.name}, ${item.price}
                </h4>
            </div>
        );
    });

    console.log(user.id, "LINE 32");
    let add;
    if (user.id === bizUser) {
        add = (
            <h3>
                <Link to={`/biz/${bizId}/menu`}>Add Menu Item</Link>
            </h3>
        );
    }

    return (
        <>
            <h3>Menu</h3>
            {add}
            <div className="menu-container">{items}</div>
        </>
    );
};

export default AddMenuItem;
