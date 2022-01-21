import { Html } from "@react-three/drei";
import { useSpring } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Group, LineCurve3, TubeGeometry, Vector3 } from "three";
import DivBlock from "./DivBlock";

const World = ({ counter }: { counter: number }): JSX.Element => {
  const div1 = useRef<Group>(null);
  const div2 = useRef<Group>(null);
  const div3 = useRef<Group>(null);

  const connectorRef1 = useRef<[Vector3, Vector3]>();
  const connectorRef2 = useRef<[Vector3, Vector3]>();
  const connectorRef3 = useRef<[Vector3, Vector3]>();

  const l1: [Vector3, Vector3] = [
    new Vector3(0, 0, 0),
    new Vector3(10, 10, 10),
  ];
  const l2: [Vector3, Vector3] = [
    new Vector3(0, 0, 0),
    new Vector3(10, 10, 10),
  ];
  const l3: [Vector3, Vector3] = [
    new Vector3(0, 0, 0),
    new Vector3(10, 10, 10),
  ];

  useEffect(() => {
    connectorRef1.current = l1;
    connectorRef2.current = l2;
    connectorRef3.current = l3;
  }, []);

  const [lines, setLines] = useState<[Vector3, Vector3][]>([
    [new Vector3(0, 0, 0), new Vector3(10, 10, 10)],
    [new Vector3(0, 0, 0), new Vector3(10, 10, 10)],
    [new Vector3(0, 0, 0), new Vector3(10, 10, 10)],
  ]);

  const divItems = [div1, div2, div3];

  //for smoother animation
  const pos = useSpring(0, {
    damping: 10,
    stiffness: 10,
    bounce: 0,
    duration: 500,
  });
  // const pos = 0;
  useEffect(() => {
    const val = pos.get() + (2 * Math.PI) / 3;
    pos.set(val);
  }, [counter, pos]);

  const third = (2 * Math.PI) / 3;

  //radius of our rotation circle
  const radius = 20;

  //update the positions of the lines
  useFrame((state) => {
    let val = 0;
    val += pos.get();
    //offset the positions by 1/6th PI
    const off = third / 2;
    val += off;

    const linescopy = [...lines];
    //rotate
    divItems.forEach((item, i) => {
      if (item.current) {
        item.current.position.set(
          0,
          Math.cos(val + third * i) * radius,
          Math.sin(val + third * i) * radius
        );
        const p1 = item.current.position;
        //adjust positions of connector lines
        linescopy[i][1].set(p1.x, p1.y, p1.z);
      }
    });
    setLines(linescopy);
  });

  return (
    <>
      <group>
        <gridHelper />
        <Connector points={lines[0]} />
        <Connector points={lines[1]} />
        <Connector points={lines[2]} />
        <DivBlock text={"1"} color="red" ref={div1} />
        <DivBlock text={"2"} color="green" ref={div2} />
        <DivBlock text={"3"} color="blue" ref={div3} />
        <Html transform>
          <div
            style={{ width: 1000, height: 200, backgroundColor: "blue" }}
          ></div>
        </Html>
      </group>
    </>
  );
};

interface LineProps {
  points: [Vector3, Vector3];
}

const Connector = forwardRef<TubeGeometry, LineProps>(function Connector(
  { points },
  forwardRef
) {
  const curve = new LineCurve3(points[0], points[1]);

  return (
    <mesh>
      <tubeGeometry args={[curve, undefined, 0.1]} ref={forwardRef} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
});

export default World;
