import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './config/supabaseClient';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Members from './components/Members/Members';
import Events from './components/Events/Events';
import Navbar from './components/Layout/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} />}
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/members"
            element={user ? <Members user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/events"
            element={user ? <Events user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;