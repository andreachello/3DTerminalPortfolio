import { PivotControls, Text, Html, ContactShadows, PresentationControls, Environment, OrbitControls } from '@react-three/drei'
import Terminal from './Terminal/Terminal'
import Loader from './Loader';
import Obj from "./Obj.js";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from 'react';
import { useGLTF, Clone } from "@react-three/drei"
// import { Perf } from 'r3f-perf'

export default function Experience() {

    // <Perf position="top-left" />

    const coffee = useGLTF("./coffee_shop_cup.glb")
    const desk = useGLTF("./wooden_table.glb")
    const monitor = useGLTF("./office_monitor__workstation_monitor.glb")
    const lamp = useGLTF("./desk_lamp.glb")
    const keyboard = useGLTF("./keyboard.glb")
    const mouse = useGLTF("./computer_mouse.glb")
    const chair = useGLTF("./office_chair_modern.glb")
    const carpet = useGLTF("./carpet.glb")
    const box = useGLTF("./box.glb")
    const wall = useGLTF("./wall.glb")
    const entertainment = useGLTF("./floating_entertainment_center.glb")
    
    const modelRef = useRef()
    const keyboardRef = useRef()
    const mouseRef = useRef()

    const [isDragging, setIsDragging] = useState(false);
    // const floorPlane = new THREE.Plane(new THREE.Vector3(0, 2, 0), 0);

    const liftObject = (ref) => {
        ref.current.position.y = 2
    }
    const putBackDownObject = (ref) => {
        ref.current.position.y = 1.8
    }

    return (
    <>
    <Suspense fallback={<Html center><Loader /></Html>}>
        <Environment preset='city' />
        <color args={["#695b5b"]} attach="background" />
        {/* <OrbitControls makeDefault enabled={!isDragging}/> */}
        <ContactShadows position-y={-0.884} />

        <PresentationControls
            polar={[-0, 0]} // down and up
            azimuth={[-.5, 0]} // left and right
            config={{mass: 2, tension: 400}}
            snap={{mass: 2, tension: 400}}
            enabled={!isDragging}
        >
        {/* <Obj setIsDragging={setIsDragging} floorPlane={floorPlane}/> */}

            <group position-y={-2.55} position-x={-0.3} rotation-y={-0.655} >
                <Html
                    wrapperClass='htmlScreen'
                    transform
                    rotation={[1,0,0]}
                    distanceFactor={1.6}
                    position={[0.4, 3.35, 0]}
                    rotation-x={0}
                    center
                    zIndexRange={-999}
                >
                    <Terminal />
                </Html>

                <primitive 
                    object={desk.scene}
                    scale={1}
                    position={[-2, 0, 0]}
                    rotation-y={4.72}
                />
                <primitive 
                    object={chair.scene}
                    scale={4}
                    position={[.7, -1, 3.5]}
                    rotation-y={3.16}
                />
                <primitive 
                    object={box.scene}
                    scale={.015}
                    position={[-1.9, 0.34, 1.6]}
                    rotation-y={4.73}
                />

                <primitive 
                    object={carpet.scene}
                    scale={40}
                    position={[.7, -1, 1]}
                    rotation-y={3.16}
                />
                <Clone 
                    object={wall.scene}
                    scale={0.02}
                    position={[-6.4, -1.1, -2]}
                    rotation-y={-1.55}
                />
                <Clone 
                    object={wall.scene}
                    scale={0.02}
                    position={[-6.5, -1.1, -2]}
                    rotation-y={0}
                />
                <Clone 
                    object={wall.scene}
                    scale={0.02}
                    position={[3.5, -1.1, -2.207]}
                    rotation-y={-1.55}
                />
                <Clone 
                    object={wall.scene}
                    scale={0.02}
                    position={[7.6, -1.1, -2.3]}
                    rotation-y={-1.55}
                />

                <primitive 
                    object={entertainment.scene}
                    scale={5}
                    position={[-10.5, 2, -1.6]}
                    rotation-y={1.6}
                />
                <primitive 
                    object={monitor.scene}
                    scale={0.005}
                    position={[0.2, 1.9, -0.3]}
                    rotation-y={4.72}
                >
                </primitive>

                <primitive 
                    object={lamp.scene}
                    scale={1}
                    position={[-2.5, 1.65, 0]}
                    rotation-y={-1.5}
                />
                <primitive 
                    object={keyboard.scene}
                    scale={8}
                    position={[0.3, 1.8, 1.3]}
                    rotation-y={0.015}
                    onPointerOver={() => liftObject(keyboardRef)} 
                    onPointerOut={() => putBackDownObject(keyboardRef)}
                    ref={keyboardRef}
                />
                <primitive 
                    object={mouse.scene}
                    scale={0.15}
                    position={[2.2, 1.9, 1.55]}
                    rotation-y={0}
                    onPointerOver={() => {
                        liftObject(mouseRef)
                        document.body.style.cursor = "pointer"
                    }} 
                    onPointerOut={() => {
                        putBackDownObject(mouseRef)
                        document.body.style.cursor = "default"
                    }}
                    ref={mouseRef}
                />

                <primitive
                object={coffee.scene}
                position={[3, 1.5, 0]}
                scale={1}
                />
            </group>
        </PresentationControls>
    </Suspense>
    </>
    )
}