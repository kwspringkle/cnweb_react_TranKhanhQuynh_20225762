import React, { useState, useEffect } from "react";
// Bước 4: Thực hiện chức năng hiển thị bảng kết quả (result table)
function ResultTable({ keyword, user, onAdded }) {
    const [users, setUsers] = useState([]); // danh sách người dùng
    const [loading, setLoading] = useState(true); // trạng thái tải dữ liệu
    const [editing, setEditing] = useState(null); //Bước 6: Thực hiện chức năng sửa người dùng (edit user)

    // Lọc người dùng theo từ khóa, hàm tìm kiếm
    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(keyword.toLowerCase()) ||
            u.username.toLowerCase().includes(keyword.toLowerCase())
    );

    // Hàm bắt đầu sửa (bước 6)
    const editUser = (user) => {
    setEditing({ ...user, address: { ...user.address } }); // Tạo bản sao để sửa    
    };

    // Cập nhật khi nhập form sửa (bước 6)
    const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
        setEditing({
        ...editing,
        address: { ...editing.address, [field]: value },
        });
    } else {
        setEditing({ ...editing, [field]: value });
    }
    };

    // Lưu người dùng sau khi sửa (bước 6)
    const saveUser = () => {
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
    };

    // Xóa người dùng (bước 7)
    const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    // Fetch dữ liệu 1 lần khi mount
    useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
        setUsers(data);
        setLoading(false);
        });
    }, []);

    // Khi có người dùng mới được thêm (từ AddUser)
    useEffect(() => {
    if (user && user.name) {
        setUsers((prev) => [...prev, user]); // thêm vào danh sách hiện tại
        onAdded(); // gọi callback để reset state newUser trong App
    }
    }, [user]);

    if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <>
      {/* Nếu đang sửa thì hiển thị form ở trên bảng */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Ngăn chặn đóng modal khi click vào nội dung */}
            <h3>Sửa người dùng</h3>
            <div style={{ display: "grid", gap: 8 }}>
              <label>Tên: </label>
              <input type="text" value={editing.name} onChange={(e) => handleEditChange("name", e.target.value)} />

              <label> Tên đăng nhập: </label>
              <input type="text" value={editing.username} onChange={(e) => handleEditChange("username", e.target.value)} />

              <label> Email: </label>
              <input type="text" value={editing.email} onChange={(e) => handleEditChange("email", e.target.value)} />

              <label htmlFor="street">Địa chỉ (street):</label>
              <input id="street" value={editing.address.street} onChange={(e) => handleEditChange("street", e.target.value)} />

              <label htmlFor="suite">Địa chỉ (suite):</label>
              <input id="suite" value={editing.address.suite} onChange={(e) => handleEditChange("suite", e.target.value)} />

              <label htmlFor="city">Thành phố:</label>
              <input id="city" value={editing.address.city} onChange={(e) => handleEditChange("city", e.target.value)} />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
                <button onClick={() => setEditing(null)}>Hủy</button>
                <button onClick={saveUser}>Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Bảng hiển thị kết quả */}
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Địa chỉ (Street)</th>
            <th>Địa chỉ (Suite)</th>
            <th>Thành phố</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.street}</td>
              <td>{u.address.suite}</td>
              <td>{u.address.city}</td>
              <td>
                <button onClick={() => editUser(u)}>Sửa</button>
                <button onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ResultTable;
