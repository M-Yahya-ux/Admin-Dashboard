import './UsersPage.css';
import React, { useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User1', email: 'user1@example.com', group: 'Admin' },
    { id: 2, name: 'User2', email: 'user2@example.com', group: 'User' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', group: '' });
  const [editingUser, setEditingUser] = useState(null);

  // Add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.group) {
      setUsers([...users, { id: Date.now(), ...newUser }]);
      setNewUser({ name: '', email: '', group: '' }); // Reset the form
    }
  };

  // Edit an existing user
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="users-page-container">
      <h2 className="users-page-title">Users</h2>

      {/* Add User Form */}
      <div className="add-user-container">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Group"
          value={newUser.group}
          onChange={(e) => setNewUser({ ...newUser, group: e.target.value })}
        />
        <button className="btn add-btn" onClick={handleAddUser}>Add User</button>
      </div>

      {/* User List */}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {editingUser && editingUser.id === user.id ? (
              <>
                {/* Editing User Form */}
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editingUser.group}
                  onChange={(e) => setEditingUser({ ...editingUser, group: e.target.value })}
                />
                <button className="btn update-btn" onClick={handleUpdateUser}>Update</button>
              </>
            ) : (
              <>
                {/* Display User Info */}
                <span className="user-info">
                  {user.name} - {user.email} - Group: {user.group}
                </span>
                <button className="btn edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
