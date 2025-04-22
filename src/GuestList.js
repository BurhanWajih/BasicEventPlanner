import React, { useState } from 'react';

const GuestList = ({ guests, onToggleConfirmation, onToggleRSVP, onRemove, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedGuest, setEditedGuest] = useState({ name: '', email: '' });

  return (
    <div>
      <h2>Guest List</h2>

      {guests.length === 0 ? (
        <p>No guests added yet!</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id} className={guest.confirmed ? 'confirmed' : ''}>
              {editingId === guest.id ? (
                <>
                  <input
                    type="text"
                    value={editedGuest.name}
                    onChange={(e) =>
                      setEditedGuest({ ...editedGuest, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    value={editedGuest.email}
                    onChange={(e) =>
                      setEditedGuest({ ...editedGuest, email: e.target.value })
                    }
                  />
                  <button
                    onClick={() => {
                      onUpdate(guest.id, editedGuest);
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>
                    {guest.name} ({guest.email}) —{' '}
                    {guest.confirmed ? 'Confirmed' : 'Not Confirmed'} —{' '}
                    {guest.rsvp ? 'RSVPed' : 'Not RSVPed'}
                  </span>
                  <button onClick={() => onToggleConfirmation(guest.id)}>
                    {guest.confirmed ? 'Unconfirm' : 'Confirm'}
                  </button>
                  <button onClick={() => onToggleRSVP(guest.id)}>
                    {guest.rsvp ? 'Cancel RSVP' : 'RSVP'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(guest.id);
                      setEditedGuest({
                        name: guest.name,
                        email: guest.email,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => onRemove(guest.id)} className="remove-btn">
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestList;
