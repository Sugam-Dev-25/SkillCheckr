import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/authApi';

const AuthContext = createContext();

// Helper: JWT Expire Check (প্যাকেজ ছাড়াই বিশুদ্ধ JS দিয়ে টোকেন এক্সপায়ার চেক)
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const { exp } = JSON.parse(jsonPayload);
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true; // ফরম্যাট ভুল হলে Expired ধরা হবে
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // টোকেন না থাকলে বা টোকেনের মেয়াদ শেষ হলে ডাটা ক্লিয়ার করে দিন
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  // অ্যাপ ওপেন থাকা অবস্থায় সেশন এক্সপায়ার চেক
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      const userData = res.data.user || res.data.data;
      const token = res.data.token;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      if (token) localStorage.setItem('token', token);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await registerUser(formData);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // API রেসপন্স না পেলেও ক্লায়েন্ট ক্লিনআপ হবে
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);