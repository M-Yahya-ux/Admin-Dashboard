import React, { useState } from 'react';
import './GroupsPage.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Admin', accessPages: ['Dashboard', 'Users', 'Groups'] },
    { id: 2, name: 'User', accessPages: ['Dashboard'] },
  ]);

  const [newGroup, setNewGroup] = useState({ name: '', accessPages: [] });
  const [editingGroup, setEditingGroup] = useState(null);

  const availablePages = ['Dashboard', 'Users', 'Groups', 'Reports', 'Settings'];

  // Add a new group
  const handleAddGroup = () => {
    if (newGroup.name && newGroup.accessPages.length > 0) {
      const newGroupObj = { id: Date.now(), name: newGroup.name, accessPages: newGroup.accessPages };
      setGroups([...groups, newGroupObj]);
      setNewGroup({ name: '', accessPages: [] }); // Reset the form
    }
  };

  // Edit an existing group
  const handleEditGroup = (group) => {
    setEditingGroup(group);
    // Copy the group's data to newGroup for editing
    setNewGroup({ name: group.name, accessPages: [...group.accessPages] });
  };

  const handleUpdateGroup = () => {
    // Update the group with new permissions
    const updatedGroups = groups.map(group =>
      group.id === editingGroup.id
        ? { ...group, name: newGroup.name, accessPages: newGroup.accessPages }
        : group
    );
    setGroups(updatedGroups);
    setEditingGroup(null); // Exit the editing mode
    setNewGroup({ name: '', accessPages: [] }); // Reset the form
  };

  // Delete a group
  const handleDeleteGroup = (id) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  // Handle checkbox change for access pages
  const handleCheckboxChange = (page) => {
    const updatedAccessPages = newGroup.accessPages.includes(page)
      ? newGroup.accessPages.filter((p) => p !== page)
      : [...newGroup.accessPages, page];
    setNewGroup({ ...newGroup, accessPages: updatedAccessPages });
  };

  return (
    <div className="groups-page-container">
      <h2>Groups</h2>

      {/* Add Group Form */}
      <div className="add-group-container">
        <h3>{editingGroup ? 'Edit Group' : 'Add New Group'}</h3>

        {/* Dropdown to select a group */}
        <div>
          <h4>Select Group to Edit (or leave blank for new group):</h4>
          <select
            value={newGroup.name || ''}
            onChange={(e) => {
              const selectedGroup = groups.find((group) => group.name === e.target.value);
              if (selectedGroup) {
                setNewGroup({ name: selectedGroup.name, accessPages: selectedGroup.accessPages });
                setEditingGroup(selectedGroup); // If a group is selected, set for editing
              } else {
                setNewGroup({ name: '', accessPages: [] });
                setEditingGroup(null); // Reset if no group is selected
              }
            }}
          >
            <option value="">-- Select a Group --</option>
            {groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="checkbox-group">
          <h4>Select Access Pages:</h4>
          {availablePages.map((page) => (
            <label key={page}>
              <input
                type="checkbox"
                checked={newGroup.accessPages.includes(page)}
                onChange={() => handleCheckboxChange(page)}
              />
              {page}
            </label>
          ))}
        </div>

        {/* Add or Update Group Button */}
        <button
          className={`btn ${editingGroup ? 'update-btn' : 'add-btn'}`}
          onClick={editingGroup ? handleUpdateGroup : handleAddGroup}
        >
          {editingGroup ? 'Update Group' : 'Add Group'}
        </button>
      </div>

      {/* Group List */}
      <ul className="group-list">
        {groups.map((group) => (
          <li key={group.id} className="group-item">
            {editingGroup && editingGroup.id === group.id ? (
              <>
                {/* Editing Group Form */}
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
                <div className="checkbox-group">
                  <h4>Select Access Pages:</h4>
                  {availablePages.map((page) => (
                    <label key={page}>
                      <input
                        type="checkbox"
                        checked={newGroup.accessPages.includes(page)}
                        onChange={() => handleCheckboxChange(page)}
                      />
                      {page}
                    </label>
                  ))}
                </div>
                <button className="btn update-btn" onClick={handleUpdateGroup}>Update</button>
              </>
            ) : (
              <>
                {/* Display Group Info */}
                <span className="group-info">
                  {group.name} - Access Pages: {group.accessPages.join(', ')}
                </span>
                <button className="btn edit-btn" onClick={() => handleEditGroup(group)}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDeleteGroup(group.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsPage;
