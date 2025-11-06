import React, { useState } from "react";

function AddUser({ onAdd }) {
    // trạng thái hiển thị form cho người dùng
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });
  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser({
        ...user,
        address: { ...user.address, [id]: value }
      });
    } else {
      setUser({ ...user, [id]: value });
    }
  };
    // Xử lý thêm người dùng
  const handleAdd = () => {
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });
    setAdding(false);
  };

  return (
    <div>
      <button onClick={() => setAdding(true)} className="add-user-button">Thêm người dùng mới</button>
      {adding && ( //Hiển thị form thêm ng dùng mới
        <div className="modal-overlay" onClick={() => setAdding(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Ngăn chặn đóng modal khi click vào nội dung */}
            <h3>Thêm người dùng</h3>
            <div style={{ display: "grid", gap: 8 }}>
                <label htmlFor="name">Tên:</label>
                <input id="name" value={user.name} onChange={handleChange} />

                <label htmlFor="username">Tên đăng nhập:</label>
                <input id="username" value={user.username} onChange={handleChange} />

                <label htmlFor="email">Email:</label>
                <input id="email" value={user.email} onChange={handleChange} />

                <label htmlFor="street">Địa chỉ (street):</label>
                <input id="street" value={user.address.street} onChange={handleChange} />

                <label htmlFor="suite">Địa chỉ (suite):</label>
                <input id="suite" value={user.address.suite} onChange={handleChange} />

                <label htmlFor="city">Thành phố:</label>
                <input id="city" value={user.address.city} onChange={handleChange} />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
                <button onClick={() => setAdding(false)}>Hủy</button>
                <button onClick={handleAdd}>Lưu</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;
