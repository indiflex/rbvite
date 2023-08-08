const depthTime = (depth = 1) =>
  new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log(`depth${depth}`, new Date());
      depth < 3 ? resolve(depth + 1) : reject(new Error('Already 3-depth!!'));
    }, 1000 * depth);
  });

depthTime()
  .then(depthTime)
  .then(depthTime)
  .catch(err => console.error(err));

console.log('START!', new Date());
// orgFn();

function orgFn() {
  setTimeout(function () {
    console.log('depth1', new Date());
    setTimeout(function () {
      console.log('depth2', new Date());
      setTimeout(function () {
        console.log('depth3', new Date());
        throw new Error('Already 3-depth!!');
      }, 3000);
    }, 2000);
  }, 1000);

  console.log('START!', new Date());
}
