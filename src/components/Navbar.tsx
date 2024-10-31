import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <h2>Mượn trả</h2>
      <div className="navbar-controls">
        <button className="btn">Create Ticket</button>
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default Navbar;
