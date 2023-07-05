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
