import React from "react";

// Bước 3: Thực hiện chức năng tìm kiếm (search form)

function SearchForm({ onChangeValue }){
    // Gọi hàm onChangeValue (được truyền từ component cha) khi giá trị input thay đổi
    return(
        <div className="search-wrap">
            <input
                className="search-input"
                type="text"
                placeholder="Tìm theo name, username"
                onChange={(e) => onChangeValue(e.target.value)}
            />
        </div>
        // Gọi hàm onChangeValue (được truyền từ component cha) khi giá trị input thay đổi
    )
}
//Người dùng nhập, app cập nhật người dùng mới, result table hiển thị người dùng mới
export default SearchForm