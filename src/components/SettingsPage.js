// SettingsPage.js
import React from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div>
      <h2>Settings</h2>
      <p>This is the Settings page. Here you can configure the application settings.</p>
      <form>
        <div>
          <label>
            <input type="checkbox" /> Enable Notifications
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" /> Dark Mode
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;
