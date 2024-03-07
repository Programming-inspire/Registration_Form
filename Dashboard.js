import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/Users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setDeleteUserId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/Users/${deleteUserId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setShowDeleteModal(false);
      setUsers(users.filter(user => user.id !== deleteUserId));
      console.log(`User with ID ${deleteUserId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
     
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Comments</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.comment}</td>
                <td>{user.gender}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <EditModal user={selectedUser} onClose={handleCloseEditModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
