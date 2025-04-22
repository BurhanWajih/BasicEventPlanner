import React, { useState } from 'react';

const GuestForm = ({ onAddGuest }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const guest = { name, email };
    console.log('New Guest:', guest);
    onAddGuest(guest);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Guest Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Guest Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Add Guest</button>
    </form>
  );
};

export default GuestForm;
