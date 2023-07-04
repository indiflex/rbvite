const getWeekName = () => {
	let weekName;
	switch (date.getDay()) {
		case 0:
			weekName = '일';
			break;
		case 1:
			weekName = '월';
			break;
		case 2:
			weekName = '화';
			break;
		case 3:
			weekName = '수';
			break;
		case 4:
			weekName = '목';
			break;
		case 5:
			weekName = '금';
			break;
		case 6:
			weekName = '토';
			break;
		default:
			throw new Error('Not valid weekday!!');
	}
	// console.log('xx1>', makeLenString(3, 5));
	// console.log('xx2>', makeLenString2(3, 5));

	return weekName;
};

const makeLenString = (s, len = 2) => {
	const t = '0'.repeat(len) + s;
	return t.substring(t.length - len);
};
const makeLenString2 = (s, len = 2) => {
	const t = (s ?? '').toString();
	return t.length >= len
		? t.substring(t.length - len)
		: '0'.repeat(len - t.length) + t;
};

/**
 * simple version
 */
// const WEEK_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const WEEK_NAMES = '일월화수목금토';

x = ['어제', '오늘', '내일', '모래', '글피'];
// test code
const today = new Date();
const date = new Date();
for (let i = 0; i < 10; i++) {
	const wn1 = getWeekName(date);
	const wn2 = WEEK_NAMES[date.getDay()];
	// console.log(wn2);

	const yyyy = date.getFullYear();
	const mm = makeLenString(date.getMonth() + 1);
	const dd = makeLenString2(date.getDate());
	console.log(`${yyyy}-${mm}-${dd}은 ${wn1}/${wn2}요일입니다.`);
	date.setDate(date.getDate() + 1);
}
