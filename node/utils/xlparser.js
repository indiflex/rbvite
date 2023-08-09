const path = require('path');
const XLSX = require('xlsx');
const db = require('./db');
const sqls = require('../sqls.json');

if (process.argv.length < 2) {
  console.log('input xlsx file, please.');
  console.log('usage) node xlparser <file-path>');
  console.log('ex) node xlparser ../data.xlsx');
  return;
}

// const ifile = process.argv[2] || '../data/food_20230715.xlsx';
const ifile =
  process.argv[2] || '../data/통합 식품영양성분DB_음식_20230715.xlsx';
const workBook = XLSX.readFile(path.join(__dirname, ifile));
const [sname] = workBook.SheetNames;
const workSheet = workBook.Sheets[sname];

// check validation of the xslx file
const [first, last] = workSheet['!ref'].split(':');
if (!first.startsWith('A') || !last.startsWith('CV')) {
  console.error(`엑셀파일 데이터 형식이 올바르지 않습니다!(${first}~${last})`);
  return;
}

const data = XLSX.utils.sheet_to_json(workSheet, {
  header: 1,
  // range: 'A2:CV4', // all test
  range: 'A2:CV7684', // all real
});

(async function () {
  try {
    await insertSet(data, ['D'], 'DbGroup'); // DB군
    await insertSet(data, ['E'], 'CommItem'); // 상용제품
    await insertSet(data, ['H'], 'Maker'); // 지역/제조사
    await insertSet(data, ['I'], 'CollectTime'); // 채취시기
    await insertSet(data, ['J'], 'FoodCate'); // 식품대분류
    await insertSet(data, ['J', 'K'], 'FoodSubCate'); // 식품상세분류
    await insertSet(data, ['CU'], 'Ref'); // 성분표출처
    await insertSet(data, ['CV'], 'Issue'); // 발행기관

    // insert할 데이터 가공 ('-'은 null 처리)
    for (let i = 0; i < data.length; i += 1) {
      const row = data[i];
      for (let j = 0; j < row.length; j += 1)
        row[j] = row[j] === '-' ? null : row[j];
    }

    const params = data.map(row => row.slice(1));
    console.log('🚀  params:', params[0], params[2].length);

    // 마지막으로 Master 테이블에 insert
    db.insertBulk(sqls.Nutrition.insert, params, (err, rows) => {
      if (err) {
        console.error('Error on TTT>>', err.message);
      }
      console.log('last-affected>>', rows);
    });
  } catch (error) {
    console.error('ERROR:', error.message);
  }
})();

/*
 * insert bulk data and select to change id
 * 정규화된 테이블에 저장
 */
async function insertSet(data, col, table) {
  const idxes = col.map(c => colIdx(c));
  const params = data.map(row => idxes.map(idx => row[idx]));
  const map = await db.insertSelect(table, params);
  const idx = idxes[idxes.length - 1];
  data.forEach(row => (row[idx] = map.get(row[idx])));
}

/*
 * colomn alphabet to array index
 * ex)
 *   'A' = 0
 *   'B' = 1
 *   'AA' = 27
 *   'CS' = 96
 */
function colIdx(col) {
  const firstIdx = col.charCodeAt(0) - 65;
  if (col.length === 1) return firstIdx;
  if (col.length === 2) return (firstIdx + 1) * 26 + col.charCodeAt(1) - 65;
}
