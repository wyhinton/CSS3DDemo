import "./App.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import World from "./World";

const App = (): JSX.Element => {
  const [counter, setCounter] = useState(0);

  return (
    <div
      onClick={(e) => {
        setCounter(counter + 1);
      }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Suspense fallback={<div>loading</div>}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[50, 15, 45]} />
          <color attach="background" args={["black"]} />
          <OrbitControls enableRotate={true} />
          <spotLight position={[2, 1, 1]} intensity={10} penumbra={0.1} />
          <World counter={counter} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
