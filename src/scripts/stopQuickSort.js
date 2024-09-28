let animationPaused = false;

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
  // Clear all remaining animation frames after the current frame
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