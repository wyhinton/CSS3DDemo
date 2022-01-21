import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { GroupProps } from "react-three-fiber";
import { Group } from "three";

interface DivBlockProps extends GroupProps {
  text: string;
  color: string;
}

const DivBlock = forwardRef<Group, DivBlockProps>(function DivBlock(
  { color, text }: { color: string; text: string },
  forwardRef
) {
  return (
    <group ref={forwardRef}>
      <Html transform position={[0, 0, 0]}>
        <Text color={color}>{text}</Text>
      </Html>
    </group>
  );
});

const Text = ({
  color,
  children,
}: {
  color: string;
  children: string;
}): JSX.Element => {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ipsum turpis, consectetur sit amet rhoncus vel, tincidunt at nibh. Quisque ac faucibus metus. Nunc ac diam enim. Duis et nisl dui. Donec tempus nibh id purus tempus, vel congue dolor eleifend. Sed nibh elit, euismod in lorem nec, dictum lacinia leo. Phasellus eu imperdiet massa. Praesent aliquet tempor nisi sit amet facilisis. In facilisis, diam quis imperdiet ornare, orci lectus cursus sapien, vitae tristique mi est ut est. Nulla sit amet odio aliquam ex vehicula molestie. Aenean non commodo ex. Quisque sit amet nulla eu sem bibendum finibus non at purus.";
  return (
    <motion.div
      style={{
        width: 500,
        height: 500,
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "rgb(255, 255, 255)",
        border: "3px solid black",
        overflow: "hidden",
        textAlign: "left",
        flexDirection: "column",
        padding: "1em",
      }}
      whileHover={{
        backgroundColor: "rgb(0, 255, 0)",
        transition: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div style={{ fontSize: 200 }}>{children}</div>
      <a
        style={{ fontSize: 100 }}
        href={
          "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"
        }
      >
        Fiber Docs
      </a>
      <p>{lorem}</p>
    </motion.div>
  );
};

export default DivBlock;
