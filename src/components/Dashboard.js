// Dashboard.js
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Ensure to create this CSS file for styling

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(''); // Track selected section

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/users" onClick={() => setSelectedSection('Users')}>Manage Users</Link>
            </li>
            <li>
              <Link to="/groups" onClick={() => setSelectedSection('Groups')}>Manage Groups</Link>
            </li>
            <li>
              <Link to="/reports" onClick={() => setSelectedSection('Reports')}>Reports</Link>
            </li>
            <li>
              <Link to="/settings" onClick={() => setSelectedSection('Settings')}>Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <h2>{selectedSection ? `Selected: ${selectedSection}` : 'Select a section from the sidebar'}</h2>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default Dashboard;
