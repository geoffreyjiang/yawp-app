import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenu } from "../../store/menu";
import { getBusinessId } from "../../store/business";
import "./menu.css";

const AddMenuItem = () => {
    const { bizId } = useParams();
    const history = useHistory();
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
            <>
                <h4>{item.name}</h4>
                <h4 className="item-border">${item.price}</h4>
            </>
        );
    });

    // console.log(user.id, "LINE 32");
    let add;
    if (user.id === bizUser) {
        add = (
            <buttom
                className="add-menu"
                onClick={() => history.push(`/biz/${bizId}/menu`)}
            >
                Add Menu Item
            </buttom>
        );
    }

    return (
        <>
            <h3>Menú {add}</h3>
            <div className="menu-container">{items}</div>
        </>
    );
};

export default AddMenuItem;
