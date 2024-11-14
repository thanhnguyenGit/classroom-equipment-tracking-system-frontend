import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface IconButtonProps {
  icon: 'edit' | 'delete';
}

const IconButton: React.FC<IconButtonProps> = ({ icon }) => {
  return (
    <button className='icon-button'>
      {icon === 'edit' ? <FaEdit /> : <FaTrash />}
    </button>
  );
};

export default IconButton
