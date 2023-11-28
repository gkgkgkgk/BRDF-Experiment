import React, { useState } from 'react';
import Slider from '../slider';

const Controls = (props) => {
    return (
        <div className='menu'>
            <Slider min={-45.0} max={45.0} step={1.0} setValue={props.setWallRotation}></Slider>
        </div>
    );
};

export default Controls;