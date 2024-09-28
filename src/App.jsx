import React, { useState, useEffect, useRef, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import AlgoInfo from "./components/AlgoInfo";
import { Outlet } from "react-router-dom";
import { callQuickSort } from "./scripts/quickSort";
import { ArrayContext } from "./contexts/ArrayContext";
import { disabledStopBtn, disabledResetBtn } from "./scripts/headerBtn";

function App() {
  const [arr, setArr] = useState([]);
  const [rightPs, setRightPs] = useState([]);
  const [leftPs, setLeftPs] = useState([]);
  const [speedQS, setSpeedQS] = useState(100);
  const timeoutRefs = useRef([]);
  const context = useContext(ArrayContext);
  const resArr = useRef([]);
  const resLeftPs = useRef([]);
  const resRightPs = useRef([]);
  const currentStopIndex = useRef(0);
  let isPaused = false;

  useEffect(
    () => {
      createArray();
    },
    [context.arrayBar],
    [context.setTotalElements]
  );

  useEffect(() => {
    if (context.speed == 1) {
      setSpeedQS(1000);
    } else if (context.speed == 2) {
      setSpeedQS(800);
    } else if (context.speed == 3) {
      setSpeedQS(600);
    } else if (context.speed == 4) {
      setSpeedQS(300);
    } else {
      setSpeedQS(100);
    }
  }, [context.speed]);

  const createArray = () => {
    let newArr = [];
    let newLeftPs = [];
    let newRightPs = [];
    newArr.push({ text: "X", id: "id--1", pivot: "." });
    newLeftPs.push({ text: ".", id: "id--1" });
    newRightPs.push({ text: ".", id: "id--1" });

    for (let i = 0; i < context.totalElements; i++) {
      newArr.push({
        text: context.arrayBar[i],
        id: "id-" + i,
        pivot: ".",
      });
      newLeftPs.push({
        text: ".",
        id: "id-" + i,
      });
      newRightPs.push({
        text: ".",
        id: "id-" + i,
      });
    }
    newArr.push({ text: "X", id: "id--99", pivot: "." });
    newLeftPs.push({ text: ".", id: "id--99" });
    newRightPs.push({ text: ".", id: "id--99" });

    setArr(newArr);
    setLeftPs(newLeftPs);
    setRightPs(newRightPs);
  };

  const sortFunc = (e) => {
    e.preventDefault();
    clearTimeoutFunc();
    disabledStopBtn();

    let results = [];
    let arrCopy = [...arr];
    let leftCopy = [...leftPs];
    let rightCopy = [...rightPs];

    results = callQuickSort(
      arrCopy,
      leftCopy,
      rightCopy,
      1,
      arrCopy.length - 2
    );
    resArr.current = results.resultArray;
    resLeftPs.current = results.resultLeftPs;
    resRightPs.current = results.resultRightPs;

    for (let i = 0; i < resArr.current.length; i++) {
      const timeoutId = setTimeout(() => {
        setArr(resArr.current[i]);
        setLeftPs(resLeftPs.current[i]);
        setRightPs(resRightPs.current[i]);
        currentStopIndex.current = i;
      }, speedQS * i);
      timeoutRefs.current.push(timeoutId);
    }
  };

  const clearTimeoutFunc = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    disabledStopBtn(false);
  };
  const resumeAnimation = () => {
    let start = currentStopIndex.current;
    disabledStopBtn();
    console.log("start: " + start);

    for (let i = start; i < resArr.current.length; i++) {
      const timeoutId = setTimeout(() => {
        setArr(resArr.current[i]);
        setLeftPs(resLeftPs.current[i]);
        setRightPs(resRightPs.current[i]);
        currentStopIndex.current = i;
      }, speedQS * (i-start));
      timeoutRefs.current.push(timeoutId);
    }
  };
  const stopTimeouts = () => {
    if (isPaused) {
      resumeAnimation();
      isPaused = false;
    } else {
      clearTimeoutFunc();
      isPaused = true;
    }
  };
  const restartQuickSort = () => {
    timeoutRefs.current.forEach(clearTimeout);
    createArray();
    disabledResetBtn()
  }

  return (
    <div>
      <div className="app-container w-full h-screen">
        <AlgoInfo></AlgoInfo>
        <div id="sorting-part" className=" w-full h-screen">
          <Header
            onSort={sortFunc}
            stopQuickSort={stopTimeouts}
            restartQuickSort={restartQuickSort}
          ></Header>
          <Outlet context={{ arr, leftPs, rightPs }}></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
