var gg = 1;
let bb = 2;
function f1() {
	var gg = 11;
	let bb = 22;
	f2('first'); // inner
	{
		const xx = 1;
		var zz = 88;
		function f2(t) {
			console.log(t, 'nest f2!!');
		}
	}
	function f2(t) {
		console.log(t, 'inner f2!!');
	}
	f2('second'); // callable? Yes (: 함수도 hoisting)
}

function f2(t) {
	console.log(t, 'global f2>', gg, bb, xx, kk); // ?
}

let xx = 9;
if (gg > 0) {
	var kk = 33;
	const yy = 99;
}
f1();
f2('third'); // outer
// console.log(kk, yy);

function varFn() {
	var v = 1;
	{
		var v = 2,
			vv = 3;
		console.log(v, vv); // 2, 3
	}
	console.log(v, vv); // 2, 3
} // v는 하나의 공간 (stack)

function letFn() {
	let l = 1;
	{
		let l = 2,
			ll = 3;
		console.log(l, ll); // ?
	}
	// console.log(l, ll); // ?
}

varFn();
letFn();

// f(); // TDZ (freshness)
const f = () => console.log('ffffffffff'); // remove fresh state

f();
