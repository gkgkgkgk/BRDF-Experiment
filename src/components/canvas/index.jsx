import { Stage, Graphics } from "@pixi/react";
import { PI_2 } from "pixi.js";
import { useState, useEffect, useCallback } from "react";

const Canvas = (props) => {
    const getCurrentDimension = () => {
        return {
              width: window.innerWidth,
              height: window.innerHeight
        }
    }

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    const [laserPos, setLaserPos] = useState({x: window.innerWidth / 2, y: window.innerHeight / 2});
    const [isDraggingLaser, setIsDraggingLaser] = useState(false);

    useEffect(() => {
        const handleMouseDown = (event) => {
            setMouseDown(true);
        };

        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };

        const handleMouseUp = () => {
            setMouseDown(false);
            setIsDraggingLaser(false);
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseDown]);

    const distance = (x1, y1, x2, y2) => {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }


    const drawWall = useCallback((g) => {
        g.clear();
        let offset = 60;
        let offsetTop = (screenSize.height * props.wallRotation/45.0) / 2.0;
        let offsetBottom = (screenSize.height * -props.wallRotation/45.0) / 2.0;

        let tr = {x: screenSize.width * 2.0, y: 0};
        let br = {x: screenSize.width * 2.0, y: screenSize.height};

        let tl = {x: -offset + screenSize.width - offsetTop, y: 0};
        let bl = {x: -offset + screenSize.width - offsetBottom, y: screenSize.height};

        const vertices = [
            tr, br, bl, tl
          ];
      
          // Draw the polygon
          g.lineStyle(0,0xfa1f02,1);
          g.beginFill(0x5A5A5A); // Fill color (red)
          g.moveTo(vertices[0].x, vertices[0].y); // Move to the first vertex
          for (let i = 1; i < vertices.length; i++) {
            g.lineTo(vertices[i].x, vertices[i].y); // Draw lines to the other vertices
          }
          g.closePath(); // Close the polygon
          g.endFill(); // End the fill

    }, [screenSize, props.wallRotation]);

    const drawPointer = useCallback((g) => {
        g.clear();
        g.lineStyle(8,0xfa1f02,1);
        
        if(isDraggingLaser || (mouseDown && distance(mousePos.x, mousePos.y, laserPos.x, laserPos.y) < 20.0)){
            setLaserPos({x: mousePos.x, y: mousePos.y});
            setIsDraggingLaser(true);
        }

        let x1 = laserPos.x;
        let y1 = laserPos.y;

        let x2 = screenSize.width - 60;
        let y2 = screenSize.height / 2.0;

        g.moveTo(x1, y1);
        g.lineTo(x2, y2);

        let scale = 10000;

        const angle = Math.atan2(y2 - y1, x2 - x1);
        const wallRotationRad = ((props.wallRotation) * Math.PI) / 180;
        const newAngle = (angle + 2.0 * wallRotationRad);

        console.log(angle / Math.PI * 180, props.wallRotation, newAngle / Math.PI * 180)

        let dx = scale * Math.cos(newAngle);
        let dy = scale * Math.sin(newAngle);

        g.moveTo(x2 - dx, y2 + dy);
        g.lineTo(x2, y2);

        g.lineStyle(0,0xfa1f02,1);

        g.beginFill(0x333333, 1);
        g.drawCircle(laserPos.x, laserPos.y, 20.0);
        g.endFill();


    }, [mousePos, screenSize, mouseDown]);

    useEffect(() => {
        const updateDimension = () => {
          setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);
        
        return(() => {
            window.removeEventListener('resize', updateDimension);
        })
      }, [screenSize])

    return (
        <div className="canvas">
            <Stage width={window.innerWidth} height={window.innerHeight} options={{backgroundColor: 0xeef1f5}}>
                <Graphics draw={drawWall}/>
                <Graphics draw={drawPointer}/>
            </Stage>
        </div>
    );
}

export default Canvas;