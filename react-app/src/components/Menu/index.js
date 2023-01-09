import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../../store/menu";
import "./menu.css";

const MenuItems = () => {
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
                {items}
            </div>
        </>
    );
};

export default MenuItems;
