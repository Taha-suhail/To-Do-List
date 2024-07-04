import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";

import "./TodoList.css";

function ToDoList(props) {
    const [check, setCheck] = useState(false);
    const [editInput, setEditInput] = useState(props.item);
    const [isEditing, setIsEditing] = useState(false);

    const isChecked = () => {
        setCheck(!check);  // the value evaluate when u click on the task text inside the div
    };

    const startEditItem = () => {
        setIsEditing(true);
    };

    const changeEditItem = (e) => {
        setEditInput(e.target.value);
    };

    const saveEditItem = () => {
        props.onEdit(props.id, editInput);
        setIsEditing(false);
    };

    return (
        <div className="items">
            <div className="check_boxes">
                <IoIosCheckbox className="tick" onClick={isChecked} />
                <MdDelete onClick={() => props.onSelect(props.id)} />
            </div>
            {isEditing ? (
                <input
                    type="text"
                    value={editInput}
                    onChange={changeEditItem}
                    onBlur={saveEditItem}
                    autoFocus
                    className="editing_input"
                />
            ) : (
                <div onClick={startEditItem} style={{ textDecoration: check ? "line-through" : "none",color:check?"grey":"#ffdfdb"}}>
                    {props.item}
                </div>
            )}
        </div>
    );
}

export default ToDoList;
