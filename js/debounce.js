const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    console.log("debounce>>", ...args);
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args); // 100
  };
};

const throttle = (cb, delay) => {
  let timer;
  return (...args) => {
    console.log("throttle>>", ...args);
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
};

const deboun = debounce((a) => console.log("deboun------>>", a), 1000);
const thrott = throttle((a) => console.log("thrott------>>", a), 1000);
let runCnt = 0;
const intl = setInterval(() => {
  deboun(100 + runCnt);
  thrott(100 + runCnt++);
  if (runCnt > 10) clearInterval(intl);
}, 300);
setTimeout(() => deboun(1001), 1100);
setTimeout(() => thrott(1001), 1200);
