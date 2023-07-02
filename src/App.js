import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUser } from './redux/slice/selectors';
import jwtDecode from 'jwt-decode';



import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import Department from './pages/department/department';
import DepartmentList from './pages/departmentList/DepartmentList';
import './App.css';

import Cookies from 'js-cookie';

function App() {
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    let tokenCheckInterval;
  
    if (token) {
      const isValidToken = checkTokenValidity(token);
  
      if (isValidToken) {
        setSaved(token);
      } else {
        handleInvalidToken();
      }
  
      // Thiết lập kiểm tra lại tính hợp lệ của token sau một khoảng thời gian (ví dụ: 5 phút)
      tokenCheckInterval = setInterval(() => {
        const updatedToken = Cookies.get('token');
  
        if (!updatedToken || !checkTokenValidity(updatedToken)) {
          handleInvalidToken();
          clearInterval(tokenCheckInterval);
        }
      }, 30 * 60 * 1000); // 5 phút (đơn vị: mili giây)
    }
  
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);

  // Xử lý khi token không hợp lệ
  function handleInvalidToken() {
    // Xóa token khỏi cookie và xử lý khác khi token không hợp lệ
    Cookies.remove('token');
    window.location.reload();

    // Xử lý khác khi token không hợp lệ (ví dụ: đăng xuất người dùng, chuyển hướng đến trang đăng nhập, ...)
  }

  // Hàm kiểm tra tính hợp lệ của token
  function checkTokenValidity(token) {
    try {
      // Giải mã token (đối với JWT)
      const decodedToken = jwtDecode(token);
  
      // Kiểm tra thời gian hết hạn
      const currentTime = Date.now() / 1000; // Thời gian hiện tại (đơn vị: giây)
  
      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn
        return false;
      }
  
      // Token hợp lệ
      return true;
    } catch (error) {
      // Lỗi giải mã token
      return false;
    }
  }
  return (
    <BrowserRouter>
      <Routes >
        <Route
          path="/login"
          element={saved !== null ? <Navigate to="/" replace /> : <Login />}
        />

        {saved !== null ? (
          <Route
            path="/"
            element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <Outlet /> 
                 
                
                </div>
              </>
            }
          >
            <Route index element={<Home />} />
                    <Route  path="users" element={<UserList />} />
                    <Route path="user/:userId" element={<User />} />
                    <Route path="newUser" element={<NewUser />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="product/:productId" element={<Product />} />
                    <Route path="newproduct" element={<NewProduct />} />
                    <Route path="department" element={<DepartmentList />} />
                    <Route path="department/:id" element={<Department />} />
                    
                    
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

