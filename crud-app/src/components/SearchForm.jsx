import React from "react";

function SearchForm({ onChangeValue }){
    return(
        <input type="text" placeholder="Tìm kiếm người dùng"
        onChange={(e) => onChangeValue(e.target.value)} />
    )
}

export default SearchForm