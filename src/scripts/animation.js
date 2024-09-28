import $ from "jquery";
import { Frame } from "./algorithms";
import { disabledStopBtn } from "./headerBtn";

let TEMP_SOLUTION;
let SPEED;
let SPEED_ANI = 200;
function swap2(elem0, elem1, SPEED) {
  if (SPEED >= 1050) SPEED_ANI = 1000;
  else if (SPEED >= 800) SPEED_ANI = 750;
  else if (SPEED >= 450) SPEED_ANI = 400;
  else if (SPEED >= 150) SPEED_ANI = 100;
  else if (SPEED >= 2) SPEED_ANI = 0;

  elem0 = elem0.jquery ? elem0 : $(elem0); // check queryObj
  elem1 = elem1.jquery ? elem1 : $(elem1);

  var dir = "left";
  var pos1 = elem0.offset()[dir];
  var pos2 = elem1.offset()[dir];
  var endPt = pos2 - pos1;
  var a = elem0;
  var b = elem1;
  var aprop = {
    left: "+=" + endPt,
  };
  var bprop = {
    left: "-=" + endPt,
  };

  b.css({ "z-index": "0.5" });
  b.animate(bprop, {
    duration: SPEED_ANI,
  });
  a.css({ "z-index": "1" });
  a.animate(aprop, {
    duration: SPEED_ANI,
  });
}

// ----- stop handler ----- //
let animationPaused = false;
let currentFrameIndex = 0; // To keep track of the current frame index

export function toggleAnimation() {
  if (animationPaused) {
    resumeAnimation();
  } else {
    pauseAnimation();
  }
}

export function clearAnimationSel() {
  animationPaused = false;
  $(".bar").removeClass("compared");
  for (let i = 0; i < ANIMATION_FRAMES.length; ++i) {
    clearTimeout(ANIMATION_FRAMES[i]);
  }
}

function pauseAnimation() {
  animationPaused = true;
  $(".bar").removeClass("compared");
  // Clear all remaining animation frames
  for (let i = 0; i < ANIMATION_FRAMES.length; ++i) {
    clearTimeout(ANIMATION_FRAMES[i]);
  }
  disabledStopBtn(false);
}

function resumeAnimation() {
  animationPaused = false;
  // Continue the animation from the current frame
  Animate(TEMP_SOLUTION, SPEED, currentFrameIndex);
  disabledStopBtn();
}

let ANIMATION_FRAMES = [];
export default function Animate(solution, speed, startIdx) {
  TEMP_SOLUTION = solution;
  SPEED = speed;
  let tempSpeed;

  if (speed == 1) tempSpeed = 1050;
  else if (speed == 2) tempSpeed = 800;
  else if (speed == 3) tempSpeed = 450;
  else if (speed == 4) tempSpeed = 150;
  else if (speed == 5) {
    tempSpeed = 10;
  }
  ANIMATION_FRAMES = [];
  solution.addFrame(new Frame());
  const frames = solution.getFrames();
  let bars = document.getElementsByClassName("bar");

  let tmpi; //  to edit runtime after stopping
  for (let i = startIdx; i < frames.length; ++i) {
    (function (i) {
      tmpi = i;
      tmpi -= startIdx;

      ANIMATION_FRAMES.push(
        setTimeout(function () {
          currentFrameIndex = i + 1; // Save the current frame index
          if (!animationPaused) {
            $(".bar").removeClass("compared");
            const lastFrame = i == frames.length - 1; // True or F
            const elem = frames[i].elements; // lấy giá trị của frames[i].elements
            const highlight = frames[i].highlights; // có thể có hoặc ko

            // Highlight compared elements (bg-blue)
            if (highlight.length)
              for (let h = 0; h < highlight.length; ++h)
                $(bars[highlight[h]]).addClass("compared");

            if (elem.length) {
              swap2(bars[elem[0]], bars[elem[1]], tempSpeed);

              let tmp0 = elem[0];
              let tmp1 = elem[1];
              for (let j = i; j < frames.length; ++j) {
                if (frames[j].elements.length) {
                  if (frames[j].elements[0] == tmp0) {
                    frames[j].elements[0] = tmp1;
                  } else if (frames[j].elements[0] == tmp1) {
                    frames[j].elements[0] = tmp0;
                  }
                  if (frames[j].elements[1] == tmp0) {
                    frames[j].elements[1] = tmp1;
                  } else if (frames[j].elements[1] == tmp1) {
                    frames[j].elements[1] = tmp0;
                  }
                }

                if (frames[j].highlights[0] == tmp0) {
                  frames[j].highlights[0] = tmp1;
                } else if (frames[j].highlights[0] == tmp1) {
                  frames[j].highlights[0] = tmp0;
                }
                if (frames[j].highlights[1] == tmp0) {
                  frames[j].highlights[1] = tmp1;
                } else if (frames[j].highlights[1] == tmp1) {
                  frames[j].highlights[1] = tmp0;
                }
              }
            }
            if (lastFrame) {
              $("#stop").attr("disabled", true);
              $(".bar").addClass("sel-sorted");
            }
          }
        }, tempSpeed * tmpi )
      );
    })(i);
  }
}

// stop btn
export function stopAnimation() {
  for (let i = 0; i < ANIMATION_FRAMES.length; ++i) {
    clearTimeout(ANIMATION_FRAMES[i]);
  }
  $(".bar").removeClass("compared");
  disabledStopBtn(false);
}
