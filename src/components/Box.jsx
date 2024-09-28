import React, { useContext, useState, useEffect } from "react";
import { ArrayContext } from "../contexts/ArrayContext";
import "../styles/Box.css";

function Box() {
  const context = useContext(ArrayContext);

  useEffect(() => {
    if (context.totalElements > 15) {
      context.setTotalElements(15);
    } 
  }, [context.totalElements]);

  return (
    <section className="animation-zone">
      <div className="array-container">
        {context.arrayBar.map((box, idx) => (
          <div className="array-element" key={idx}>
            <p>{box}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Box;
