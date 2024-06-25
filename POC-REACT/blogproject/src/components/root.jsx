import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';
import Postlist from '../components/posts';
import CreateEditPost from '../components/createEdit';  // Import the CreateEditPost component
import App from '../components/app';
import { DetailPage } from './detailPage';

const Root = () => {
  const storedAdminCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

  // Checking and setting default admin credentials if they don't exist

  if (!storedAdminCredentials) {
    const defaultAdminCredentials = {
      email: 'admin@gmail.com',
      password: 'admin123#',
    };
    localStorage.setItem('adminCredentials', JSON.stringify(defaultAdminCredentials));
  }

  // State to manage admin login status
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem('isAdminLoggedIn') === 'true'
  );

  // Update local storage when admin login status changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);


  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={isAdminLoggedIn ? <Navigate to="/" /> : <LoginForm setIsAdminLoggedIn={setIsAdminLoggedIn} />}
        />
        <Route
          path="/post-list"
          element={isAdminLoggedIn ? <Postlist /> : <Navigate to="/admin" />}
        />
        <Route
          path="/create-post"
          element={isAdminLoggedIn ? <CreateEditPost /> : <Navigate to="/admin" />}
        />
        <Route
          path="/edit-post/:postId"
          element={isAdminLoggedIn ? <CreateEditPost /> : <Navigate to="/admin" />}
        />
        <Route path="/" element={<App />} />
        <Route path="/detail-page" element={<DetailPage />} />
        <Route path="/detail-page/:postId" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default Root;

