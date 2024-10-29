import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <h2>Mượn trả</h2>
      <div className="navbar-controls">
        <button className="btn">Đăng ký mượn</button>
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
    </div>
  );
};

export default Navbar;
