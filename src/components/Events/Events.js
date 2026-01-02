import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import './Events.css';

function Events({ user }) {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    venue: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          attendance (
            id,
            marked_at
          )
        `)
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          user_id: user.id,
          title: formData.title,
          date: formData.date,
          description: formData.description,
          venue: formData.venue
        }]);

      if (error) throw error;

      setFormData({ title: '', date: '', description: '', venue: '' });
      setShowForm(false);
      fetchEvents();
    } catch (error) {
      alert('Error creating event: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (eventId) => {
    try {
      // Get a random member to mark attendance (in real app, you'd select specific member)
      const { data: members } = await supabase
        .from('members')
        .select('id')
        .limit(1);

      if (!members || members.length === 0) {
        alert('Please add members first before marking attendance');
        return;
      }

      const { error } = await supabase
        .from('attendance')
        .insert([{
          event_id: eventId,
          member_id: members[0].id
        }]);

      if (error) {
        if (error.code === '23505') {
          alert('Attendance already marked for this member');
        } else {
          throw error;
        }
      } else {
        fetchEvents();
      }
    } catch (error) {
      alert('Error marking attendance: ' + error.message);
    }
  };

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
  const pastEvents = events.filter(e => new Date(e.date) < new Date());

  if (loading && events.length === 0) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>Events Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : '+ Create Event'}
        </button>
      </div>

      {showForm && (
        <div className="event-form">
          <h3>Create New Event</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={formData.venue}
              onChange={(e) => setFormData({...formData, venue: e.target.value})}
              required
            />
            <textarea
              placeholder="Event Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows="4"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>
      )}

      <div className="events-section">
        <h2>Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <div className="no-events">No upcoming events. Create your first event!</div>
        ) : (
          <div className="events-grid">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.title}</h3>
                <p className="event-date">📅 {new Date(event.date).toLocaleString()}</p>
                <p className="event-venue">📍 {event.venue}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span>Attendance: {event.attendance?.length || 0}</span>
                  <button onClick={() => markAttendance(event.id)} className="btn-attendance">
                    Mark Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pastEvents.length > 0 && (
        <div className="events-section">
          <h2>Past Events</h2>
          <div className="events-grid">
            {pastEvents.map(event => (
              <div key={event.id} className="event-card past">
                <h3>{event.title}</h3>
                <p className="event-date">📅 {new Date(event.date).toLocaleString()}</p>
                <p className="event-venue">📍 {event.venue}</p>
                <p className="event-description">{event.description}</p>
                <div className="event-footer">
                  <span>Total Attendance: {event.attendance?.length || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;