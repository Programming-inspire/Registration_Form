import React, { useState } from 'react';
import './EditModal.css'; 

const EditModal = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState(user); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/Users/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      onClose(); 
      alert('Your details updated successfully, Refresh the page'); 
    } catch (error) {
      console.error('Error updating user:', error);
      
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span> {}
        <h2>Update User</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={editedUser.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <select id="country" name="country" value={editedUser.country} onChange={handleChange}>
              <option value="India">India</option>
              <option value="US">US</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" value={editedUser.comment} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label htmlFor="male">
                <input type="radio" id="male" name="gender" value="male" checked={editedUser.gender === 'male'} onChange={handleChange} />
                Male
              </label>
              <label htmlFor="female">
                <input type="radio" id="female" name="gender" value="female" checked={editedUser.gender === 'female'} onChange={handleChange} />
                Female
              </label>
            </div>
          </div>
          <button type="button" onClick={handleUpdate}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
