/**
 * TT -p.42
 * 1) 특정범위(1 ~ 10) 사이의 무리수 출력(소수점 3자리까지)
 *  - 정수는 제외
 *  - 소숫점 3자리 (6 ==> 2.645)
 */

const print3 = (i, f) =>
	console.log(`${i} ==> \t ${f / 1000}${f % 10 === 0 ? '0' : ''}`);

function printSqrt(start = 1, end = 10) {
	for (let i = start; i <= end; i++) {
		const sq = Math.sqrt(i);
		if (sq % 1 === 0) continue;
		print3(i, Math.floor(sq * 1000));
	}
}

printSqrt(20, 30);
printSqrt(1, 100);
