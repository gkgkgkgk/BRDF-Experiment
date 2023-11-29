import React, { useState } from 'react';
import Slider from '../slider';
import Dropdown from '../dropdown';
import {matrix, dot, cos, sin, round} from 'mathjs'

const Controls = (props) => {
    const brdf = () => {
        let a = 180 * (90-props.beamRotation - props.wallRotation) / Math.PI;

        let n = matrix([cos(props.wallRotation), sin(props.wallRotation)]);
        let l = matrix([cos(a), sin(a)]);
        return round(dot(l, n), 5);
    }

    return (
        <div className='menu'>
            <Dropdown></Dropdown>
            <hr className='hr'/>
            <Slider min={-45.0} max={45.0} step={1.0} setValue={props.setWallRotation}></Slider>
            <p>Incoming angle: {Math.round(props.beamRotation)}</p>
            <p>Outgoing angle: {Math.round(props.beamRotationOut)}</p>
            <p>BRDF: {brdf()}</p>
        </div>
    );
};

export default Controls;