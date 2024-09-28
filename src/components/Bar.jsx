import React, { useRef, useEffect, useState, useContext } from "react";
import "../styles/Bar.css";
import { ArrayContext } from "../contexts/ArrayContext";


function Bar() {
  const [widthBar, setWidthBar] = useState(4);
  const WIDTH_FRAME_BARS = 600;

  const context = useContext(ArrayContext)
  
  useEffect(() => {
    getWidth();
  }, [context.totalElements]);

 
  const getWidth = () => {
    const width = WIDTH_FRAME_BARS / context.totalElements;
    setWidthBar(width);
  };

  return (
    <div id="bar-container" className=" bg-white justify-center items-center">
      {context.arrayBar.map((bar, idx) => (
        <div
          className="bar "
          key={idx}
          style={{
            width: `${widthBar}px`,
            height: `${bar}px`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Bar;
