var resultArray = [];
var resultLeftPs = [];
var resultRightPs = [];
var count = 0;

function swap(arr, leftIndex, rightIndex) {
  var temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
}

function partition(items, leftPs, rightPs, left, right) {
  let pivotIdx = Math.floor((right + left) / 2);
  var pivot = items[Math.floor((right + left) / 2)].text;
  var i = left;
  var j = right;

  leftPs[left].text = "L";
  rightPs[right].text = "R";
  resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
  resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

  items[pivotIdx].pivot = "pivot";
  items[left].style = "left-right";
  items[right].style = "left-right";
  resultArray.push(JSON.parse(JSON.stringify(items)));

  while (i <= j) {
    while (items[i].text < pivot) {
      i++;
      let before = i - 1;
      swap(leftPs, i, before);
      resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
      resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

      items[i].style = "left-right";
      items[before].style = "";
      resultArray.push(JSON.parse(JSON.stringify(items)));
    }

    while (items[j].text > pivot) {
      j--;
      let after = j + 1;
      swap(rightPs, j, after);
      resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
      resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

      items[j].style = "left-right";
      items[after].style = "";
      resultArray.push(JSON.parse(JSON.stringify(items)));
    }
    if (i <= j) {
      swap(items, i, j);
      resultArray.push(JSON.parse(JSON.stringify(items)));
      resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
      resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

      i++;
      let before = i - 1;
      j--;
      let after = j + 1;

      swap(leftPs, i, before);
      resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
      swap(rightPs, j, after);
      resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

      items[i].style = "left-right";
      items[j].style = "left-right";
      items[before].style = "";
      items[after].style = "";
      resultArray.push(JSON.parse(JSON.stringify(items)));
    }
  }

  leftPs[i].text = ".";
  rightPs[j].text = ".";
  resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
  resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

  for (let i = 0; i < items.length; i++) {
    items[i].style = "";
    items[i].pivot = ".";
  }
  resultArray.push(JSON.parse(JSON.stringify(items)));
  return i;
}

export function callQuickSort(items, leftPs, rightPs, left, right) {
  let resultObj = quickSort(items, leftPs, rightPs, left, right);
  for (let i = 1; i < items.length - 1; i++) {
    items[i].style = "sorted";
  }
  resultObj.resultArray.push(JSON.parse(JSON.stringify(items)));
  resultObj.resultLeftPs.push(JSON.parse(JSON.stringify(leftPs)));
  resultObj.resultRightPs.push(JSON.parse(JSON.stringify(rightPs)));

  return resultObj;
}
function quickSort(items, leftPs, rightPs, left, right) {
  count++;
  var index;

  if (items.length > 1) {
    index = partition(items, leftPs, rightPs, left, right);

    if (left < index - 1) {
      quickSort(items, leftPs, rightPs, left, index - 1);
    }
    if (index < right) {
      quickSort(items, leftPs, rightPs, index, right);
    }
  }

  return { resultArray, resultLeftPs, resultRightPs };
}

export default quickSort;
