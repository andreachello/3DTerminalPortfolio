import React, { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useLoader } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";

function Obj({ setIsDragging, floorPlane }) {
  const coffee = useLoader(GLTFLoader, "./coffee_shop_cup.glb")
  const [pos, setPos] = useState([0, 1, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 20 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 1.5, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      api.start({
        position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        // position: pos,
        scale: active ? 1.2 : 1,
        rotation: [y / aspect, x / aspect, 0]
      });
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <animated.mesh {...spring} {...bind()} castShadow>
       <primitive
            object={coffee.scene}
            position={[2.5, -2, 2]}
            scale={1}
            ref={dragObjectRef}
  
        />

    </animated.mesh>
  );
}

export default Obj;
