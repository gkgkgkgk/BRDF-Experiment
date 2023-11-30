import { Stage, Graphics } from "@pixi/react";
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
      
          g.lineStyle(0,0xfa1f02,1);
          g.beginFill(0x5A5A5A);
          g.moveTo(vertices[0].x, vertices[0].y);
          for (let i = 1; i < vertices.length; i++) {
            g.lineTo(vertices[i].x, vertices[i].y);
          }
          g.closePath();
          g.endFill();

    }, [screenSize, props.wallRotation]);

    const drawPointer = useCallback((g) => {
        g.clear();
        g.lineStyle(8,0xfa1f02,1);

        let offset = 60;
        let offsetTop = (screenSize.height * props.wallRotation/45.0) / 2.0;
        let offsetBottom = (screenSize.height * -props.wallRotation/45.0) / 2.0;
        let tl = {x: -offset + screenSize.width - offsetTop, y: 0};
        let bl = {x: -offset + screenSize.width - offsetBottom, y: screenSize.height};
        
        // fancy function https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
        let d = (mousePos.x - tl.x)*(bl.y - tl.y) - (mousePos.y - tl.y)*(bl.x - tl.x);

        if(isDraggingLaser || (mouseDown && distance(mousePos.x, mousePos.y, laserPos.x, laserPos.y) < 20.0)){
            if (d<0.0) {
                setLaserPos({ x: mousePos.x, y: mousePos.y });
            }
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

        
        let dx = scale * Math.cos(newAngle);
        let dy = scale * Math.sin(newAngle);

        g.moveTo(x2 - dx, y2 + dy);
        g.lineTo(x2, y2);

        props.setBeamRotationOut(Math.atan2(dy, -dx) / Math.PI * 180);

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

    useEffect(() => {
        let x1 = laserPos.x;
        let y1 = laserPos.y;

        let x2 = screenSize.width - 60;
        let y2 = screenSize.height / 2.0;

        const angle = Math.atan2(y2 - y1, x2 - x1);

        props.setBeamRotation(angle / Math.PI * 180);
    })

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