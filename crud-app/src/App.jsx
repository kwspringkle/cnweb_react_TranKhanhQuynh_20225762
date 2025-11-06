import { useState } from 'react'
import './App.css'
import SearchForm from "./components/SearchForm"
import AddUser from "./components/AddUser"
import ResultTable from "./components/ResultTable"
import ReactDOM from 'react-dom/client';

// Bước 1: Thiết lập cấu trúc react cơ bản: sử dụng Vite để tạo project react,
// thay vì tạo file html rồi thêm thư viện cần thiết qua cdn

// Tạo component gốc App, render bằng DOM, sau đó tổ chức lại component và các state tập trung ở App
// App: quản lý toàn bộ state và truyền props cho các component con. 

function App() {
  const [kw, setKeyword] = useState(""); // keyword để lọc
  const [newUser, setNewUser] = useState([]); // người dùng mới thêm vào

  //Dữ liệu cần chia sẻ phải được lưu trữ ở component cha và truyền xuống qua props
  //Các hàm cập nhật state được truyền xuống component con thông qua Props
  
  return(
    <div>
      <h1>Quản lý người dùng</h1>
      <SearchForm onChangeValue = {setKeyword} /> {/* Component tìm kiếm, truyền hàm setKeyword để cập nhật keyword */}
      <AddUser onAdd = {setNewUser} /> {/* Component thêm người dùng, truyền hàm setNewUser để cập nhật người dùng mới */}
      <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} /> 
        {/* Component bảng kết quả, truyền keyword và người dùng mới để hiển thị */}
    </div>
  )
}

//Vite đã render App trong file main.jsx nên không cần đoạn code dưới nữa
// const root = ReactDOM.createRoot(document.getElementById('root')); // Tạo root DOM
// root.render(<App />); // Render component App vào root DOM 


export default App
