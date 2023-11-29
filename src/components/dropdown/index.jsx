import React, { useState } from 'react';

const DropdownSelection = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
        <p>Lighting model:</p>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="lambertian">Lambertian</option>
        <option value="orennayar">Oren–Nayar</option>
      </select>
    </div>
  );
};

export default DropdownSelection;