var gg = 1;
let bb = 2;
console.log('zz>>', zz, kk, f2);
function f1(x1) {
  var gg = 11;
  let bb = 22;
  console.log('f1->', gg, bb, xx, zz, f2, f2.length);
  f2('first'); // inner

  function f2(t) {
    console.log(t, 'inner1 f2!!', xx, zz);
  }
  function f2(t, tt, ttt) {
    console.log(t, 'inner2 f2!!', xx, zz);
  }
  var f2 = function (t, tt, ttt) {
    console.log(t, 'inner3 f2!!', xx, zz);
  };

  {
    const xx = 99;
    let lll = 0;
    f2('first22'); // lll before initialization error!!
    var zz = 88;
    console.log('fffff>>', f2, f2.length);
    function f2(t, tt) {
      console.log(t, 'nested f2!!', xx, zz, lll);
    }
  }
  console.log('f1.ff>>', f2, f2.length);
  f2('1.5');
  var zz = 800;
  f2('second'); // callable? Yes (: 함수도 hoisting)
}

// f2('xx');
// console.log('f2>>', f2);
{
  var zz = 77;
  function f2(t) {
    console.log(t, 'global f2>', gg, bb, xx, kk); // ?
  }
}

let xx = 9;
if (gg > 1000000) {
  var kk = 33;
  const yy = 99;
}
f1('JJJ');
f2('third'); // outer
// console.log(kk, yy);

console.log('--------------------');
console.log('f=', f);
for (let i = 0; i < 5; i++) {
  console.log(i, f);
  arr = [1, 2];
  if (i > 3) {
    function f(...args) {
      console.log('f!!', args, i);
    }
  }
  f('i' + 1, 'zz');
}
