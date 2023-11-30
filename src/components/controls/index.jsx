import React, { useState } from 'react';
import Slider from '../slider';
import Dropdown from '../dropdown';
import {matrix, dot, cos, sin, round} from 'mathjs'

const Controls = (props) => {
    const [lightingModel, setLightingModel] = useState('lambertian');
    const [roughness, setRoughness] = useState(0.0);
    const [F0, setF0] = useState(0.0);

    const brdf = () => {
        let a = Math.PI * props.beamRotation / 180; // Incidence angle
        let wallRot = -Math.PI * props.wallRotation / 180; // Reflection angle
    
        if (lightingModel === 'lambertian') {
            return round(Math.cos(a - wallRot), 3);
        } 
        else if (lightingModel === 'orennayar') {
            let sigma2 = roughness * roughness;
            let alpha = Math.max(a, wallRot);
            let beta = Math.min(a, wallRot);
    
            let A = 1 - 0.5 * sigma2 / (sigma2 + 0.33);
            let B = 0.45 * sigma2 / (sigma2 + 0.09);
            let L = Math.cos(a - wallRot);
    
            let OrenNayarReflectance = L * (A + B * Math.sin(alpha) * Math.tan(beta));
            return round(OrenNayarReflectance, 3);
        } 
        else if (lightingModel === 'cooktorrance') {
            // Calculate the angle of incidence relative to the wall's surface normal.
            // Assuming 'a' is the angle between the incoming light direction and the horizontal,
            // and 'wallRot' is the angle between the wall's surface normal and the vertical.
            // The angle of incidence relative to the normal is the difference between these two angles.
            let angleOfIncidence = Math.abs(a - wallRot);
    
            let alpha = Math.max(roughness * roughness, 0.001); // Ensure alpha is not zero to avoid division by zero
            
            let cosTheta = Math.cos(angleOfIncidence);
    
            // D - GGX Normal Distribution Function
            let D = Math.pow(alpha, 2.0) / (Math.PI * Math.pow(cosTheta, 4) * (Math.pow(alpha, 2.0) + Math.tan(angleOfIncidence) * Math.tan(angleOfIncidence)));
    
            // G - Schlick-GGX Geometry Function
            let k = (alpha + 1) * (alpha + 1) / 8;
            let G1 = cosTheta / (cosTheta + k * (1 - cosTheta));
            let G = G1 * G1; // Since light hits and reflects at the same angle
    
            // F - Schlick Fresnel Function
            let F = Number(F0) + Number((1 - F0) * Math.pow(1 - cosTheta, 5));
    
            // Final BRDF calculation
            let rs = (D * G * F) / (4 * cosTheta * cosTheta);
            console.log(D,G,F,cosTheta)
            return round(rs, 3); // Assuming 'round' is a function defined to round to 3 decimal places
        }
        else {
            return 'null';
        }
    }

    const orennayarControls = () => {
        return (<Slider defaultValue={0.5} text="Roughness: " min={0.0} max={1.0} step={0.05} setValue={setRoughness}></Slider>)
    }

    const cooktorranceControls = () => {
        return (<div>
                    <Slider defaultValue={0.5} text="Roughness: " min={0.01} max={1.0} step={0.05} setValue={setRoughness}></Slider>
                    <Slider defaultValue={0.5} text="F0: " min={0.0} max={1.0} step={0.01} setValue={setF0}></Slider>
                </div>)
    }

    return (
        <div className='menu'>
            <Dropdown setLightingModel={setLightingModel}></Dropdown>
            {lightingModel === 'orennayar' ? orennayarControls() : null}
            {lightingModel === 'cooktorrance' ? cooktorranceControls() : null}

            <hr className='hr'/>
            <Slider defaultValue={0.0} text={"Wall angle: "} min={-45.0} max={45.0} step={5.0} setValue={props.setWallRotation}></Slider>
            <p>Incoming angle: {Math.round(props.beamRotation)}</p>
            <p>Outgoing angle: {Math.round(props.beamRotationOut)}</p>
            <p>BRDF: {brdf()}</p>
        </div>
    );
};

export default Controls;