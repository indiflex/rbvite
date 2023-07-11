function f([a, b]) {
  console.log(a, b);
}

// f(1, 2);
f([1, 2]);

const ff = () => {
  console.log('Click22!!!!!', this); // window
};
console.log(typeof ff);
