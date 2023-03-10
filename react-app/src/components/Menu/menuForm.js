import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addMenuItem } from "../../store/menu";

const AddItem = () => {
    const user = useSelector((state) => state.session.user);
    const { bizId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }
        const data = {
            businessId: Number(bizId),
            name,
            price,
        };
        // console.log(data);
        let newItem = dispatch(addMenuItem(bizId, data));
        if (newItem) {
            history.push(`/biz/${bizId}`);
            setPrice("");
        }
    };
    return (
        <>
            <div className="add-menu-item-container">
                <form className="menu-form" onSubmit={handleSubmit}>
                    <h2>Add Menu Item</h2>
                    <div className="menu-input">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="menu-input">
                        <label>
                            Price
                            <br />
                        </label>{" "}
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            min="0"
                            value={price}
                            required
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

export default AddItem;
