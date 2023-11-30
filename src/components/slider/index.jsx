import React, { useState } from 'react';

const Slider = ({ min, max, step, setValue, text, defaultValue }) => {
    const [value, setV] = useState(defaultValue);

    const handleChange = (e) => {
        setV(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className='slider'>
            <p>{text + value}</p>
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