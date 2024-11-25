import React, { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem('users')) || [];
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    group: '',
    username: '',  // Add username field
    password: '',
    confirmPassword: '',
  });

  const [groups, setGroups] = useState(() => {
    return ['Admin', 'User'];
  });

  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.group || !newUser.username || !newUser.password || !newUser.confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(newUser.email)) {
      setError('Invalid email format');
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newUser.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');

    const newUserData = { id: Date.now(), ...newUser };
    const updatedUsers = [...users, newUserData];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setNewUser({
      name: '',
      email: '',
      group: '',
      username: '',  // Clear username as well
      password: '',
      confirmPassword: '',
    });

    if (!groups.includes(newUser.group)) {
      setGroups([...groups, newUser.group]);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="users-page-container">
      <h2 className="users-page-title">Users</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="add-user-container">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}  // Handle username input
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
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
        <select
          value={newUser.group}
          onChange={(e) => setNewUser({ ...newUser, group: e.target.value })}
        >
          <option value="">Select Group</option>
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <PasswordStrengthBar password={newUser.password} />
        <input
          type="password"
          placeholder="Confirm Password"
          value={newUser.confirmPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, confirmPassword: e.target.value })
          }
        />
        <button className="btn add-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {editingUser && editingUser.id === user.id ? (
              <>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
                <select
                  value={editingUser.group}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, group: e.target.value })
                  }
                >
                  {groups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <button className="btn update-btn" onClick={handleUpdateUser}>
                  Update
                </button>
              </>
            ) : (
              <>
                <span className="user-info">
                  {user.username} - {user.name} - {user.email} - Group: {user.group}
                </span>
                <button
                  className="btn edit-btn"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
