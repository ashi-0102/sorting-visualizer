let array = [];

function generateArray(size = 60) {
  array = [];
  const container = document.getElementById("bar-container");
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 5;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  const algo = document.getElementById("algorithm").value;
  if (!array.length) return;
  switch (algo) {
    case "bubble": await bubbleSort(); break;
    case "insertion": await insertionSort(); break;
    case "selection": await selectionSort(); break;
    case "quick": await quickSort(0, array.length - 1); break;
    case "merge": await mergeSort(0, array.length - 1); break;
  }
}

function updateBars(colors = []) {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = `${array[i] * 3}px`;
    bars[i].style.backgroundColor = colors[i] || "#4a90e2";
  }
}

async function bubbleSort() {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      updateBars(new Array(n).fill().map((_, k) => k === j || k === j + 1 ? "orange" : null));
      await sleep(20);
    }
  }
}

async function insertionSort() {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      updateBars(new Array(n).fill().map((_, k) => k === j || k === i ? "lime" : null));
      await sleep(20);
    }
    array[j + 1] = key;
  }
  updateBars();
}

async function selectionSort() {
  const n = array.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) min = j;
      updateBars(new Array(n).fill().map((_, k) => k === min || k === j ? "gold" : null));
      await sleep(20);
    }
    [array[i], array[min]] = [array[min], array[i]];
  }
  updateBars();
}

async function quickSort(start, end) {
  if (start >= end) return;
  let index = await partition(start, end);
  await Promise.all([
    quickSort(start, index - 1),
    quickSort(index + 1, end),
  ]);
}

async function partition(start, end) {
  const pivot = array[end];
  let i = start;
  for (let j = start; j < end; j++) {
    if (array[j] < pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
    }
    updateBars(new Array(array.length).fill().map((_, k) => k === j || k === i ? "pink" : null));
    await sleep(20);
  }
  [array[i], array[end]] = [array[end], array[i]];
  return i;
}

async function mergeSort(start, end) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let k = start, i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
    updateBars(new Array(array.length).fill().map((_, x) => x === k ? "violet" : null));
    await sleep(20);
  }
  while (i < left.length) {
    array[k++] = left[i++];
    updateBars();
    await sleep(10);
  }
  while (j < right.length) {
    array[k++] = right[j++];
    updateBars();
    await sleep(10);
  }
}
