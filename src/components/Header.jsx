import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Algorithms from "../scripts/algorithms.js";
import Animate from "../scripts/animation.js";
import { stopAnimation, toggleAnimation } from "../scripts/animation.js";
import {
  resetPositionCss,
  generateArrayBar,
  disabledStopBtn,
  disabledResetBtn,
} from "../scripts/headerBtn.js";
import { clearAnimationSel } from "../scripts/animation.js";
import { ArrayContext } from "../contexts/ArrayContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export let tmpSpeed;

function Header({ onSort, stopQuickSort, restartQuickSort }) {
  const context = useContext(ArrayContext);

  useEffect(() => {
    generateArrayBar(context.totalElements, context.setArrayBar);
  }, [context.totalElements]);
  useEffect(() => {
    if (context.speed == 1) {
      tmpSpeed = 1000;
    } else if (context.speed == 2) {
      tmpSpeed = 800;
    } else if (context.speed == 3) {
      tmpSpeed = 600;
    } else if (context.speed == 4) {
      tmpSpeed = 400;
    } else {
      tmpSpeed = 100;
    }
  }, [context.speed]);

  // ==> use reload window instead of clearTimeout
  function resetFunction() {
    if (context.selectedAlgo == "Merge Sort" || context.selectedAlgo == "Quick Sort") {
      window.location.reload();
    } else {
      clearAnimationSel();
      disabledResetBtn();
      generateArrayBar(context.totalElements, context.setArrayBar);
    }
  }

  function restartFunction() {
    clearAnimationSel();
    disabledResetBtn();
    resetPositionCss();
  }
  function handleSelect(algo) {
    context.setSelectedAlgo(algo);
  }
  function handleSpeed(e) {
    context.setSpeed(e.target.value);
  }

  //// ----  RUNNNNNNN_BTN  -----
  const runAlgo = (e) => {
    if (context.selectedAlgo == "") {
      notify();
      return;
    }
    disabledStopBtn();
    const algo = context.selectedAlgo;
    const tmpArrayBar = context.arrayBar.slice();
    if (context.selectedAlgo == "Merge Sort") {
      solve(algo);
    } else if (context.selectedAlgo == "Quick Sort") {
      onSort(e);
    } else {
      const solution = solve(algo, tmpArrayBar);
      if (solution) {
        Animate(solution, context.speed, 0); // animation.js
      }
    }
  };

  const solve = (algo, tmpArrayBar) => {
    switch (algo) {
      case "Selection Sort": {
        return Algorithms.selection(tmpArrayBar);
      }
      case "Insertion Sort": {
        return Algorithms.insertion(tmpArrayBar);
      }
      case "Bubble Sort": {
        return Algorithms.bubble(tmpArrayBar);
      }
      case "Merge Sort": {
        return Algorithms.merge();
      }
      case "Quick Sort": {
        return Algorithms.quick();
      }
      default: {
        return false;
      }
    }
  };

  const notify = () =>
    toast.error("Hãy chọn thuật toán!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div id="menu" className="flex justify-around bg-[#498562] h-24 py-3 ">
      <div className="w-72" id="sliders">
        <div className="slider">
          <span className="mr-3 range-title" >Speed</span>
          <input
            className="form-range"
            type="range"
            step={1}
            min={1}
            max={5}
            value={context.speed}
            onChange={(e) => handleSpeed(e)}
          />
          <span className="text-white font-bold ">x{context.speed}</span>
        </div>
        <div className="slider mt-3">
          <span className="range-title">Element</span>
          {context.selectedAlgo === "Quick Sort" || context.selectedAlgo === "Merge Sort" ? (
            <input
              className="form-range"
              type="range"
              min={5}
              max={15}
              value={context.totalElements}
              onChange={(e) => context.setTotalElements(e.target.value)}
            />
          ) : (
            <input
              className="form-range"
              type="range"
              min={5}
              max={50}
              value={context.totalElements}
              onChange={(e) => context.setTotalElements(e.target.value)}
            />
          )}

          <span className="text-white font-bold">{context.totalElements}</span>
        </div>
      </div>
      <div className="selectAlgo">
        <Link
          className={`algo-link ${
            context.selectedAlgo === "Selection Sort" ? "selected" : ""
          }`}
          to="/"
          onClick={() => handleSelect("Selection Sort")}
        >
          Sel
        </Link>
        <Link
          className={`algo-link ${
            context.selectedAlgo === "Insertion Sort" ? "selected" : ""
          }`}
          to="/"
          onClick={() => handleSelect("Insertion Sort")}
        >
          Ins
        </Link>
        <Link
          className={`algo-link ${
            context.selectedAlgo === "Bubble Sort" ? "selected" : ""
          }`}
          to="/"
          onClick={() => handleSelect("Bubble Sort")}
        >
          Bub
        </Link>
        <Link
          className={`algo-link ${
            context.selectedAlgo === "Merge Sort" ? "selected" : ""
          }`}
          to="/box"
          onClick={() => handleSelect("Merge Sort")}
        >
          Mer
        </Link>
        <Link
          className={`algo-link ${
            context.selectedAlgo === "Quick Sort" ? "selected" : ""
          }`}
          to="/quicksort"
          onClick={() => handleSelect("Quick Sort")}
        >
          Qui
        </Link>
      </div>
      <div id="buttons">
        <button id="sort-btn" onClick={runAlgo} className="btn">
          Sort
        </button>
        {context.selectedAlgo == "Quick Sort" ? (
          <button
            id="stop-btn"
            className="btn disabled"
            onClick={stopQuickSort}
          >
            Stop
          </button>
        ) : (
          <button
            id="stop-btn"
            className="btn disabled"
            onClick={toggleAnimation}
          >
            Stop
          </button>
        )}

        <button className="btn btn-hover" onClick={resetFunction}>
          Reset
        </button>
        {context.selectedAlgo == "Quick Sort" ? (
          <button className="btn btn-hover" onClick={restartQuickSort}>
            Restart
          </button>
        ) : (
          <button className="btn btn-hover" onClick={restartFunction}>
            Restart
          </button>
        )}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
}

export default Header;
