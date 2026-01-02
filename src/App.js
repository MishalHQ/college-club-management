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
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured
    if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
      setConfigError(true);
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error('Session error:', error);
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

  // Show configuration error screen
  if (configError) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '600px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '20px' }}>⚠️ Configuration Required</h2>
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            Supabase environment variables are missing. Please follow these steps:
          </p>
          <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li>Create a <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>.env</code> file in the project root</li>
            <li>Add your Supabase credentials:
              <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '6px', marginTop: '10px', overflow: 'auto' }}>
{`REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key`}
              </pre>
            </li>
            <li>Restart the development server: <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>npm start</code></li>
          </ol>
          <p style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '6px', borderLeft: '4px solid #ffc107' }}>
            <strong>Need help?</strong> Check <code>SETUP_GUIDE.md</code> for detailed instructions.
          </p>
        </div>
      </div>
    );
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