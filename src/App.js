// App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UsersPage from './components/UsersPage';
import GroupsPage from './components/GroupsPage';
import Forbidden from './components/Forbidden';
import { AuthContext } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SettingsPage from './components/SettingsPage';
import ReportsPage from './components/ReportsPage';
import './App.css';

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} requiredPages={['Dashboard']} />} />
        <Route path="/users" element={<PrivateRoute component={UsersPage} requiredPages={['Users']} />} />
        <Route path="/groups" element={<PrivateRoute component={GroupsPage} requiredPages={['Groups']} />} />
        <Route path="/reports" element={<PrivateRoute component={ReportsPage} requiredPages={['Reports']} />} />
        <Route path="/settings" element={<PrivateRoute component={SettingsPage} requiredPages={['Settings']} />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<Navigate to={auth.isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </div>
  );
}

export default App;
