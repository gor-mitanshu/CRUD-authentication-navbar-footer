import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


function App () {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('userDetails');
    if (isAuthenticated === 'true' && user) {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userDetails', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserDetails(user);
    navigate('/dashboard');
    toast.success("Logged In Successfully")
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Confirm logout',
      text: "Are you sure you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userDetails');
        setIsLoggedIn(false);
        setUserDetails(null);
        navigate('/');
        toast.success("Logout Successfully");
      } else {
        return;
      }
    });
  };

  return (
    <Routes>
      <Route path="/" element={ <LandingPage isLoggedIn={ isLoggedIn } onLogin={ handleLogin } onLogout={ handleLogout } /> } >
        <Route path="/dashboard" element={ isLoggedIn ? <Dashboard onLogout={ handleLogout } userDetails={ userDetails } /> : <Navigate to="/" /> } />
      </Route>
    </Routes>
  );
}

export default App;
