import React, { useState } from 'react';

const Slider = ({ min, max, step, setValue }) => {
    const [value, setV] = useState(0.0);

    const handleChange = (e) => {
        setV(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className='slider'>
            <p>Wall angle: {value}°</p>
            <input 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                value={value} 
                onChange={handleChange} 
            />
        </div>
    );
};

export default Slider;