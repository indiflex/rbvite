const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args); // 100
  };
};

const act = debounce(a => console.log(++a), 1000);
act(100);
act(100);
act(100);
act(100);
act(100);
act(100);
act(100);
setTimeout(() => act(101), 1500);
