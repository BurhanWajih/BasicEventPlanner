import React, { useState } from 'react';
import {useEffect} from 'react';
import GuestForm from './GuestForm';
import GuestList from './GuestList';
import './App.css'; 


const App = () => {
  const [guests, setGuests] = useState([
    { id: 1, name: 'Muhammad Ali', email: 'M.ali@seecs.edu.pk', confirmed: false, rsvp: false  },
    { id: 2, name: 'Ahmed khan', email: 'Ahmedbscs23seecs@seecs.edu.pk', confirmed: true, rsvp: true},
  ])
  useEffect(() => {
    console.log("🟢 useEffect → guests state updated:", guests);
  }, [guests]);
  ;

  const addGuest = (guest) => {
    setGuests([
      ...guests,
      { ...guest, id: Date.now(), confirmed: false, rsvp: false }
    ]);
  };
  const removeGuest = (id) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
  };
  
  const toggleRSVP = (id) => {
    setGuests((prevGuests) => {
      const updatedGuests = prevGuests.map((guest) =>
        guest.id === id ? { ...guest, rsvp: !guest.rsvp } : guest
      );
      console.log(" Inside setGuests → new data:", updatedGuests);
      return updatedGuests;
    });
  
    // Still logs the old state!
    console.log("WARNING Outside setGuests → guests:", guests);
  };
  
  const updateGuest = (id, updatedInfo) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id ? { ...guest, ...updatedInfo } : guest
      )
    );
  };
  

  const toggleConfirmation = (id) => {
    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, confirmed: !guest.confirmed } : guest
      )
    );
  };
  const total = guests.length;
  const confirmed = guests.filter(g => g.confirmed).length;
  const unconfirmed = total - confirmed;
  const rsvped = guests.filter(g => g.rsvp).length;  
  return (
    <div className="app-container">
      <h1> Event Planner</h1>
  
      <div className="summary">
        <p>Total Guests: {total}</p>
        <p>Confirmed: {confirmed}</p>
        <p>Unconfirmed: {unconfirmed}</p>
        <p>RSVPed: {rsvped}</p>
      </div>
  
      <GuestForm onAddGuest={addGuest} />
      <GuestList
  guests={guests}
  onToggleConfirmation={toggleConfirmation}
  onToggleRSVP={toggleRSVP}
  onRemove={removeGuest}
  onUpdate={updateGuest} />

    </div>
  );
}  

export default App;
