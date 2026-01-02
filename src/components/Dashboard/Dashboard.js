import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import './Dashboard.css';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    totalMembers: 0,
    upcomingEvents: 0,
    departments: 0,
    totalEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch members count
      const { count: membersCount } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true });

      // Fetch events
      const { data: events } = await supabase
        .from('events')
        .select('*');

      // Calculate upcoming events
      const now = new Date();
      const upcomingEvents = events?.filter(e => new Date(e.date) >= now).length || 0;

      // Fetch unique departments
      const { data: members } = await supabase
        .from('members')
        .select('department');
      
      const uniqueDepartments = [...new Set(members?.map(m => m.department))].length;

      setStats({
        totalMembers: membersCount || 0,
        upcomingEvents,
        departments: uniqueDepartments,
        totalEvents: events?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalMembers}</h3>
            <p>Total Members</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-info">
            <h3>{stats.departments}</h3>
            <p>Departments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <h3>{stats.totalEvents}</h3>
            <p>Total Events</p>
          </div>
        </div>
      </div>
      <div className="welcome-section">
        <h2>Welcome to Club Management System</h2>
        <p>Manage your club members and events efficiently</p>
      </div>
    </div>
  );
}

export default Dashboard;