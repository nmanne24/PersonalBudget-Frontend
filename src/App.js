import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";
import HomePage from "./HomePage/HomePage";
import Menu from "./Menu/Menu";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard/Dashboard";
import ConfigureBudgets from "./ConfigureBudgets/ConfigureBudgets";
import ManageExpense from "./ManageExpense/ManageExpense";
import Visuals from "./Visuals/visuals";
import { useEffect, useRef, useState } from "react";
import TokenExpirationPopup from "./TokenExpiration";
import axios from "axios";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const intervalIdRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogged = localStorage.getItem('isLoggedIn') === 'true';

      if (isLogged) {
        const storedExpirationTime = parseInt(localStorage.getItem('expirationTime'), 10);

        if (storedExpirationTime && storedExpirationTime > Date.now()) {
          intervalIdRef.current = setInterval(() => {
            const remainingTime = storedExpirationTime - Date.now();

            if (remainingTime <= 0) {
              handleLogout();
            } else if (remainingTime <= 20000) {
              setShowPopup(true);
            }
          }, 1000);
        }
      }
    };

    checkLoginStatus();

    return () => clearInterval(intervalIdRef.current);
  }, [isLoggedIn]);

  const handleRefresh = async () => {
    const newExpirationTime = Date.now() + 60000;
    setShowPopup(false);

    localStorage.setItem('expirationTime', newExpirationTime.toString());
    const userId = localStorage.getItem('userId');

    clearInterval(intervalIdRef.current);

    const newIntervalId = setInterval(async () => {
      const remainingTime = newExpirationTime - Date.now();

      try {
        const response = await axios.post(`https://personalbudget-backend.onrender.com/refresh-token/${userId}`);
        const newToken = response.data.token;

        localStorage.setItem('token', newToken);
      } catch (error) {
        console.error('Error refreshing token:', error);
      }

      if (remainingTime <= 0) {
        handleLogout();
      } else if (remainingTime <= 20000) {
        setShowPopup(true);
      }
    }, 1000);

    intervalIdRef.current = newIntervalId;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    window.location.href = '/login';
  };

  const setLoggedIn = (flag) => {
    setIsLoggedIn(flag);
  };

  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Hero />
        <div className="mainContainer">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage callBack={setLoggedIn} />} />
            <Route path="/configure-budgets" element={<ConfigureBudgets />} />
            <Route path="/add-expense" element={<ManageExpense />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Visual" element={<Visuals />} />
          </Routes>
        </div>
        {showPopup && (
          <TokenExpirationPopup
            onRefresh={handleRefresh}
            onClose={handleLogout}
          />
        )}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
