import $ from "jquery";
import { tmpSpeed } from "../components/Header";

const sideMargin = 20;
const topMargin = 20;

function createSubArray(arr, from, to) {
  let $container = $("<div></div>").addClass("array-container");
  for (let i = from; i < to; i++) {
    let $value = $("<p></p>").text($(arr.childNodes[i]).text());
    let $element = $("<div></div>").addClass("array-element");
    $container.append($element.append($value));
  }
  return $container[0];
}

function animateDivision(half, dir) {
  return new Promise((resolve) => {
    half.animate(
      {
        transform: [
          `translate(${dir}10px, ${-$(half).height() - topMargin}px)`,
          "translate(0, 0)",
        ],
      },
      tmpSpeed
    );
    setTimeout(() => {
      resolve();
    }, tmpSpeed);
  });
}

function animateMergeAlgorithmPlacement(element, target) {
  return new Promise((resolve) => {
    element.animate(
      {
        transform: [
          "translate(0, 0)",
          `translate(
                      ${$(target).offset().left - $(element).offset().left}px,
                      ${$(target).offset().top - $(element).offset().top}px
                  )`,
        ],
      },
      tmpSpeed
    );

    setTimeout(() => {
      // Replace target value with element value
      $(target).html($(element).html());
      // Hide animated element
      $(element).css("opacity", "0");
      $(target).css({
        "background-color": "rgb(9, 255, 0)",
        "box-shadow":
          "rgba(0, 220, 0, 0.7) 1px -1px, rgba(0, 220, 0, 0.7)2px -2px" +
          ", rgba(0, 220, 0, 0.7) 3px -3px",
      });

      resolve();
    }, tmpSpeed);
  });
}

async function merge(arr1, arr2, target) {
  let i1 = 0,
    i2 = 0,
    i3 = 0;
  while (i1 < arr1.childNodes.length && i2 < arr2.childNodes.length) {
    let value1 = parseInt($(arr1.childNodes[i1]).text());
    let value2 = parseInt($(arr2.childNodes[i2]).text());

    if (value1 < value2) {
      await animateMergeAlgorithmPlacement(
        arr1.childNodes[i1++],
        target.childNodes[i3++]
      );
    } else
      await animateMergeAlgorithmPlacement(
        arr2.childNodes[i2++],
        target.childNodes[i3++]
      );
  }
  while (i1 < arr1.childNodes.length)
    await animateMergeAlgorithmPlacement(
      arr1.childNodes[i1++],
      target.childNodes[i3++]
    );
  while (i2 < arr2.childNodes.length)
    await animateMergeAlgorithmPlacement(
      arr2.childNodes[i2++],
      target.childNodes[i3++]
    );
}

export async function sort(arr) {
  if (arr.childNodes.length <= 1) return;

  let middle = Math.floor(arr.childNodes.length / 2);
  let half1 = createSubArray(arr, 0, middle);
  let half2 = createSubArray(arr, middle, arr.childNodes.length);

  $("section.animation-zone").append(half1);
  // sau khi tạo ra half1 thì set vị trí cho nó là bên trái-dưới của arr
  $(half1).css({
    left: `${$(arr).position().left - sideMargin}px`,
    top: `${$(arr).position().top + $(arr).height() + topMargin}px`,
  });

  await animateDivision(half1, "+");

  $("section.animation-zone").append(half2);
  $(half2).css({
    left: `${$(half1).position().left + $(half1).width() + sideMargin * 2}px`, // nhân 2 tại bên trái - sideMargin rồi
    top: `${$(half1).position().top}px`,
  });
  await animateDivision(half2, "-");

  await sort(half1);
  await sort(half2);
  await merge(half1, half2, arr);
}
