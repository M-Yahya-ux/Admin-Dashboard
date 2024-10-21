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
      setGroups([...groups, { id: Date.now(), name: newGroup.name, accessPages: newGroup.accessPages }]);
      setNewGroup({ name: '', accessPages: [] }); // Reset the form
    }
  };

  // Edit an existing group
  const handleEditGroup = (group) => {
    setEditingGroup(group);
  };

  const handleUpdateGroup = () => {
    const updatedGroup = { ...editingGroup };
    setGroups(groups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group)));
    setEditingGroup(null);
  };

  // Delete a group
  const handleDeleteGroup = (id) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  // Handle checkbox change for access pages
  const handleCheckboxChange = (page) => {
    if (editingGroup) {
      const updatedAccessPages = editingGroup.accessPages.includes(page)
        ? editingGroup.accessPages.filter((p) => p !== page)
        : [...editingGroup.accessPages, page];
      setEditingGroup({ ...editingGroup, accessPages: updatedAccessPages });
    } else {
      const updatedAccessPages = newGroup.accessPages.includes(page)
        ? newGroup.accessPages.filter((p) => p !== page)
        : [...newGroup.accessPages, page];
      setNewGroup({ ...newGroup, accessPages: updatedAccessPages });
    }
  };

  return (
    <div className="groups-page-container">
      <h2>Groups</h2>

      {/* Add Group Form */}
      <div className="add-group-container">
        <h3>Add New Group</h3>
        <input
          type="text"
          placeholder="Group Name"
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
        <button className="btn add-btn" onClick={handleAddGroup}>Add Group</button>
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
                  value={editingGroup.name}
                  onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                />
                <div className="checkbox-group">
                  <h4>Select Access Pages:</h4>
                  {availablePages.map((page) => (
                    <label key={page}>
                      <input
                        type="checkbox"
                        checked={editingGroup.accessPages.includes(page)}
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
