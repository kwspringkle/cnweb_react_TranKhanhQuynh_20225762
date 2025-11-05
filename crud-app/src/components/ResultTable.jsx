import React from "react";

function ResultTable({ keyword, user, onAdded }) { 
    const [users, setUsers] = React.useState([]); 
    const [loading, setLoading] = React.useState(true); 
    const filteredUsers = users.filter( 
    (u) => u.name.toLowerCase().includes(keyword.toLowerCase()) || 
    u.username.toLowerCase().includes(keyword.toLowerCase()) 
    );
// Tải dữ liệu 1 lần khi component mount 
    React.useEffect(() => { 
    fetch("https://jsonplaceholder.typicode.com/users") 
    .then(res => res.json()) 
    .then(data => { setUsers(data); setLoading(false); }); 
    }, []);

    return(
        <tbody>
            {filteredUsers.map((u) => (
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.address.city}</td>
                    <td>
                        <button onClick={() => editUser(u)}>Sửa</button>
                        <button onClick={() => removeUser(u.id)}>Xóa</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default ResultTable;
