import React, { useState } from "react";

function AddUser({ onAdd }){
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name) return;
        onAdd({ id: Date.now(), name});
        setName("");
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Nhập tên người dùng"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Thêm</button>
        </form>
    )
}

export default AddUser;