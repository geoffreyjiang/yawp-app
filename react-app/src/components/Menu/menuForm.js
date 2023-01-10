import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addMenuItem } from "../../store/menu";

const addItem = () => {
    const user = useSelector((state) => state.session.user);
    const { bizId } = useParams;
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }
        const data = {
            businessId: bizId,
            item,
            price,
        };
        console.log(data);
        const newItem = await dispatch(addMenuItem(bizId, data));
        setPrice("");
        if (newItem) {
            history.push(`/biz/${bizId}`);
        }
    };
    return (
        <>
            <div className="add-menu-item-container">
                <form className="menu-form" onSubmit={handleSubmit}>
                    <h2>Add Menu Item</h2>
                    <div className="menu-input">
                        <label>Item</label>
                        <input
                            type="text"
                            name="item"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                        ></input>
                    </div>
                    <div className="menu-input">
                        <input
                            type="text"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </div>
                    <button className="submitBtn" type="submit">
                        Add Item
                    </button>
                </form>
            </div>
        </>
    );
};

export default addItem;
