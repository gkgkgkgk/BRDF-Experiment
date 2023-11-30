import React, { useState } from 'react';

const DropdownSelection = (props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    props.setLightingModel(event.target.value);
    setSelectedOption(event.target.value);
  };

  return (
    <div>
        <p>Lighting model:</p>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="lambertian">Lambertian</option>
        <option value="orennayar">Oren–Nayar</option>
        <option value="cooktorrance">Cook-Torrance</option>
      </select>
    </div>
  );
};

export default DropdownSelection;