import React, { createContext, useState } from "react";

const ArrayContext = createContext();

function ArrayProvider({ children }) {
  const [arrayBar, setArrayBar] = useState([]);
  const [totalElements, setTotalElements] = useState(5);
  const [speed, setSpeed] = useState(3);
  const [selectedAlgo, setSelectedAlgo] = useState("")

  const value = {
    arrayBar,
    setArrayBar,
    totalElements,
    setTotalElements,
    speed,
    setSpeed,
    selectedAlgo, 
    setSelectedAlgo
  };
  return (
    <ArrayContext.Provider value={value}>{children}</ArrayContext.Provider>
  );
}

export { ArrayContext, ArrayProvider };
