import React, { useState, useEffect, useRef, useContext } from "react";
import "../styles/QuickSort.css";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { ArrayContext } from "../contexts/ArrayContext";

const springAnim = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

function Sorting() {
  const { arr, leftPs, rightPs } = useOutletContext();
  const context = useContext(ArrayContext);

  useEffect(() => {
    if (context.totalElements > 15) {
      context.setTotalElements(15);
    }
  }, [context.totalElements], [context.arrayBar]);
  return (
    <div className="container">
      <div className="bars " id="bars" style={{ margin: "20px" }}>
        <div className="row-left-right ">
          {leftPs.map((lp) => (
            <motion.div
              key={lp.id}
              layout
              transition={springAnim}
              className={`left-right-box `}
            >
              <div
                className={`left-right-pointer ${
                  lp.text === "." ? "text-hidden" : "text-left-right"
                }`}
              >
                {lp.text}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="row-elements">
          {arr.map((element) => (
            <motion.div
              key={element.id}
              layout
              transition={springAnim}
              className={`quicksort-arr-box `}
            >
              <div
                className={`pivot-element-arr ${
                  element.pivot === "." ? "text-hidden" : ""
                }`}
              >
                {element.pivot}
              </div>
              <div
                className={`element element-arr ${element.style} ${
                  element.text === "X" ? "text-hidden" : ""
                }`}
              >
                {element.text}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="row-left-right ">
          {rightPs.map((rp) => (
            <motion.div
              key={rp.id}
              layout
              transition={springAnim}
              className={`left-right-box `}
            >
              <div
                className={`left-right-pointer ${
                  rp.text === "." ? "text-hidden" : "text-left-right"
                }`}
              >
                {rp.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sorting;
