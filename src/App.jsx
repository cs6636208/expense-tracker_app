import React, { useState, useEffect } from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import Login from "./components/Login";
import {
  onAuthChange,
  loginUser,
  registerUser,
  logoutUser,
} from "./firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    const result = await loginUser(email, password);
    if (!result.success) {
      throw new Error(result.error);
    }
  };

  const handleRegister = async (email, password, displayName) => {
    const result = await registerUser(email, password, displayName);
    if (!result.success) {
      throw new Error(result.error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="App">
      <ExpenseTracker user={user} onLogout={handleLogout} />
    </div>
  );
}

export default App;
